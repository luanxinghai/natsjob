package com.natsjob.demo.processor.map;


import cn.hutool.json.JSONUtil;
import com.natsjob.demo.client.NatsjobJobResult;
import com.natsjob.demo.client.NatsjobSubject;
import com.natsjob.demo.domain.JobMessage;
import io.nats.client.Connection;
import io.nats.client.KeyValue;
import io.nats.client.Nats;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class MaxNextTest {
    public static void main(String[] args) {
        String natsURL = "nats://127.0.0.1:4222";
        String jobResultKVBucket = NatsjobSubject.KV_BUCKET_JOB_RESULT;

        String subjectPre = NatsjobSubject.getPreStartSubject("app", "biz", "owner");
        String subject = NatsjobSubject.getStartSubject("app", "biz", "owner");
        //自定义下个子流程
        String subjectNextA = NatsjobSubject.getStartSubject("app", "biz", "owner-nextA");
        String subjectNextB = NatsjobSubject.getStartSubject("app", "biz", "owner-nextB");

        //单机消费写队列;广播消费处理去掉队列即可,完全自控
        String workQueuePre = "worker-queue-pre";
        String workQueue = "worker-queue";
        String workQueueNextA = "worker-queue-nextA";
        String workQueueNextB = "worker-queue-nextB";

        try (Connection nc = Nats.connect(natsURL)) {
            KeyValue keyValue = nc.keyValue(jobResultKVBucket);

            //前置消费1
            nc.createDispatcher()
                    .subscribe(subjectPre, workQueuePre, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work-pre1: %s on subject %s\n", data, msg.getSubject());
                        JobMessage jobMessage = JSONUtil.toBean(data, JobMessage.class);
                        boolean result = NatsjobJobResult.successNext(keyValue, jobMessage.getJobEndKvKey(), "next start");
                        System.out.println("work-pre1 put kv :" + jobMessage.getJobEndKvKey() + " fail " + result);
                    });

            //=================第二阶段,谁收到谁处理=======================
            //map消费1
            nc.createDispatcher()
                    .subscribe(subject, workQueue, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work-map1: %s on subject %s\n", data, msg.getSubject());
                        nc.publish(subjectNextA, msg.getData());
                    });
            //map消费2
            nc.createDispatcher()
                    .subscribe(subject, workQueue, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work-map2: %s on subject %s\n", data, msg.getSubject());
                        nc.publish(subjectNextB, msg.getData());
                    });


            //=================第三阶段,来自map消费者自定义的触发下一阶段;完全根据自己情况进行触发next即可=======================
            //nextA消费1
            nc.createDispatcher()
                    .subscribe(subjectNextA, workQueueNextA, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work-nextA: %s on subject %s\n", data, msg.getSubject());
                        JobMessage jobMessage = JSONUtil.toBean(data, JobMessage.class);

                        boolean result = NatsjobJobResult.success(keyValue, jobMessage.getJobEndKvKey(), "嘻嘻");
                        System.out.println("work-nextA put kv :" + jobMessage.getJobEndKvKey() + " success " + result);
                    });

            //nextB消费2
            nc.createDispatcher()
                    .subscribe(subjectNextB, workQueueNextB, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work-nextB: %s on subject %s\n", data, msg.getSubject());
                        JobMessage jobMessage = JSONUtil.toBean(data, JobMessage.class);

                        boolean result = NatsjobJobResult.fail(keyValue, jobMessage.getJobEndKvKey(), "不嘻嘻");
                        System.out.println("work-nextB put kv :" + jobMessage.getJobEndKvKey() + " fail " + result);
                    });

            System.out.println("start success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }


}