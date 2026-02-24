package com.natsjob.demo.client;


import com.natsjob.demo.domain.JobMessage;
import io.nats.client.Message;

public interface OnMessageHandler {
    void onMessage(Message message, JobMessage jobMessage);
}
