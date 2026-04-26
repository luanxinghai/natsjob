package com.natsjob.starter.common;

import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.natsjob.starter.domain.NatsJobMessage;
import com.natsjob.starter.domain.NatsJobSubFlowMessage;
import com.natsjob.starter.interfaces.common.OnNatsJobConnectionListener;
import com.natsjob.starter.interfaces.common.OnNatsJobMessageHandler;
import io.nats.client.Connection;
import io.nats.client.Dispatcher;
import io.nats.client.ErrorListener;
import io.nats.client.KeyValue;
import io.nats.client.MessageHandler;
import io.nats.client.Nats;
import io.nats.client.Options;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicBoolean;

@Slf4j
public class NatsJobClient {

    private static final AtomicBoolean onceLoad = new AtomicBoolean(false);

    // NATS 核心连接（单例）
    private static Connection natsConnection;
    // 连接状态标识（避免重复初始化/关闭）
    private static final AtomicBoolean isConnected = new AtomicBoolean(false);

    public static Connection getConnection() {
        return natsConnection;
    }

    public static boolean isConnected() {
        return isConnected.get();
    }

    /**
     * 初始化 NATS 连接（懒加载，线程安全）
     *
     * @param natsURL NATS 服务地址（如：nats://127.0.0.1:4222）
     */
    public static void connection(String natsURL, OnNatsJobConnectionListener onConnectionListener) {
        // 双重检查锁，保证单例且线程安全
        if (isConnected.get() || natsConnection != null) {
            log.info("[NATS] 连接已初始化，无需重复创建");
            return;
        }

        synchronized (NatsJobClient.class) {
            if (!isConnected.get()) {
                try {
                    // 构建 NATS 连接配置（包含自动重连、连接监听）
                    Options options = new Options.Builder()
                            .server(natsURL)
                            // 自动重连配置（生产环境建议开启）
                            .reconnectWait(Duration.ofSeconds(2))
                            .maxReconnects(-1) // -1 表示无限重连
                            // 连接状态监听（日志完善）
                            .connectionListener((conn, type) -> {
                                switch (type) {
                                    case CONNECTED:
                                        isConnected.set(true);
                                        log.info("[NATS] 连接成功");
                                        if (onceLoad.compareAndSet(false, true)) {
                                            onConnectionListener.onOnceLoad();
                                        }
                                        break;
                                    case DISCONNECTED:
                                        isConnected.set(false);
                                        log.error("[NATS] 连接已断开，尝试重新连接... {}", natsURL);
                                        break;
                                    case RECONNECTED:
                                        isConnected.set(true);
                                        log.info("[NATS] 重连成功");
                                        break;
                                    case CLOSED:
                                        isConnected.set(false);
                                        log.info("[NATS] 连接已关闭");
                                        break;
                                    default:
                                        log.info("[NATS] 连接状态: {}", type);
                                }
                            })
                            .errorListener(new ErrorListener() {
                                @Override
                                public void errorOccurred(Connection conn, String error) {
                                    log.error("[NATS] 连接错误: {}", error);
                                }
                            })
                            .build();

                    // 创建带自动重连的连接
                    natsConnection = Nats.connectReconnectOnConnect(options);
                    log.info("[NATS] 连接初始化成功，地址: {}", natsURL);
                    isConnected.set(true);
                } catch (Exception e) {
                    log.error("[NATS] 连接初始化失败", e);
                }
            }
        }
    }

    /**
     * 注册队列消费者（核心调用方法）
     *
     * @param subject        订阅主题
     * @param workQueue      队列名称（负载均衡用）
     * @param messageHandler 消息处理逻辑（自定义业务）
     * @return Dispatcher 调度器（可用于取消订阅）
     */
    public static Dispatcher subscribe(String subject, String workQueue, MessageHandler messageHandler) {
        Dispatcher dispatcher = natsConnection.createDispatcher();
        dispatcher.subscribe(subject, workQueue, messageHandler);
        log.info("[NATS] 主题队列消费者注册成功，subject: {}, queue: {}", subject, workQueue);
        return dispatcher;
    }

    public static Dispatcher subscribe(String subject, String workQueue, OnNatsJobMessageHandler onMessageHandler) {
        Dispatcher dispatcher = natsConnection.createDispatcher();
        dispatcher.subscribe(subject, workQueue, (msg) -> {
            String content = new String(msg.getData(), StandardCharsets.UTF_8);
            onMessageHandler.onMessage(msg, JSONUtil.toBean(content, NatsJobMessage.class));
        });
        log.info("[NATS] 主题队列消费者注册成功，subject: {}, queue: {}", subject, workQueue);
        return dispatcher;
    }

    /**
     * 注册队列消费者（核心调用方法）
     *
     * @param subject        订阅主题
     * @param messageHandler 消息处理逻辑（自定义业务）
     * @return Dispatcher 调度器（可用于取消订阅）
     */
    public static Dispatcher subscribe(String subject, MessageHandler messageHandler) {
        Dispatcher dispatcher = natsConnection.createDispatcher();
        dispatcher.subscribe(subject, messageHandler);
        log.info("[NATS] 主题消费者注册成功，subject: {}", subject);
        return dispatcher;
    }

    public static Dispatcher subscribe(String subject, OnNatsJobMessageHandler onMessageHandler) {
        // 创建调度器并订阅队列
        Dispatcher dispatcher = natsConnection.createDispatcher();
        dispatcher.subscribe(subject, (msg) -> {
            String content = new String(msg.getData(), StandardCharsets.UTF_8);
            onMessageHandler.onMessage(msg, JSONUtil.toBean(content, NatsJobMessage.class));
        });
        log.info("[NATS] 主题消费者注册成功，subject: {}", subject);
        return dispatcher;
    }

    /**
     * 优雅关闭 NATS 连接
     */
    public static void closeConnection() {
        if (isConnected.compareAndSet(true, false) && natsConnection != null) {
            try {
                natsConnection.close();
                log.info("[NATS] 连接已优雅关闭");
            } catch (Exception e) {
                log.error("[NATS] 连接关闭失败", e);
            } finally {
                natsConnection = null;
                isConnected.set(false);
            }
        } else {
            log.info("[NATS] 连接未初始化或已关闭，无需重复关闭");
        }
    }

    /**
     * 检查连接状态（内部工具方法）
     */
    private static void checkConnection() {
        if (!isConnected.get() || natsConnection == null) {
            throw new IllegalStateException("[NATS] 连接未初始化，请先调用 initConnection 方法");
        }
    }


    public static boolean success(NatsJobMessage jobMessage) {
        return success(jobMessage, null);
    }

    public static boolean success(NatsJobMessage jobMessage, String reason) {
        return success(jobMessage, reason, null, null);
    }

    public static boolean success(NatsJobMessage jobMessage, String reason, String monitorStatus, String monitorPayload) {
        if (jobMessage == null) {
            return false;
        }
        try {
            KeyValue keyValue = natsConnection.keyValue(NatsJobClientSubject.KV_BUCKET_JOB_RESULT);
            return NatsJobClientResult.success(keyValue, jobMessage.getJobEndKvKey(), reason, monitorStatus, monitorPayload);
        } catch (Exception e) {
            log.error("[NATSJOB] put kv error:{},jobEndKvKey:{},reason:{}", e.getMessage(), jobMessage.getJobEndKvKey(), reason);
        }
        return false;
    }

    public static boolean successNext(NatsJobMessage jobMessage) {
        return successNext(jobMessage, null);
    }

    public static boolean successNext(NatsJobMessage jobMessage, String reason) {
        if (jobMessage == null) {
            return false;
        }
        try {
            KeyValue keyValue = natsConnection.keyValue(NatsJobClientSubject.KV_BUCKET_JOB_RESULT);
            return NatsJobClientResult.successNext(keyValue, jobMessage.getJobEndKvKey(), reason);
        } catch (Exception e) {
            log.error("[NATSJOB] put kv error:{},jobEndKvKey:{},reason:{}", e.getMessage(), jobMessage.getJobEndKvKey(), reason);
        }
        return false;
    }

    public static boolean fail(NatsJobMessage jobMessage) {
        return fail(jobMessage, null);
    }

    public static boolean fail(NatsJobMessage jobMessage, String reason) {
        return fail(jobMessage, reason, null, null);
    }

    public static boolean fail(NatsJobMessage jobMessage, String reason, String monitorStatus, String monitorPayload) {
        if (jobMessage == null) {
            return false;
        }

        try {
            KeyValue keyValue = natsConnection.keyValue(NatsJobClientSubject.KV_BUCKET_JOB_RESULT);
            return NatsJobClientResult.fail(keyValue, jobMessage.getJobEndKvKey(), reason, monitorStatus, monitorPayload);
        } catch (Exception e) {
            log.error("[NATSJOB] put kv error:{},jobEndKvKey:{},reason:{}", e.getMessage(), jobMessage.getJobEndKvKey(), reason);
        }
        return false;
    }

    public static void publish(@NonNull String subject, byte[] message) {
        natsConnection.publish(subject, message);
    }

    public static void publish(@NonNull String subject, @Nullable String message) {
        natsConnection.publish(subject, StrUtil.isBlank(message) ? null : message.getBytes(StandardCharsets.UTF_8));
    }


    /**
     * 获取工作队列名称
     *
     * @param queueNameSuffix 队列名称后缀
     * @return 工作队列名称
     */
    public static String getWorkQueue(String queueNameSuffix) {
        if (StrUtil.isBlank(queueNameSuffix)) {
            return "worker-queue";
        }
        return "worker-queue-" + queueNameSuffix;
    }

    public static String getWorkQueue() {
        return getWorkQueue(null);
    }


    public static KeyValue keyValue(String bucketName) throws IOException {
        checkConnection();
        return natsConnection.keyValue(bucketName);
    }

    /**
     * 推送子流程信息
     *
     * @param jobMessage
     * @param sceneId
     * @param sceneName
     * @param status
     * @param reason
     */
    public static void publishSubFlow(NatsJobMessage jobMessage, String sceneId, String sceneName, String status, String reason) {
        NatsJobSubFlowMessage subFlowMessage = new NatsJobSubFlowMessage();
        subFlowMessage.setTaskId(jobMessage.getTaskId())
                .setNamespace(jobMessage.getNamespace())
                .setAppName(jobMessage.getAppName())
                .setJobName(jobMessage.getJobName())
                .setClientId(NatsJobClientHeartbeat.getDefaultClientId())
                .setSceneId(sceneId)
                .setSceneName(sceneName)
                .setStatus(status)
                .setReason(reason)
                .setMonitorStatus(null)
                .setMonitorPayload(null)
                .setStartAt(jobMessage.getJobCreatedAt())
                .setEndAt(LocalDateTime.now());

        natsConnection.publish(NatsJobClientSubject.SUBJ_SUB_RESULT_FLOW, JSONUtil.toJsonStr(subFlowMessage).getBytes());
        log.info("[NATSJOB] send flow message,{}", JSONUtil.toJsonStr(subFlowMessage));
    }

    public static String toString(byte[] data) {
        return new String(data, StandardCharsets.UTF_8);
    }
}
