package com.natsjob.starter.common;

import cn.hutool.core.util.IdUtil;
import cn.hutool.json.JSONUtil;
import com.natsjob.starter.domain.NatsJobClientReg;
import com.natsjob.starter.interfaces.common.OnNatsJobHeartbeatHandler;
import io.nats.client.Connection;
import io.nats.client.KeyValue;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;


@Slf4j
public class NatsJobClientHeartbeat {

    @Setter
    private static NatsJobClientReg defaultNatsJobClientReg;

    public static String getDefaultClientId() {
        return defaultNatsJobClientReg == null ? null : defaultNatsJobClientReg.getId();
    }

    public static void setHeartbeatHandlers(OnNatsJobHeartbeatHandler heartbeatHandlers) {
        if (heartbeatHandlers == null) {
            log.info("[NATSJOB] no client reg,不执行心跳");
            return;
        }
        //处理心跳
        Executors.newSingleThreadScheduledExecutor()
                .scheduleAtFixedRate(() -> {
                    try {
                        KeyValue keyValue = NatsJobClient.keyValue(NatsJobClientSubject.KV_BUCKET_CLIENT_HEARTBEAT);
                        NatsJobClientReg reg = heartbeatHandlers.onLoad();
                        if (reg != null) {
                            try {
                                String regKey = NatsJobClientSubject.getClientHeartbeatKVKey(reg.getNamespace(), reg.getAppName(), reg.getId());
                                String regMsg = JSONUtil.toJsonStr(reg);
                                keyValue.put(regKey, regMsg);
                                if (log.isDebugEnabled()) {
                                    log.debug("[NATSJOB] put kv client reg:{} : {}", regKey, regMsg);
                                }
                            } catch (Exception e) {
                                log.error("[NATSJOB] put kv client reg error:{}", e.getMessage());
                            }
                        }
                    } catch (Exception e) {
                        log.error("[NATSJOB] get kv client reg error:{}", e.getMessage());
                    }
                }, 0, 5, TimeUnit.SECONDS)
        ;
        log.info("[NATSJOB] start client heartbeat");
    }


    public static void register(KeyValue keyValue, NatsJobClientReg clientReg) {
        String regKey = NatsJobClientSubject.getClientHeartbeatKVKey(clientReg.getNamespace(), clientReg.getAppName(), clientReg.getId());
        String regMsg = JSONUtil.toJsonStr(clientReg);
        Executors.newSingleThreadScheduledExecutor()
                .scheduleAtFixedRate(() -> {
                    try {
                        keyValue.put(regKey, regMsg);
                        // log.info("put kv client reg:{} : {}", regKey, regMsg);
                    } catch (Exception e) {
                        log.error("put kv client reg error:{}", e.getMessage());
                    }
                }, 0, 5, TimeUnit.SECONDS)
        ;
        log.info("start client heartbeat");
    }

    public static void register(Connection natsConnection, NatsJobClientReg clientReg) {
        String regKey = NatsJobClientSubject.getClientHeartbeatKVKey(clientReg.getNamespace(), clientReg.getAppName(), clientReg.getId());
        String regMsg = JSONUtil.toJsonStr(clientReg);
        final KeyValue[] keyValue = {null};
        Executors.newSingleThreadScheduledExecutor()
                .scheduleAtFixedRate(() -> {
                    try {
                        if (keyValue[0] == null) {
                            keyValue[0] = natsConnection.keyValue(NatsJobClientSubject.KV_BUCKET_CLIENT_HEARTBEAT);
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
            log.error("[NATSJOB] get client id error:{}", e.getMessage());
        }
        return IdUtil.fastSimpleUUID().toLowerCase();
    }

    public static String getIp() {
        try {
            return InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            log.error("[NATSJOB] get ip error:{}", e.getMessage());
        }
        return "unknown-ip";
    }
}