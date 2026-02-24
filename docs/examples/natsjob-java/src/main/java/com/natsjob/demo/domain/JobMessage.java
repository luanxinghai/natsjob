package com.natsjob.demo.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class JobMessage {
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
     * 任务分类,与服务端配置一致
     */
    private String jobCategory;
    /**
     * 任务模型,与服务端配置一致
     */
    private String jobModel;
    /**
     * 运行条件,与服务端配置一致
     */
    private String condition;
    /**
     * 任务参数,与服务端配置一致
     */
    private String jobArgs;
    /**
     * 任务创建时间
     */
    private LocalDateTime jobCreatedAt;
    /**
     * 任务过期时间
     */
    private LocalDateTime jobExpireTime;
    /**
     * 任务结束kv键
     * 空: 说明此任务无需结束,服务端不会存储任务结束结果
     */
    private String jobEndKvKey;
    /**
     * 任务结束kv桶
     */
    private String jobEndResultKvBucket;
    /**
     * 如果自定义下一个任务,需要携带相关信息可以用json保存此字段
     * 服务端下发默认为空
     */
    private String nextPayload;
}
