package com.natsjob.demo.client;

import io.nats.client.Connection;
import io.nats.client.Nats;
import io.nats.client.Options;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class NatsjobClientLite {
    public static void main(String[] args) {
        String natsURL = "nats://127.0.0.1:4222";
        String subject = NatsjobSubject.getVoidStartSubject("app", "biz", "owner");
        String workQueue = "worker-queue";

        //设置自动重连,并打印日志信息
        Options build = new Options.Builder().server(natsURL)
                .connectionListener((conn, type) -> {
                    System.out.println("connectionListener:" + type);
                })
                .build();

        try (Connection nc = Nats.connectReconnectOnConnect(build)) {
            //消费1
            nc.createDispatcher()
                    .subscribe(subject, workQueue, (msg) -> {
                        System.out.printf("work1: %s on subject %s\n", new String(msg.getData(), StandardCharsets.UTF_8), msg.getSubject());
                    });

            //消费2
            nc.createDispatcher()
                    .subscribe(subject, workQueue, (msg) -> {
                        System.out.printf("work2: %s on subject %s\n", new String(msg.getData(), StandardCharsets.UTF_8), msg.getSubject());
                    });

            System.out.println("start success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }
}
