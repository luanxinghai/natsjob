package com.natsjob.demo.processor.broadcast;

import com.natsjob.demo.client.NatsjobSubject;
import io.nats.client.Connection;
import io.nats.client.Nats;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class PlusTest {
    public static void main(String[] args) {
        String natsURL = "nats://127.0.0.1:4222";
        String subject = NatsjobSubject.getStartSubject("app", "biz", "owner");
        try (Connection nc = Nats.connect(natsURL)) {
            //消费1
            nc.createDispatcher()
                    .subscribe(subject, (msg) -> {
                        System.out.printf("work1: %s on subject %s\n", new String(msg.getData(), StandardCharsets.UTF_8), msg.getSubject());
                    });

            //消费2
            nc.createDispatcher()
                    .subscribe(subject, (msg) -> {
                        System.out.printf("work2: %s on subject %s\n", new String(msg.getData(), StandardCharsets.UTF_8), msg.getSubject());
                    });

            System.out.println("start success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }
}
