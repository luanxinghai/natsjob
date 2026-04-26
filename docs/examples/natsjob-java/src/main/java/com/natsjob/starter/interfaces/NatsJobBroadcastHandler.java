package com.natsjob.starter.interfaces;

import com.natsjob.starter.domain.NatsJobMessage;

/**
 * 广播任务
 */
public interface NatsJobBroadcastHandler extends NatsJobBasicHandler {

    String jobName();

    void process(NatsJobMessage jobMessage);
}
