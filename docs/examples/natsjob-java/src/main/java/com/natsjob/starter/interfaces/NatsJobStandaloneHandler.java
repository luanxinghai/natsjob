package com.natsjob.starter.interfaces;

import com.natsjob.starter.domain.NatsJobMessage;

/**
 * 单机任务
 */
public interface NatsJobStandaloneHandler extends NatsJobBasicHandler {

    String jobName();

    void process(NatsJobMessage jobMessage);
}
