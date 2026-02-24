package com.natsjob.demo.domain;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Accessors(chain = true)
@Data
public class JobSubFlowMessage {
    /**
     * 每次下发任务唯一标识
     */
    private String taskId;
    /**
     * 命名空间,与服务端配置一致
     */
    private String namespace;
    /**
     * 应用名称,与服务端配置一致
     */
    private String appName;
    /**
     * 任务名称,与服务端配置一致
     */
    private String jobName;
     /**
     * 客户端ID
     */
    private String clientId;
    /**
     * 场景ID,与服务端配置一致
     */
    private String sceneId;
    /**
     * 场景名称,与服务端配置一致
     */
    private String sceneName;
    /**
     * 任务状态
     */
    private String status;
    /**
     * 任务状态原因
     */
    private String reason;
    /**
     * 监控状态
     */
    private String monitorStatus;
    /**
     * 监控随路数据
     */
    private String monitorPayload;
    /**
     * 任务开始时间
     */
    private LocalDateTime startAt;
    /**
     * 任务结束时间
     */
    private LocalDateTime endAt;
}
