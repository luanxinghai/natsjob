package com.natsjob.starter.common;

public class NatsJobClientSubject {
    //结果存储桶
    public static final String KV_BUCKET_JOB_RESULT = "natsjob-job-results";
    //心跳存储桶
    public static final String KV_BUCKET_CLIENT_HEARTBEAT = "natsjob-heartbeat";
    //自定义流程轨迹subject
    public static final String SUBJ_SUB_RESULT_FLOW = "natsjob.job.sub-result-flow";

    public static final String JET_STREAM_CONTEXT = "natsjob";
    //默认的服务名
    private static String defaultNamespace = "app";
    private static String defaultAppName = "app-service";

    /**
     *
     * 设置默认的命名空间和应用名
     * 如果需要只能初始化一次 增加atomicBool锁即可
     *
     * @param namespace 默认的命名空间
     * @param appName   应用名
     */
    public static void setDefaultNamespace(String namespace, String appName) {
        if (namespace == null || namespace.isEmpty()) {
            throw new IllegalArgumentException("namespace must not be null or empty");
        }

        if (appName == null || appName.isEmpty()) {
            throw new IllegalArgumentException("appName must not be null or empty");
        }

        defaultNamespace = namespace;
        defaultAppName = appName;
    }


    public static String getClientHeartbeatKVKey(String namespace, String appName, String clientId) {
        validateParamsByHeartbeat(namespace, appName, clientId);
        return String.format("natsjob.heartbeat.client.%s.%s.%s", namespace, appName, clientId);
    }

    public static String getClientHeartbeatKVKey(String clientId) {
        return getClientHeartbeatKVKey(defaultNamespace, defaultAppName, clientId);
    }


    public static String getVoidStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob-void.job.start.%s.%s.%s", namespace, appName, jobName);
    }

    public static String getVoidStartSubject(String jobName) {
        return getVoidStartSubject(defaultNamespace, defaultAppName, jobName);
    }

    public static String getStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob.job.start.%s.%s.%s", namespace, appName, jobName);
    }

    public static String getStartSubject(String jobName) {
        return getStartSubject(defaultNamespace, defaultAppName, jobName);
    }

    public static String getVoidPreStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob-void.job.pre-start.%s.%s.%s", namespace, appName, jobName);
    }

    public static String getVoidPreStartSubject(String jobName) {
        return getVoidPreStartSubject(defaultNamespace, defaultAppName, jobName);
    }

    public static String getPreStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob.job.pre-start.%s.%s.%s", namespace, appName, jobName);
    }

    public static String getPreStartSubject(String jobName) {
        return getPreStartSubject(defaultNamespace, defaultAppName, jobName);
    }

    public static String getClientStartSubject(String namespace, String appName, String jobName, String clientId) {
        validateParamsByClient(namespace, appName, jobName, clientId);
        return String.format("natsjob.job.client-start.%s.%s.%s.%s", namespace, appName, jobName, clientId);
    }

    public static String getClientStartSubject(String jobName, String clientId) {
        return getClientStartSubject(defaultNamespace, defaultAppName, jobName, clientId);
    }

    public static String getGroupStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob.job.group-start.%s.%s.%s", namespace, appName, jobName);
    }

    public static String getGroupStartSubject(String jobName) {
        return getGroupStartSubject(defaultNamespace, defaultAppName, jobName);
    }

    public static String getAgentStartSubject(String namespace, String appName, String jobName) {
        validateParams(namespace, appName, jobName);
        return String.format("natsjob.job.agent-start.%s.%s.%s", namespace, appName, jobName);
    }

    public static String getAgentStartSubject(String jobName) {
        return getAgentStartSubject(defaultNamespace, defaultAppName, jobName);
    }

    /**
     * 监控所有namespace、appName下所有任务
     */
    public static String getMonitorSubject(String namespace, String appName) {
        validateParams(namespace, appName);
        return String.format("natsjob.job.monitor.%s.%s", namespace, appName);
    }

    /**
     * 监控所有namespace下所有
     */
    public static String getMonitorSubject(String namespace) {
        validateParams(namespace, "*");
        return String.format("natsjob.job.monitor.%s.%s", namespace, "*");
    }

    /**
     * 监控所有namespace、appName、jobName
     */
    public static String getMonitorSubject() {
        return String.format("natsjob.job.monitor.%s.%s", "*", "*");
    }

    private static void validateParams(String namespace, String appName) {
        if (namespace == null || namespace.isEmpty()) {
            throw new IllegalArgumentException("namespace must not be null or empty");
        }
        if (appName == null || appName.isEmpty()) {
            throw new IllegalArgumentException("appName must not be null or empty");
        }
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
