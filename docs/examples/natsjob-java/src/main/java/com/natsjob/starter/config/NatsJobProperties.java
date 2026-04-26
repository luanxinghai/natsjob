package com.natsjob.starter.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;


@Data
@Component
@ConfigurationProperties(prefix = "natsjob")
public class NatsJobProperties {

    /**
     * 是否启用，默认开启
     */
    private Boolean enabled = true;

    /**
     * 命名空间，与服务端配置一致，默认 app
     */
    private String namespace = "app";
    /**
     * NATS 服务地址（natsjob 模式使用）
     */
    private String natsUrl = "nats://127.0.0.1:4222";

}

