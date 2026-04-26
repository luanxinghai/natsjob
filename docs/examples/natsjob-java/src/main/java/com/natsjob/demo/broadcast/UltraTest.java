package com.natsjob.demo.broadcast;

import cn.hutool.json.JSONUtil;
import com.natsjob.starter.common.NatsJobClientHeartbeat;
import com.natsjob.starter.common.NatsJobClientResult;
import com.natsjob.starter.common.NatsJobClientSubject;
import com.natsjob.starter.domain.NatsJobClientReg;
import com.natsjob.starter.domain.NatsJobMessage;
import com.natsjob.starter.domain.NatsJobSubFlowMessage;
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
        final String subject = NatsJobClientSubject.getClientStartSubject("app", "biz", "owner", clientId);
        final NatsJobClientReg clientReg = new NatsJobClientReg()
                .setId(clientId)
                .setNamespace("app")
                .setAppName("biz")
                .setIp("127.0.0.1")
                .setComment("demo");


        final String clientId2 = "client-2";
        final String subject2 = NatsJobClientSubject.getClientStartSubject("app", "biz", "owner", clientId2);
        final NatsJobClientReg clientReg2 = new NatsJobClientReg()
                .setId(clientId2)
                .setNamespace("app")
                .setAppName("biz")
                .setIp("127.0.0.1")
                .setComment("demo");

        try (Connection nc = Nats.connect(natsURL)) {

            KeyValue keyValue = nc.keyValue(NatsJobClientSubject.KV_BUCKET_JOB_RESULT);
            //注入心跳
            NatsJobClientHeartbeat.register(nc, clientReg);
            NatsJobClientHeartbeat.register(nc, clientReg2);
            //消费1
            nc.createDispatcher()
                    .subscribe(subject, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work1: %s on subject %s\n", data, msg.getSubject());

                        NatsJobMessage jobMessage = JSONUtil.toBean(data, NatsJobMessage.class);
                        //发送子流程消息
                        sendFlowMessage(nc, jobMessage, clientId, "scene-1", "场景1", "success", "嘻嘻");
                        boolean result = NatsJobClientResult.success(keyValue, jobMessage.getJobEndKvKey(), "嘻嘻");
                        System.out.println("work1 put kv :" + jobMessage.getJobEndKvKey() + " result " + result);
                    });

            //消费2
            nc.createDispatcher()
                    .subscribe(subject2, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work2: %s on subject %s\n", data, msg.getSubject());

                        NatsJobMessage jobMessage = JSONUtil.toBean(data, NatsJobMessage.class);
                        sendFlowMessage(nc, jobMessage, clientId2, "scene-1", "场景1", "success", "不嘻嘻");
                        boolean result = NatsJobClientResult.success(keyValue, jobMessage.getJobEndKvKey(), "不嘻嘻");
                        System.out.println("work2 put kv :" + jobMessage.getJobEndKvKey() + " result " + result);
                    });


            System.out.println("start success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }

    private static void sendFlowMessage(Connection nc, NatsJobMessage jobMessage, String clientId, String sceneId, String sceneName, String status, String reason) {
        NatsJobSubFlowMessage subFlowMessage = new NatsJobSubFlowMessage();
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
        nc.publish(NatsJobClientSubject.SUBJ_SUB_RESULT_FLOW, JSONUtil.toJsonStr(subFlowMessage).getBytes());
    }
}
