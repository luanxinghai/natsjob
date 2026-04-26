package com.natsjob.demo.processors;


import com.natsjob.starter.domain.NatsJobMessage;
import com.natsjob.starter.interfaces.NatsJobBroadcastHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class BroadcastHandler implements NatsJobBroadcastHandler {

    @Override
    public String jobName() {
        return "owner-broadcast";
    }

    @Override
    public void process(NatsJobMessage jobMessage) {
        log.info("[BroadcastHandler] 执行广播任务: jobName={}, taskId={}, model={}",
                jobMessage.getJobName(), jobMessage.getTaskId(), jobMessage.getJobModel());
        success(jobMessage, "广播任务执行成功");
    }
}
