package com.natsjob.starter.interfaces.common;


import com.natsjob.starter.domain.NatsJobMessage;
import io.nats.client.Message;

public interface OnNatsJobMessageHandler {
    void onMessage(Message message, NatsJobMessage jobMessage);
}
