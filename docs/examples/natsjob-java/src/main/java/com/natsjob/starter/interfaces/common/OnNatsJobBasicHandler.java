package com.natsjob.starter.interfaces.common;

import cn.hutool.core.util.StrUtil;

import com.natsjob.starter.common.NatsJobClient;
import com.natsjob.starter.common.NatsJobClientSubject;
import com.natsjob.starter.domain.NatsJobMessage;
import io.nats.client.Dispatcher;
import io.nats.client.MessageHandler;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;

import java.nio.charset.StandardCharsets;


public interface OnNatsJobBasicHandler {
    default Dispatcher subscribe(@NonNull String subject, @NonNull String workQueue, OnNatsJobMessageHandler onMessageHandler) {
        return NatsJobClient.subscribe(subject, workQueue, onMessageHandler);
    }

    default Dispatcher subscribe(@NonNull String subject, OnNatsJobMessageHandler onMessageHandler) {
        return NatsJobClient.subscribe(subject, onMessageHandler);
    }

    default Dispatcher subscribe(String subject, String workQueue, MessageHandler messageHandler) {
        return NatsJobClient.subscribe(subject, workQueue, messageHandler);
    }


    default boolean successNext(@NonNull NatsJobMessage jobMessage) {
        return NatsJobClient.successNext(jobMessage);
    }

    default boolean successNext(@NonNull NatsJobMessage jobMessage, String reason) {
        return NatsJobClient.successNext(jobMessage, reason);
    }


    default boolean success(@NonNull NatsJobMessage jobMessage) {
        return NatsJobClient.success(jobMessage);
    }

    default boolean success(@NonNull NatsJobMessage jobMessage, String reason) {
        return NatsJobClient.success(jobMessage, reason);
    }

    default boolean success(@NonNull NatsJobMessage jobMessage, String reason, String monitorStatus, String monitorPayload) {
        return NatsJobClient.success(jobMessage, reason, monitorStatus, monitorPayload);
    }


    default boolean fail(@NonNull NatsJobMessage jobMessage) {
        return NatsJobClient.fail(jobMessage, null);
    }

    default boolean fail(@NonNull NatsJobMessage jobMessage, String reason) {
        return NatsJobClient.fail(jobMessage, reason);
    }

    default boolean fail(@NonNull NatsJobMessage jobMessage, String reason, String monitorStatus, String monitorPayload) {
        return NatsJobClient.fail(jobMessage, reason, monitorStatus, monitorPayload);
    }

    default void publish(@NonNull String subject, byte[] message) {
        NatsJobClient.publish(subject, message);
    }

    default void publish(@NonNull String subject, @Nullable String message) {
        NatsJobClient.publish(subject, StrUtil.isBlank(message) ? null : message.getBytes(StandardCharsets.UTF_8));
    }

    default String workQueue(String queueNameSuffix) {
        return NatsJobClient.getWorkQueue(queueNameSuffix);
    }

    default String workQueue() {
        return NatsJobClient.getWorkQueue();
    }

    /**
     * 支持lite模式
     *
     * @param jobName 任务名
     * @return subject
     */
    default String subjectVoidStart(@NonNull String jobName) {
        return NatsJobClientSubject.getVoidStartSubject(jobName);
    }

    default String subjectStart(@NonNull String jobName) {
        return NatsJobClientSubject.getStartSubject(jobName);
    }

    /**
     * 支持lite模式
     *
     * @param jobName 任务名
     * @return subject
     */
    default String subjectVoidPreStart(@NonNull String jobName) {
        return NatsJobClientSubject.getVoidPreStartSubject(jobName);
    }

    default String subjectPreStart(@NonNull String jobName) {
        return NatsJobClientSubject.getPreStartSubject(jobName);
    }

    default String subjectClientStart(@NonNull String jobName, @NonNull String clientId) {
        return NatsJobClientSubject.getClientStartSubject(jobName, clientId);
    }

    default String subjectGroupStart(@NonNull String jobName) {
        return NatsJobClientSubject.getGroupStartSubject(jobName);
    }

    default String subjectAgentStart(@NonNull String jobName) {
        return NatsJobClientSubject.getAgentStartSubject(jobName);
    }

    default void publishSubFlow(NatsJobMessage jobMessage, String sceneId, String sceneName, String status, String reason) {
        NatsJobClient.publishSubFlow(jobMessage, sceneId, sceneName, status, reason);
    }

    default String toString(byte[] data) {
        return NatsJobClient.toString(data);
    }
}
