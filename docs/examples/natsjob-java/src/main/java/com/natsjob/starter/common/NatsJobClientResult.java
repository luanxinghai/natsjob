package com.natsjob.starter.common;

import cn.hutool.json.JSONUtil;
import com.natsjob.starter.domain.NatsJobResult;
import io.nats.client.KeyValue;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class NatsJobClientResult {
    //结果状态:成功,代表本次任务结束
    private static final String SUCCESS = "success";
    //结果状态:成功,继续执行下一步
    private static final String SUCCESS_NEXT = "success:next";
    //结果状态:失败,代表本次任务结束
    private static final String FAIL = "fail";


    private static String getSuccess(String reason, String monitorStatus, String monitorPayload) {
        NatsJobResult jobResult = new NatsJobResult();
        jobResult.setStatus(SUCCESS)
                .setReason(reason)
                .setMonitorStatus(monitorStatus)
                .setMonitorPayload(monitorPayload)
                .setClientId(NatsJobClientHeartbeat.getDefaultClientId());
        return JSONUtil.toJsonStr(jobResult);
    }

    private static String getSuccessNext(String reason) {
        NatsJobResult jobResult = new NatsJobResult();
        jobResult.setStatus(SUCCESS_NEXT)
                .setReason(reason);
        return JSONUtil.toJsonStr(jobResult);
    }

    private static String getFail(String reason, String monitorStatus, String monitorPayload) {
        NatsJobResult jobResult = new NatsJobResult();
        jobResult.setStatus(FAIL)
                .setReason(reason)
                .setMonitorStatus(monitorStatus)
                .setMonitorPayload(monitorPayload)
                .setClientId(NatsJobClientHeartbeat.getDefaultClientId());
        return JSONUtil.toJsonStr(jobResult);
    }

    public static boolean success(KeyValue keyValue, String jobEndKvKey) {
        return success(keyValue, jobEndKvKey, null);
    }

    public static boolean success(KeyValue keyValue, String jobEndKvKey, String reason) {
        return success(keyValue, jobEndKvKey, reason, null, null);
    }

    public static boolean success(KeyValue keyValue, String jobEndKvKey, String reason, String monitorStatus, String monitorPayload) {
        try {
            String result = getSuccess(reason, monitorStatus, monitorPayload);
            log.info("[NATSJOB] put kv success:{}, result:{}", jobEndKvKey, result);
            long success = keyValue.put(jobEndKvKey, result);
            return success > 0;
        } catch (Exception e) {
            log.error("[NATSJOB] put kv error:{}", e.getMessage());
        }
        return false;
    }


    public static boolean fail(KeyValue keyValue, String jobEndKvKey) {
        return fail(keyValue, jobEndKvKey, null);
    }

    public static boolean fail(KeyValue keyValue, String jobEndKvKey, String reason) {
        return fail(keyValue, jobEndKvKey, reason, null, null);
    }

    public static boolean fail(KeyValue keyValue, String jobEndKvKey, String reason, String monitorStatus, String monitorPayload) {
        try {
            String result = getFail(reason, monitorStatus, monitorPayload);
            log.info("[NATSJOB] put kv fail:{}, result:{}", jobEndKvKey, result);
            long success = keyValue.put(jobEndKvKey, result);
            return success > 0;
        } catch (Exception e) {
            log.error("[NATSJOB] put kv error:{}", e.getMessage());
        }
        return false;
    }


    public static boolean successNext(KeyValue keyValue, String jobEndKvKey) {
        return successNext(keyValue, jobEndKvKey, null);
    }

    public static boolean successNext(KeyValue keyValue, String jobEndKvKey, String reason) {
        try {
            String result = getSuccessNext(reason);
            log.info("[NATSJOB] put kv success:next:{}, result:{}", jobEndKvKey, result);
            long success = keyValue.put(jobEndKvKey, getSuccessNext(reason));
            return success > 0;
        } catch (Exception e) {
            log.error("[NATSJOB] put kv error:{}", e.getMessage());
        }
        return false;
    }

}