package com.natsjob.starter.interfaces;

import com.natsjob.starter.domain.NatsJobMessage;

/**
 * Map
 */
public interface NatsJobMapHandler extends NatsJobBasicHandler {

    String jobName();

    void preProcess(NatsJobMessage jobMessage);

    void process(NatsJobMessage jobMessage);
}
