package com.natsjob.demo.standalone;


import cn.hutool.json.JSONUtil;
import com.natsjob.starter.common.NatsJobClientHeartbeat;
import com.natsjob.starter.common.NatsJobClientResult;
import com.natsjob.starter.common.NatsJobClientSubject;
import com.natsjob.starter.domain.NatsJobClientReg;
import com.natsjob.starter.domain.NatsJobMessage;
import io.nats.client.Connection;
import io.nats.client.KeyValue;
import io.nats.client.Nats;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class ProTest {
    public static void main(String[] args) {
        String natsURL = "nats://127.0.0.1:4222";
        String subject = NatsJobClientSubject.getStartSubject("app", "biz", "owner");
        String workQueue = "worker-queue";
        String jobResultKVBucket = NatsJobClientSubject.KV_BUCKET_JOB_RESULT;
        final NatsJobClientReg clientReg = new NatsJobClientReg()
                .setId("client-1")
                .setNamespace("app")
                .setAppName("biz")
                .setIp("127.0.0.1")
                .setComment("demo");


        final NatsJobClientReg clientReg2 = new NatsJobClientReg()
                .setId("client-2")
                .setNamespace("app")
                .setAppName("biz")
                .setIp("127.0.0.1")
                .setComment("demo");

        try (Connection nc = Nats.connect(natsURL)) {
            //注册心跳,没心跳不会下发任务
            NatsJobClientHeartbeat.register(nc, clientReg);
            NatsJobClientHeartbeat.register(nc, clientReg2);

            KeyValue keyValue = nc.keyValue(jobResultKVBucket);
            //消费1
            nc.createDispatcher()
                    .subscribe(subject, workQueue, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work1: %s on subject %s\n", data, msg.getSubject());
                        NatsJobMessage jobMessage = JSONUtil.toBean(data, NatsJobMessage.class);
                        //结束任务
                        boolean result = NatsJobClientResult.success(keyValue, jobMessage.getJobEndKvKey(), "嘻嘻");
                        System.out.println("work1 put kv :" + jobMessage.getJobEndKvKey() + " success " + result);
                    });

            //消费2
            nc.createDispatcher()
                    .subscribe(subject, workQueue, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work2: %s on subject %s\n", data, msg.getSubject());
                        NatsJobMessage jobMessage = JSONUtil.toBean(data, NatsJobMessage.class);

                        boolean result = NatsJobClientResult.fail(keyValue, jobMessage.getJobEndKvKey(), "不嘻嘻");
                        System.out.println("work2 put kv :" + jobMessage.getJobEndKvKey() + " fail " + result);
                    });

            System.out.println("start success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }
}