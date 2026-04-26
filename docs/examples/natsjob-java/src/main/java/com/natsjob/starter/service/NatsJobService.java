package com.natsjob.starter.service;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import com.natsjob.starter.common.NatsJobClient;
import com.natsjob.starter.common.NatsJobClientHeartbeat;
import com.natsjob.starter.common.NatsJobClientSubject;
import com.natsjob.starter.config.NatsJobProperties;
import com.natsjob.starter.handler.DefaultHeartbeatHandler;
import com.natsjob.starter.interfaces.NatsJobBroadcastHandler;
import com.natsjob.starter.interfaces.NatsJobMapHandler;
import com.natsjob.starter.interfaces.NatsJobStandaloneHandler;
import com.natsjob.starter.interfaces.common.OnNatsJobBasicHandler;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class NatsJobService implements ApplicationRunner, OnNatsJobBasicHandler {

    @Resource
    NatsJobProperties properties;

    @Value("${spring.application.name:unknown}")
    String appName;

    @Resource
    DefaultHeartbeatHandler heartbeatHandler;

    @Resource
    List<NatsJobStandaloneHandler> singleHandlers;

    @Resource
    List<NatsJobBroadcastHandler> broadcastHandlers;

    @Resource
    List<NatsJobMapHandler> mapHandlers;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (Boolean.FALSE.equals(properties.getEnabled())) {
            log.info("[NATSJOB] NatsJobBoot配置未开启,不启动");
            return;
        }

        // 初始化默认的命名空间和应用名称
        NatsJobClientSubject.setDefaultNamespace(properties.getNamespace(), appName);

        // 虚拟线程,防止阻塞主线程;nats初始化无法连接会阻塞bean
        Thread.ofVirtual().name("NatsBoot-thread").start(() -> {
            NatsJobClient.connection(properties.getNatsUrl(), () -> {
                if (CollectionUtil.isEmpty(singleHandlers)
                        && CollectionUtil.isEmpty(broadcastHandlers)
                        && CollectionUtil.isEmpty(mapHandlers)
                ) {
                    log.warn("[NATSJOB] 没有任务处理器,不执行心跳,不执行任何调度任务");
                    return;
                }

                // 处理心跳
                NatsJobClientHeartbeat.setHeartbeatHandlers(heartbeatHandler);

                // 增加单机
                for (NatsJobStandaloneHandler singleHandler : singleHandlers) {
                    if (StrUtil.isBlank(singleHandler.jobName())) {
                        log.error("[NATSJOB] 单机任务处理器注册失败: {}", singleHandler.getClass().getSimpleName());
                        continue;
                    }
                    subscribe(subjectStart(singleHandler.jobName()), workQueue(), (msg, message) -> {
                        singleHandler.process(message);
                    });
                    subscribe(subjectVoidStart(singleHandler.jobName()), workQueue(), (msg, message) -> {
                        singleHandler.process(message);
                    });
                    log.info("[NATSJOB] 单机任务处理器注册成功: {}", singleHandler.getClass().getSimpleName());
                }
                log.info("[NATSJOB] {}个单机任务处理器注册完毕", singleHandlers.size());

                // 增加广播
                for (NatsJobBroadcastHandler broadcastHandler : broadcastHandlers) {
                    if (StrUtil.isBlank(broadcastHandler.jobName())) {
                        log.error("[NATSJOB] 广播任务处理器注册失败: {}", broadcastHandler.getClass().getSimpleName());
                        continue;
                    }
                    subscribe(subjectStart(broadcastHandler.jobName()), (msg, message) -> {
                        broadcastHandler.process(message);
                    });
                    subscribe(subjectVoidStart(broadcastHandler.jobName()), (msg, message) -> {
                        broadcastHandler.process(message);
                    });
                    log.info("[NATSJOB] 广播任务处理器注册成功: {}", broadcastHandler.getClass().getSimpleName());
                }
                log.info("[NATSJOB] {}个广播任务处理器注册完毕", broadcastHandlers.size());

                // 增加map
                for (NatsJobMapHandler mapHandler : mapHandlers) {
                    if (StrUtil.isBlank(mapHandler.jobName())) {
                        log.error("[NATSJOB] map任务处理器注册失败: {}", mapHandler.getClass().getSimpleName());
                        continue;
                    }
                    subscribe(subjectPreStart(mapHandler.jobName()), workQueue(), (msg, message) -> {
                        mapHandler.preProcess(message);
                    });

                    subscribe(subjectStart(mapHandler.jobName()), (msg, message) -> {
                        mapHandler.process(message);
                    });

                    subscribe(subjectVoidPreStart(mapHandler.jobName()), workQueue(), (msg, message) -> {
                        mapHandler.preProcess(message);
                    });
                    subscribe(subjectVoidStart(mapHandler.jobName()), workQueue(), (msg, message) -> {
                        mapHandler.process(message);
                    });
                    log.info("[NATSJOB] map任务处理器注册成功: {}", mapHandler.getClass().getSimpleName());
                }
                log.info("[NATSJOB] {}个map任务处理器注册完毕", mapHandlers.size());

                log.info("[NATSJOB] 所有任务处理器注册完毕");
            });
        });

        log.info("[NATSJOB] NatsBoot start...");
    }
}
