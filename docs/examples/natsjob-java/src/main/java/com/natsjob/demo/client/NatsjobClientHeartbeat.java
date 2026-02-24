package com.natsjob.demo.client;

import cn.hutool.json.JSONUtil;
import com.natsjob.demo.domain.ClientReg;
import io.nats.client.KeyValue;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class NatsjobClientHeartbeat {
    public static void register(KeyValue keyValue, ClientReg clientReg) {
        String regKey = NatsjobSubject.getClientHeartbeatKVKey(clientReg.getNamespace(), clientReg.getAppName(), clientReg.getId());
        String regMsg = JSONUtil.toJsonStr(clientReg);
        Executors.newSingleThreadScheduledExecutor()
                .scheduleAtFixedRate(() -> {
                    try {
                        keyValue.put(regKey, regMsg);
                        System.out.println("put kv client reg:" + regKey + " : " + regMsg);
                    } catch (Exception e) {
                        System.out.println("put kv client reg error:" + e.getMessage());
                    }
                }, 0, 5, TimeUnit.SECONDS)
        ;
        System.out.println("start client heartbeat");
    }


    public static String getClientId() {
        return getClientId("0", "");
    }

    public static String getClientId(String port) {
        return getClientId(port, "");
    }

    public static String getClientId(String port, String customId) {
        try {
            String hostName = InetAddress.getLocalHost().getHostName();
            String ip = InetAddress.getLocalHost().getHostAddress();
            String clientId = hostName + "-" + ip + "-" + port;
            if (customId != null && !customId.isEmpty()) {
                clientId += "-" + customId;
            }
            return clientId.replace(":", "-")
                    .replace(".", "").toLowerCase();
        } catch (UnknownHostException e) {
            System.out.println("get client id error:" + e.getMessage());
        }
        return UUID.randomUUID().toString().toLowerCase();
    }
}