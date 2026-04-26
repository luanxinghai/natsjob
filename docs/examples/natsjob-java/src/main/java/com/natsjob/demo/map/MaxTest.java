package com.natsjob.demo.map;


import cn.hutool.json.JSONUtil;

import com.natsjob.starter.common.NatsJobClientResult;
import com.natsjob.starter.common.NatsJobClientSubject;
import com.natsjob.starter.domain.NatsJobMessage;
import io.nats.client.Connection;
import io.nats.client.KeyValue;
import io.nats.client.Nats;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class MaxTest {
    public static void main(String[] args) {
        String natsURL = "nats://127.0.0.1:4222";
        String jobResultKVBucket = NatsJobClientSubject.KV_BUCKET_JOB_RESULT;

        String subjectPre = NatsJobClientSubject.getPreStartSubject("app", "biz", "owner");
        //自定义下个子流程
        String subjectNextA = NatsJobClientSubject.getPreStartSubject("app", "biz", "owner-nextA");
        String subjectNextB = NatsJobClientSubject.getPreStartSubject("app", "biz", "owner-nextB");

        //单机消费写队列;广播消费处理去掉队列即可,完全自控
        String workQueue = "worker-queue";
        String workQueueNextA = "worker-queue-nextA";
        String workQueueNextB = "worker-queue-nextB";

        try (Connection nc = Nats.connect(natsURL)) {
            KeyValue keyValue = nc.keyValue(jobResultKVBucket);

            //前置消费1
            nc.createDispatcher()
                    .subscribe(subjectPre, workQueue, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work-pre1: %s on subject %s\n", data, msg.getSubject());
                        NatsJobMessage jobMessage = JSONUtil.toBean(data, NatsJobMessage.class);
                        jobMessage.setNextPayload("batchId:1000");
                        nc.publish(subjectNextA, JSONUtil.toJsonStr(jobMessage).getBytes(StandardCharsets.UTF_8));
                    });

            //消费1
            nc.createDispatcher()
                    .subscribe(subjectNextA, workQueueNextA, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work1: %s on subject %s\n", data, msg.getSubject());
                        NatsJobMessage jobMessage = JSONUtil.toBean(data, NatsJobMessage.class);
                        jobMessage.setNextPayload("batchIdNextA:2000");
                        nc.publish(subjectNextB, JSONUtil.toJsonStr(jobMessage).getBytes(StandardCharsets.UTF_8));
                    });

            //消费2
            nc.createDispatcher()
                    .subscribe(subjectNextB, workQueueNextB, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work2: %s on subject %s\n", data, msg.getSubject());
                        NatsJobMessage jobMessage = JSONUtil.toBean(data, NatsJobMessage.class);
                        boolean result = NatsJobClientResult.success(keyValue, jobMessage.getJobEndKvKey(), "嘻嘻");
                        System.out.println("work2 put kv :" + jobMessage.getJobEndKvKey() + " success " + result);
                    });

            System.out.println("start success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }


}