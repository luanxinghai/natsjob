package com.natsjob.demo.client;

public class NatsjobSubject {
    //结果存储桶
    public static final String KV_BUCKET_JOB_RESULT = "natsjob-job-results";
    //心跳存储桶
    public static final String KV_BUCKET_CLIENT_HEARTBEAT = "natsjob-heartbeat";
    //自定义流程轨迹subject
    public static final String SUBJ_SUB_RESULT_FLOW = "natsjob.job.sub-result-flow";
    // JET STREAM 上下文
    public static final String JET_STREAM_CONTEXT = "natsjob";

    public static String getClientHeartbeatKVKey(String namespace, String appName, String clientId) {
        validateParamsByHeartbeat(namespace, appName, clientId);
        return String.format("natsjob.heartbeat.client.%s.%s.%s", namespace, appName, clientId);
    }

    public static String getVoidStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob-void.job.start.%s.%s.%s", namespace, appName, jobName);
    }

    public static String getStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob.job.start.%s.%s.%s", namespace, appName, jobName);
    }

    public static String getVoidPreStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob-void.job.pre-start.%s.%s.%s", namespace, appName, jobName);
    }

    public static String getPreStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob.job.pre-start.%s.%s.%s", namespace, appName, jobName);
    }

    public static String getClientStartSubject(String namespace, String appName, String jobName, String clientId) {
        validateParamsByClient(namespace, appName, jobName, clientId);
        return String.format("natsjob.job.client-start.%s.%s.%s.%s", namespace, appName, jobName, clientId);
    }

    public static String getGroupStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob.job.group-start.%s.%s.%s", namespace, appName, jobName);
    }

    public static String getAgentStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob.job.agent-start.%s.%s.%s", namespace, appName, jobName);
    }

    private static void validateParams(String namespace, String appName, String jobName) {
        if (namespace == null || namespace.isEmpty()) {
            throw new IllegalArgumentException("namespace must not be null or empty");
        }
        if (appName == null || appName.isEmpty()) {
            throw new IllegalArgumentException("appName must not be null or empty");
        }
        if (jobName == null || jobName.isEmpty()) {
            throw new IllegalArgumentException("jobName must not be null or empty");
        }
    }

    private static void validateParamsByHeartbeat(String namespace, String appName, String clientId) {
        if (namespace == null || namespace.isEmpty()) {
            throw new IllegalArgumentException("namespace must not be null or empty");
        }
        if (appName == null || appName.isEmpty()) {
            throw new IllegalArgumentException("appName must not be null or empty");
        }
        if (clientId == null || clientId.isEmpty()) {
            throw new IllegalArgumentException("clientId must not be null or empty");
        }
    }

    private static void validateParamsByClient(String namespace, String appName, String jobName, String clientId) {
        validateParams(namespace, appName, jobName);
        if (clientId == null || clientId.isEmpty()) {
            throw new IllegalArgumentException("clientId must not be null or empty");
        }
    }
}
