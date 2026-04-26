package com.natsjob.starter.configuration;

import com.natsjob.starter.interfaces.NatsJobBroadcastHandler;
import com.natsjob.starter.interfaces.NatsJobLoadHandler;
import com.natsjob.starter.interfaces.NatsJobMapHandler;
import com.natsjob.starter.interfaces.NatsJobStandaloneHandler;
import com.natsjob.starter.interfaces.common.OnNatsJobHeartbeatHandler;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;
import java.util.List;


@Configuration
public class NatsJobHandlerFallbackConfig {

    @Bean
    @ConditionalOnMissingBean(NatsJobLoadHandler.class)
    public List<NatsJobLoadHandler> emptyScheduleJobHandlers() {
        return Collections.emptyList();
    }

    @Bean
    @ConditionalOnMissingBean(OnNatsJobHeartbeatHandler.class)
    public List<OnNatsJobHeartbeatHandler> emptyScheduleHeartbeatHandlers() {
        return Collections.emptyList();
    }

    @Bean
    @ConditionalOnMissingBean(NatsJobStandaloneHandler.class)
    public List<NatsJobStandaloneHandler> emptyScheduleSingleHandlers() {
        return Collections.emptyList();
    }

    @Bean
    @ConditionalOnMissingBean(NatsJobBroadcastHandler.class)
    public List<NatsJobBroadcastHandler> emptyScheduleBroadcastHandlers() {
        return Collections.emptyList();
    }

    @Bean
    @ConditionalOnMissingBean(NatsJobMapHandler.class)
    public List<NatsJobMapHandler> emptyScheduleMapHandlers() {
        return Collections.emptyList();
    }

}
