package com.natsjob.starter.handler;


import com.natsjob.starter.common.NatsJobClientHeartbeat;
import com.natsjob.starter.config.NatsJobProperties;
import com.natsjob.starter.domain.NatsJobClientReg;
import com.natsjob.starter.interfaces.common.OnNatsJobHeartbeatHandler;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

@Component
public class DefaultHeartbeatHandler implements OnNatsJobHeartbeatHandler {
    @Resource
    NatsJobProperties properties;

    @Value("${server.port:0}")
    int port;

    @Value("${spring.application.name:unknown}")
    String appName;

    //默认客户端
    final NatsJobClientReg defaultNatsJobClientReg = new NatsJobClientReg();
    final AtomicBoolean isInit = new AtomicBoolean(false);

    @Override
    public NatsJobClientReg onLoad() {
        //设置默认客户端,只处理一次
        if (isInit.compareAndSet(false, true)) {
            String uuid = UUID.randomUUID().toString().replace("-", "");
            uuid = uuid.substring(0, 8);
            defaultNatsJobClientReg.setId(NatsJobClientHeartbeat.getClientId(port + "", uuid))
                    .setNamespace(properties.getNamespace())
                    .setAppName(appName)
                    .setIp(NatsJobClientHeartbeat.getIp())
                    .setComment(null);
        }

        NatsJobClientHeartbeat.setDefaultNatsJobClientReg(defaultNatsJobClientReg);
        //如果有动态逻辑可以在此处增加,比如动态调整权重,cpu/内存等
        return defaultNatsJobClientReg;
    }

}
