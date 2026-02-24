package com.natsjob.demo.processor.monitor;

import cn.hutool.json.JSONUtil;
import com.natsjob.demo.domain.JobMessage;
import com.natsjob.demo.domain.JobMonitor;
import io.nats.client.Connection;
import io.nats.client.Nats;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class MonitorTest {
    public static void main(String[] args) {
        String natsURL = "nats://127.0.0.1:4222";
        String subject = "natsjob.job.monitor";
        String workQueue = "worker-queue";
        try (Connection nc = Nats.connect(natsURL)) {
            //消费1
            nc.createDispatcher()
                    .subscribe(subject, workQueue, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work1: %s on subject %s\n", data, msg.getSubject());
                        //解析data自定义监控逻辑
                        JobMonitor jobMonitor = JSONUtil.toBean(data, JobMonitor.class);
                        if ("email".equals(jobMonitor.getMonitorStatus())){
                            System.out.println("发送邮件");
                        } else if ("dingding:email".equals(jobMonitor.getMonitorStatus())){
                            System.out.println("通过钉钉发送邮件");
                        }
                    });
            System.out.println("start success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }
}
