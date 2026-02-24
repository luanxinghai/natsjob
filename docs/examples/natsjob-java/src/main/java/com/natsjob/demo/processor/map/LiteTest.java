package com.natsjob.demo.processor.map;

import com.natsjob.demo.client.NatsjobSubject;
import io.nats.client.Connection;
import io.nats.client.Nats;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class LiteTest {
    public static void main(String[] args) {
        String natsURL = "nats://127.0.0.1:4222";
        String subject = NatsjobSubject.getVoidPreStartSubject("app", "biz", "owner");
        //自定义下个子流程
        String subjectNextA = NatsjobSubject.getVoidPreStartSubject("app", "biz", "owner-nextA");
        String subjectNextB = NatsjobSubject.getVoidPreStartSubject("app", "biz", "owner-nextB");

        String workQueue = "worker-queue";
        String workQueueNextA = "worker-queue-nextA";
        String workQueueNextB = "worker-queue-nextB";
        try (Connection nc = Nats.connect(natsURL)) {
            //前置消费1
            nc.createDispatcher()
                    .subscribe(subject, workQueue, (msg) -> {
                        System.out.printf("work1: %s on subject %s\n", new String(msg.getData(), StandardCharsets.UTF_8), msg.getSubject());
                        nc.publish(subjectNextA, msg.getData());
                    });

            //nextA
            nc.createDispatcher()
                    .subscribe(subjectNextA, workQueueNextA, (msg) -> {
                        System.out.printf("nextA: %s on subject %s\n", new String(msg.getData(), StandardCharsets.UTF_8), msg.getSubject());
                        nc.publish(subjectNextB, msg.getData());
                    });

            //nextB
            nc.createDispatcher()
                    .subscribe(subjectNextB, workQueueNextB, (msg) -> {
                        System.out.printf("nextB: %s on subject %s\n", new String(msg.getData(), StandardCharsets.UTF_8), msg.getSubject());
                    });

            System.out.println("start success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }
}
