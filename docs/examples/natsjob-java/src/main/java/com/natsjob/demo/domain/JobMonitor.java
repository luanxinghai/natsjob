package com.natsjob.demo.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Data
public class JobMonitor {
    /**
     * 每次下发任务唯一标识
     */
    private String taskId;
    /**
     * 子任务唯一标识
     */
    private String subTaskId;
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
     * 状态
     */
    private String status;
    /**
     * 原因
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
}
