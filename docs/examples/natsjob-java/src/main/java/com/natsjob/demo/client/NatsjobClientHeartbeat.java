package com.natsjob.demo.client;

import cn.hutool.core.util.IdUtil;
import cn.hutool.json.JSONUtil;
import com.natsjob.demo.domain.ClientReg;
import io.nats.client.Connection;
import io.nats.client.KeyValue;
import lombok.extern.slf4j.Slf4j;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Slf4j
public class NatsjobClientHeartbeat {
    public static void register(Connection natsConnection, ClientReg clientReg) {
        String regKey = NatsjobSubject.getClientHeartbeatKVKey(clientReg.getNamespace(), clientReg.getAppName(), clientReg.getId());
        String regMsg = JSONUtil.toJsonStr(clientReg);
        final KeyValue[] keyValue = {null};
        Executors.newSingleThreadScheduledExecutor()
                .scheduleAtFixedRate(() -> {
                    try {
                        if (keyValue[0] == null) {
                            keyValue[0] = natsConnection.keyValue(NatsjobSubject.KV_BUCKET_CLIENT_HEARTBEAT);
                        }
                        keyValue[0].put(regKey, regMsg);
                        if (log.isDebugEnabled()) {
                            log.debug("put kv client reg:{} : {}", regKey, regMsg);
                        }
                    } catch (Exception e) {
                        log.error("put kv client reg error:{}", e.getMessage());
                    }
                }, 0, 5, TimeUnit.SECONDS)
        ;
        log.info("start client heartbeat");
    }

    public static String getClientId(String port) {
        return getClientId(port, "");
    }

    public static String getClientId(String port, String customId) {
        try {
            String hostName = InetAddress.getLocalHost().getHostName();
            String ip = InetAddress.getLocalHost().getHostAddress();
            ip = ip.replace(".", "-");
            String clientId = hostName + "=" + ip + "=" + port;
            if (customId != null && !customId.isEmpty()) {
                clientId += "=" + customId;
            }
            return clientId
                    .replace(":", "-")
                    .replace(".", "")
                    .toLowerCase();
        } catch (UnknownHostException e) {
            log.error("get client id error:{}", e.getMessage());
        }
        return IdUtil.fastSimpleUUID().toLowerCase();
    }
}