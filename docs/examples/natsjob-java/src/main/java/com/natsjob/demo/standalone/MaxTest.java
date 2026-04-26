package com.natsjob.demo.standalone;


import cn.hutool.json.JSONUtil;
import com.natsjob.starter.common.NatsJobClientResult;
import com.natsjob.starter.common.NatsJobClientSubject;
import com.natsjob.starter.domain.NatsJobMessage;
import com.natsjob.starter.domain.NatsJobSubFlowMessage;
import io.nats.client.Connection;
import io.nats.client.KeyValue;
import io.nats.client.Nats;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

public class MaxTest {
    public static void main(String[] args) {
        String natsURL = "nats://127.0.0.1:4222";
        String subject = NatsJobClientSubject.getStartSubject("app", "biz", "owner");
        String workQueue = "worker-queue";
        String jobResultKVBucket = NatsJobClientSubject.KV_BUCKET_JOB_RESULT;

        try (Connection nc = Nats.connect(natsURL)) {
            KeyValue keyValue = nc.keyValue(jobResultKVBucket);
            //消费1
            nc.createDispatcher()
                    .subscribe(subject, workQueue, (msg) -> {
                        String data = new String(msg.getData(), StandardCharsets.UTF_8);
                        System.out.printf("work1: %s on subject %s\n", data, msg.getSubject());
                        NatsJobMessage jobMessage = JSONUtil.toBean(data, NatsJobMessage.class);

                        //自定义场景
                        for (int i = 0; i < 10; i++) {
                            sendFlowMessage(nc, jobMessage, "client-A", "scene-1", "场景1", "process1", "进入基础境" + i);
                            sendFlowMessage(nc, jobMessage, "client-B", "scene-2", "场景2", "process2", "进入专业境" + i);
                            sendFlowMessage(nc, jobMessage, "client-C", "scene-3", "场景3", "process3", "化神嘻嘻了" + i);
                        }
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

                        //自定义场景
                        for (int i = 0; i < 10; i++) {
                            sendFlowMessage(nc, jobMessage, "client-A", "fail-scene-1", "场景1", "process1", "我是天才" + i);
                            sendFlowMessage(nc, jobMessage, "client-B", "fail-scene-2", "场景2", "process2", "我是伪灵根" + i);
                            sendFlowMessage(nc, jobMessage, "client-C", "fail-scene-3", "场景3", "process3", "打工不嘻嘻" + i);
                        }
                        boolean result = NatsJobClientResult.fail(keyValue, jobMessage.getJobEndKvKey(), "不嘻嘻");
                        System.out.println("work2 put kv :" + jobMessage.getJobEndKvKey() + " fail " + result);
                    });

            System.out.println("start success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 测试发送子流程消息
     * 可以自定义相关信息
     */
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