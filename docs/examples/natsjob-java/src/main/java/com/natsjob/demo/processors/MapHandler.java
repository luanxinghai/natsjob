package com.natsjob.demo.processors;


import com.natsjob.starter.domain.NatsJobMessage;
import com.natsjob.starter.interfaces.NatsJobMapHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class MapHandler implements NatsJobMapHandler {

    @Override
    public String jobName() {
        return "owner-map";
    }

    @Override
    public void preProcess(NatsJobMessage jobMessage) {
        log.info("[MapHandler] preProcess 执行: jobName={}, taskId={}", jobMessage.getJobName(), jobMessage.getTaskId());
        // 业务逻辑...
        successNext(jobMessage, "preProcess 完成，触发广播next");
        //fail(jobMessage, "preProcess 失败，不需要广播");
    }

    /**
     * 广播阶段（所有节点执行）
     */
    @Override
    public void process(NatsJobMessage jobMessage) {
        log.info("[MapHandler] process 广播执行: jobName={}, taskId={}", jobMessage.getJobName(), jobMessage.getTaskId());
        // 业务逻辑...
        success(jobMessage, "Map 全部流程执行完成");
    }
}
