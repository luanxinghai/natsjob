package com.natsjob.demo.processors;


import com.natsjob.starter.domain.NatsJobMessage;
import com.natsjob.starter.interfaces.NatsJobStandaloneHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class SingleHandler implements NatsJobStandaloneHandler {

    @Override
    public String jobName() {
        return "owner";
    }

    @Override
    public void process(NatsJobMessage jobMessage) {
        for (int i = 0; i < 10; i++) {
            publishSubFlow(jobMessage, "readDB", "读取数据库数据", "success", "10w条");
            publishSubFlow(jobMessage, "writeDB", "写入数据库数据", "fail", "写入失败10条");
        }

        success(jobMessage, "单机ok");
        //fail(jobMessage, "单机失败");
    }
}
