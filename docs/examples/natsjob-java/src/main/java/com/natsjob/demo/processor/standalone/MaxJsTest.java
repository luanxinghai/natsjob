package com.natsjob.demo.processor.standalone;


import cn.hutool.json.JSONUtil;
import com.natsjob.demo.client.NatsjobJobResult;
import com.natsjob.demo.client.NatsjobSubject;
import com.natsjob.demo.domain.JobMessage;
import io.nats.client.Connection;
import io.nats.client.JetStream;
import io.nats.client.JetStreamApiException;
import io.nats.client.KeyValue;
import io.nats.client.Nats;
import io.nats.client.PushSubscribeOptions;
import io.nats.client.api.ConsumerConfiguration;
import io.nats.client.api.DeliverPolicy;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class MaxJsTest {
    public static void main(String[] args) {
        String natsURL = "nats://127.0.0.1:4222";
        String workQueue = "worker-queue-js";
        String durable = "worker-durable-js";
        String subject = NatsjobSubject.getStartSubject("app", "biz", "owner");
        String jobResultKVBucket = NatsjobSubject.KV_BUCKET_JOB_RESULT;
        try (Connection nc = Nats.connect(natsURL)) {
            // 获取 JetStream 上下文
            KeyValue keyValue = nc.keyValue(jobResultKVBucket);
            JetStream js = nc.jetStream();
            js.getStreamContext(NatsjobSubject.JET_STREAM_CONTEXT);

            ConsumerConfiguration cc = ConsumerConfiguration.builder()
                    .durable(durable) //可以记录消费位置;一旦创建策略后再变更策略会存在异常:可手动删除消费者或变更消费者
                    .deliverGroup(workQueue)
                    .deliverPolicy(DeliverPolicy.New) //默认是Last拉取最新数据,也可以设置不同的消费策略
                    .build();
            PushSubscribeOptions pso = PushSubscribeOptions.builder()
                    .configuration(cc)
                    .build();

            // 消费1
            js.subscribe(subject, nc.createDispatcher(), (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work1: %s on subject %s\n", data, msg.getSubject());
                        JobMessage jobMessage = JSONUtil.toBean(data, JobMessage.class);
                        //结束任务
                        boolean result = NatsjobJobResult.success(keyValue, jobMessage.getJobEndKvKey(), "嘻嘻");
                        System.out.println("work1 put kv :" + jobMessage.getJobEndKvKey() + " success " + result);
                        // 手动确认消息
                        msg.ack();
                    },
                    false,
                    pso
            );

            // 消费2
            js.subscribe(subject, nc.createDispatcher(), (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work2: %s on subject %s\n", data, msg.getSubject());
                        JobMessage jobMessage = JSONUtil.toBean(data, JobMessage.class);
                        //结束任务
                        boolean result = NatsjobJobResult.fail(keyValue, jobMessage.getJobEndKvKey(), "不嘻嘻");
                        System.out.println("work2 put kv :" + jobMessage.getJobEndKvKey() + " fail " + result);
                        // 手动确认消息
                        msg.ack();
                    },
                    false,
                    pso
            );

            System.out.println("start js success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException | JetStreamApiException e) {
            e.printStackTrace();
        }
    }
}
