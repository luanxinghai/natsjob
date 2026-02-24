package com.natsjob.demo.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Data
public class JobResult {
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
