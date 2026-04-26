package com.natsjob.starter.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Data
public class NatsJobResult {
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

    private String clientId;
}
