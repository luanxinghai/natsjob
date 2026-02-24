package com.natsjob.demo.processor.broadcast;

import cn.hutool.json.JSONUtil;
import com.natsjob.demo.client.NatsjobClientHeartbeat;
import com.natsjob.demo.client.NatsjobJobResult;
import com.natsjob.demo.client.NatsjobSubject;
import com.natsjob.demo.domain.ClientReg;
import com.natsjob.demo.domain.JobMessage;
import com.natsjob.demo.domain.JobSubFlowMessage;
import io.nats.client.Connection;
import io.nats.client.KeyValue;
import io.nats.client.Nats;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

public class UltraTest {
    public static void main(String[] args) {
        String natsURL = "nats://127.0.0.1:4222";
        //客户端1注册
        final String clientId = "client-1";
        final String subject = NatsjobSubject.getClientStartSubject("app", "biz", "owner", clientId);
        final ClientReg clientReg = new ClientReg()
                .setId(clientId)
                .setNamespace("app")
                .setAppName("biz")
                .setIp("127.0.0.1")
                .setComment("demo");


        final String clientId2 = "client-2";
        final String subject2 = NatsjobSubject.getClientStartSubject("app", "biz", "owner", clientId2);
        final ClientReg clientReg2 = new ClientReg()
                .setId(clientId2)
                .setNamespace("app")
                .setAppName("biz")
                .setIp("127.0.0.1")
                .setComment("demo");

        try (Connection nc = Nats.connect(natsURL)) {

            KeyValue keyValue = nc.keyValue(NatsjobSubject.KV_BUCKET_JOB_RESULT);
            //注入心跳
            NatsjobClientHeartbeat.register(nc.keyValue(NatsjobSubject.KV_BUCKET_CLIENT_HEARTBEAT), clientReg);
            NatsjobClientHeartbeat.register(nc.keyValue(NatsjobSubject.KV_BUCKET_CLIENT_HEARTBEAT), clientReg2);
            //消费1
            nc.createDispatcher()
                    .subscribe(subject, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work1: %s on subject %s\n", data, msg.getSubject());

                        JobMessage jobMessage = JSONUtil.toBean(data, JobMessage.class);
                        //发送子流程消息
                        sendFlowMessage(nc, jobMessage, clientId, "scene-1", "场景1", "success", "嘻嘻");
                        boolean result = NatsjobJobResult.success(keyValue, jobMessage.getJobEndKvKey(), "嘻嘻");
                        System.out.println("work1 put kv :" + jobMessage.getJobEndKvKey() + " result " + result);
                    });

            //消费2
            nc.createDispatcher()
                    .subscribe(subject2, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work2: %s on subject %s\n", data, msg.getSubject());

                        JobMessage jobMessage = JSONUtil.toBean(data, JobMessage.class);
                        sendFlowMessage(nc, jobMessage, clientId2, "scene-1", "场景1", "success", "不嘻嘻");
                        boolean result = NatsjobJobResult.success(keyValue, jobMessage.getJobEndKvKey(), "不嘻嘻");
                        System.out.println("work2 put kv :" + jobMessage.getJobEndKvKey() + " result " + result);
                    });


            System.out.println("start success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }

    private static void sendFlowMessage(Connection nc, JobMessage jobMessage, String clientId, String sceneId, String sceneName, String status, String reason) {
        JobSubFlowMessage subFlowMessage = new JobSubFlowMessage();
        subFlowMessage.setTaskId(jobMessage.getTaskId())
                .setNamespace(jobMessage.getNamespace())
                .setAppName(jobMessage.getAppName())
                .setJobName(jobMessage.getJobName())
                .setClientId(clientId)
                .setSceneId(sceneId)
                .setSceneName(sceneName)
                .setStatus(status)
                .setReason(reason)
                .setMonitorStatus("monitoring:email")
                .setMonitorPayload("积压1w条数据")
                .setStartAt(jobMessage.getJobCreatedAt())
                .setEndAt(LocalDateTime.now());
        nc.publish(NatsjobSubject.SUBJ_SUB_RESULT_FLOW, JSONUtil.toJsonStr(subFlowMessage).getBytes());
    }
}
