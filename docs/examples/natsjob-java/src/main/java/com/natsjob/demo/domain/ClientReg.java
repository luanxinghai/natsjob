package com.natsjob.demo.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Data
public class ClientReg {
    /**
     * 自定义 id格式: 英文、数字、横线组合
     * 必填
     */
    private String id;
    /**
     * 命名空间,来自配置
     * 必填
     */
    private String namespace;
    /**
     * 应用名称,来自配置
     * 必填
     */
    private String appName;
    /**
     * ip地址,自定义
     * 非必填
     */
    private String ip;
    /**
     * 描述,自定义
     * 非必填
     */
    private String comment;
    /**
     * 权重,默认100
     * 例如: 根据权重策略,服务端可以选择权重高的进行下发
     * 权重为0,服务不会下发任务
     * 场景: 客户端自己控制所在服务器cpu,内存超过了阈值,则权重为0,服务不会下发任务,而是寻找权重高的服务器
     */
    private Integer weight=100;

    /**
     * 机器CPU使用率
     * 非必填
     */
    private String machineCpuUsage;
    /**
     * 机器内存使用率
     * 非必填
     */
    private String machineMemoryUsage;
    /**
     * 进程CPU使用率
     * 非必填
     */
    private String processCpuUsage;
    /**
     * 进程内存使用率
     * 非必填
     */
    private String processMemoryRss;

}
