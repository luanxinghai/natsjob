package com.natsjob.starter.interfaces;

import com.natsjob.starter.common.NatsJobClient;
import com.natsjob.starter.domain.NatsJobMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public interface NatsJobBasicHandler {
    Logger log = LoggerFactory.getLogger(NatsJobBasicHandler.class);

    default boolean success(NatsJobMessage jobMessage) {
        return success(jobMessage, null);
    }

    default boolean success(NatsJobMessage jobMessage, String reason) {
        if (jobMessage == null) {
            return false;
        }
        return NatsJobClient.success(jobMessage, reason);
    }

    default boolean success(NatsJobMessage jobMessage, String reason, String monitorStatus, String monitorPayload) {
        if (jobMessage == null) {
            return false;
        }
        return NatsJobClient.success(jobMessage, reason, monitorStatus, monitorPayload);
    }

    default boolean successNext(NatsJobMessage jobMessage) {
        return successNext(jobMessage, null);
    }

    default boolean successNext(NatsJobMessage jobMessage, String reason) {
        if (jobMessage == null) {
            return false;
        }
        return NatsJobClient.successNext(jobMessage, reason);
    }


    default boolean fail(NatsJobMessage jobMessage) {
        return fail(jobMessage, null);
    }

    default boolean fail(NatsJobMessage jobMessage, String reason) {
        if (jobMessage == null) {
            return false;
        }
        return NatsJobClient.fail(jobMessage, reason);
    }

    default boolean fail(NatsJobMessage jobMessage, String reason, String monitorStatus, String monitorPayload) {
        if (jobMessage == null) {
            return false;
        }
        return NatsJobClient.fail(jobMessage, reason, monitorStatus, monitorPayload);
    }

    default void publishSubFlow(NatsJobMessage jobMessage, String sceneId, String sceneName, String status, String reason) {
        if (jobMessage == null) {
            return;
        }
        NatsJobClient.publishSubFlow(jobMessage, sceneId, sceneName, status, reason);
    }

}
