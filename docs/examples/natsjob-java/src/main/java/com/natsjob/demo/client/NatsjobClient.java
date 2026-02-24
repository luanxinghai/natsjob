package com.natsjob.demo.client;

import cn.hutool.json.JSONUtil;
import com.natsjob.demo.domain.JobMessage;
import io.nats.client.*;
import lombok.extern.slf4j.Slf4j;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.concurrent.atomic.AtomicBoolean;

@Slf4j
public class NatsjobClient {
    private static final AtomicBoolean isConnected = new AtomicBoolean(false);
    private static Connection natsConnection;

    private NatsjobClient() {
        throw new AssertionError("禁止实例化静态工具类 NatsConnect");
    }


    public static void connection(String natsURL) {
        if (isConnected.get() || natsConnection != null) {
            log.info("NATS 连接已初始化，无需重复创建");
            return;
        }

        synchronized (NatsjobClient.class) {
            if (!isConnected.get()) {
                try {
                    // 构建 NATS 连接配置（包含自动重连、连接监听）
                    Options options = new Options.Builder()
                            .server(natsURL)
                            // 自动重连配置（生产环境建议开启）
                            .reconnectWait(Duration.ofSeconds(2))
                            .maxReconnects(-1) // -1 表示无限重连
                            .connectionListener((conn, type) -> {
                                switch (type) {
                                    case CONNECTED:
                                        isConnected.set(true);
                                        log.info("NATS 尝试连接成功");
                                        break;
                                    case DISCONNECTED:
                                        isConnected.set(false);
                                        log.error("NATS 连接已断开，尝试重新连接...");
                                        break;
                                    case RECONNECTED:
                                        isConnected.set(true);
                                        log.info("NATS 重连成功");
                                        break;
                                    case CLOSED:
                                        isConnected.set(false);
                                        log.info("NATS 连接已关闭");
                                        break;
                                    default:
                                        log.info("NATS 连接状态: {}", type);
                                }
                            })
                            .errorListener(new ErrorListener() {
                                @Override
                                public void errorOccurred(Connection conn, String error) {
                                    log.error("NATS 连接错误: {}", error);
                                }
                            })
                            .build();

                    // 创建带自动重连的连接
                    natsConnection = Nats.connectReconnectOnConnect(options);
                    log.info("NATS 连接初始化成功，地址: {}", natsURL);
                    isConnected.set(true);
                } catch (Exception e) {
                    log.error("NATS 连接初始化失败", e);
                }
            }
        }
    }

    public static Dispatcher subscribe(String subject, String workQueue, MessageHandler messageHandler) {
        checkConnection();
        Dispatcher dispatcher = natsConnection.createDispatcher();
        dispatcher.subscribe(subject, workQueue, messageHandler);
        log.info("NATS 主题队列消费者注册成功，subject: {}, queue: {}", subject, workQueue);
        return dispatcher;
    }

    public static Dispatcher subscribe(String subject, String workQueue, OnMessageHandler onMessageHandler) {
        checkConnection();
        Dispatcher dispatcher = natsConnection.createDispatcher();
        dispatcher.subscribe(subject, workQueue, (msg) -> {
            String content = new String(msg.getData(), StandardCharsets.UTF_8);
            onMessageHandler.onMessage(msg, JSONUtil.toBean(content, JobMessage.class));
        });
        log.info("NATS 主题队列消费者注册成功，subject: {}, queue: {}", subject, workQueue);
        return dispatcher;
    }

    public static Dispatcher subscribe(String subject, MessageHandler messageHandler) {
        checkConnection();
        Dispatcher dispatcher = natsConnection.createDispatcher();
        dispatcher.subscribe(subject, messageHandler);
        log.info("NATS 主题消费者注册成功，subject: {}", subject);
        return dispatcher;
    }

    public static Dispatcher subscribe(String subject, OnMessageHandler onMessageHandler) {
        checkConnection();
        Dispatcher dispatcher = natsConnection.createDispatcher();
        dispatcher.subscribe(subject, (msg) -> {
            String content = new String(msg.getData(), StandardCharsets.UTF_8);
            onMessageHandler.onMessage(msg, JSONUtil.toBean(content, JobMessage.class));
        });
        log.info("NATS 主题消费者注册成功，subject: {}", subject);
        return dispatcher;
    }

    /**
     * 优雅关闭 NATS 连接
     */
    public static void closeConnection() {
        if (isConnected.compareAndSet(true, false) && natsConnection != null) {
            try {
                natsConnection.close();
                log.info("NATS 连接已优雅关闭");
            } catch (Exception e) {
                log.error("NATS 连接关闭失败", e);
            } finally {
                natsConnection = null;
                isConnected.set(false);
            }
        } else {
            log.info("NATS 连接未初始化或已关闭，无需重复关闭");
        }
    }

    /**
     * 检查连接状态
     */
    private static void checkConnection() {
        if (!isConnected.get() || natsConnection == null) {
            throw new IllegalStateException("NATS 连接未初始化，请先调用 connection 方法");
        }
    }

    // ==================== 测试/使用示例 ====================
//    public static void main(String[] args) {
//        // 1. 初始化连接
//        String natsURL = "nats://127.0.0.1:4222";
//        NatsConnect.connection(natsURL);
//
//        // 2. 构建订阅主题
//        String subject = NatsjobSubject.getVoidStartSubject("app", "biz", "owner");
//        String workQueue = "worker-queue";
//
//        // 4. 方式2：自定义消息处理器（更灵活）
//        NatsConnect.subscribe(subject, workQueue, (msg) -> {
//            String content = new String(msg.getData(), StandardCharsets.UTF_8);
//            log.info("自定义处理器 | 收到消息: {}", content);
//            // 这里写你的业务逻辑
//        });
//        log.info(NatsjobClientHeartbeat.getClientId());
//        log.info("NATS 消费者启动成功...");
//        try {
//            Thread.currentThread().join();
//        } catch (InterruptedException e) {
//            log.error("主线程被中断", e);
//            Thread.currentThread().interrupt();
//        }
//    }


}
