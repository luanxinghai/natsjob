package com.natsjob.demo.client;

import cn.hutool.json.JSONUtil;
import com.natsjob.demo.domain.JobResult;
import io.nats.client.KeyValue;

public class NatsjobJobResult {
    //结果状态:成功,代表本次任务结束
    private static final String SUCCESS = "success";
    //结果状态:成功,继续执行下一步
    private static final String SUCCESS_NEXT = "success:next";
    //结果状态:失败,代表本次任务结束
    private static final String FAIL = "fail";


    private static String getSuccess(String reason) {
        JobResult jobResult = new JobResult();
        jobResult.setStatus(SUCCESS)
                .setReason(reason);
        return JSONUtil.toJsonStr(jobResult);
    }

    private static String getSuccessNext(String reason) {
        JobResult jobResult = new JobResult();
        jobResult.setStatus(SUCCESS_NEXT)
                .setReason(reason);
        return JSONUtil.toJsonStr(jobResult);
    }

    private static String getFail(String reason) {
        JobResult jobResult = new JobResult();
        jobResult.setStatus(FAIL)
                .setReason(reason);
        return JSONUtil.toJsonStr(jobResult);
    }

    public static boolean success(KeyValue keyValue, String jobEndKvkey) {
        return success(keyValue, jobEndKvkey, null);
    }

    public static boolean success(KeyValue keyValue, String jobEndKvkey, String reason) {
        try {
            long success = keyValue.put(jobEndKvkey, getSuccess(reason));
            return success > 0;
        } catch (Exception e) {
            System.out.println("put kv error:" + e.getMessage());
        }
        return false;
    }

    public static boolean successNext(KeyValue keyValue, String jobEndKvKey) {
        return successNext(keyValue, jobEndKvKey, null);
    }

    public static boolean successNext(KeyValue keyValue, String jobEndKvKey, String reason) {
        try {
            long success = keyValue.put(jobEndKvKey, getSuccessNext(reason));
            return success > 0;
        } catch (Exception e) {
            System.out.println("put kv error:" + e.getMessage());
        }
        return false;
    }


    public static boolean fail(KeyValue keyValue, String jobEndKvKey) {
        return fail(keyValue, jobEndKvKey, null);
    }

    public static boolean fail(KeyValue keyValue, String jobEndKvKey, String reason) {
        try {
            long success = keyValue.put(jobEndKvKey, getFail(reason));
            return success > 0;
        } catch (Exception e) {
            System.out.println("put kv error:" + e.getMessage());
        }
        return false;
    }
}