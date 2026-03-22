---
name: natsjob
description: This skill should be used when working on the natsjob open-source project — a lightweight distributed scheduled-job framework built on NATS + Go. Load this skill for any task involving client integration, Subject naming conventions, heartbeat registration, task result reporting, flow tracing, monitor subscription, server configuration, deployment, or code review against project standards.
---

# natsjob 开源项目规范

natsjob 是基于 NATS JetStream + Go 构建的轻量级分布式定时任务框架。核心定位：**调度、监听与消息下发**，所有业务控制权完全交由客户端，框架不做强制限制，实现"轻量、可控、面向场景"。

---

## 一、Subject 命名规范（核心约定，严格遵守）

### 基础格式

```
<natsjob-void|natsjob>.job.<action>.<namespace>.<app-name>.<job-name>[.<client-id>]
```

### 前缀含义

| 前缀 | 底层模式 | 特性 |
|------|----------|------|
| `natsjob-void` | NATS 纯内存模式 | 无持久化，无记录，性能最高（lite/plus 等级） |
| `natsjob` | NATS JetStream | 基于 Stream + KV 存储，支持持久化、ACK、回溯 |

### 完整 Subject 清单

| Subject 类型 | 格式 | 用途 |
|---|---|---|
| VoidStart | `natsjob-void.job.start.{ns}.{app}.{job}` | 纯内存单机/广播，无需回写结果 |
| Start | `natsjob.job.start.{ns}.{app}.{job}` | JetStream 单机/广播，支持结果回写 |
| VoidPreStart | `natsjob-void.job.pre-start.{ns}.{app}.{job}` | 纯内存 Map 前置节点，无需回写 |
| PreStart | `natsjob.job.pre-start.{ns}.{app}.{job}` | JetStream Map 前置节点，支持结果回写 |
| ClientStart | `natsjob.job.client-start.{ns}.{app}.{job}.{clientId}` | Ultra 模式：按 clientId 精准投递 |
| SubResultFlow | `natsjob.job.sub-result-flow` | 固定值，客户端上报子流程轨迹 |
| Monitor | `natsjob.job.monitor.{ns}.{app}` | 固定格式，监控消息下发/订阅 |

> **规范重点**：Subject 中 `namespace`、`app-name`、`job-name` 必须与 natsjob 服务端配置完全一致，大小写敏感，不可使用中文或特殊字符。

### 监控 Subject 通配符订阅

```
natsjob.job.monitor.{ns}.{app}     # 监听具体应用
natsjob.job.monitor.{ns}.*         # 监听命名空间下所有应用
natsjob.job.monitor.*.*            # 监听所有命名空间所有应用
```

---

## 二、KV 存储规范

### KV 桶（Bucket）

| 桶名 | 用途 |
|------|------|
| `natsjob-job-results` | 任务结果回写（客户端 → natsjob） |
| `natsjob-heartbeat` | 客户端心跳注册（客户端 → natsjob） |

### 心跳 KV Key 格式

```
natsjob.heartbeat.client.{namespace}.{appName}.{clientId}
```

> `clientId` 格式要求：英文、数字、横线组合（如 `client-1`、`hostname=ip=port`）；也可用 UUID。

---

## 三、任务模式与等级

### 任务分类（jobCategory）

| 分类 | 说明 |
|------|------|
| `standalone` | 单机模式：相同队列只有一个客户端处理（带 `workQueue` 订阅） |
| `broadcast` | 广播模式：无队列，所有订阅者均收到（不带 `workQueue` 订阅） |
| `map` | Map 模式：流水线任务，pre-start 触发，客户端自主流转 |

### 运行模式（jobModel）五级体系

| 等级 | 名称 | 心跳 | 写库 | 并发/超时控制 | 精准投递策略 |
|------|------|------|------|--------------|-------------|
| lite | 炼气-lite | 不需要 | 不写库 | 无 | 无 |
| plus | 筑基-plus | 不需要 | 不写库 | 无 | 无 |
| max | 金丹-max | 不需要 | 写库 | 支持 | 无 |
| pro | 元婴-pro | **必须** | 写库 | 支持 | 无 |
| ultra | 道祖-ultra | **必须** | 写库 | 支持 | 随机/轮询/最先注册/最大权重 |

> **规范重点**：pro 和 ultra 模式客户端**必须**注册心跳，natsjob 检测不到心跳时不会下发任务。

---

## 四、下发消息体（JobMessage）

natsjob 向客户端下发的消息为 JSON 格式：

```json
{
  "taskId": "2091838529360826368",
  "namespace": "app",
  "appName": "biz",
  "jobName": "owner",
  "jobCategory": "standalone",
  "jobModel": "max",
  "condition": "",
  "jobArgs": "自定义参数",
  "jobCreatedAt": "2099-09-09 14:47:24.000",
  "jobExpireTime": "2099-09-09 14:47:34.000",
  "jobEndKvKey": "natsjob.job.end.app.biz.owner.2091838529360826368",
  "jobEndResultKvBucket": "natsjob-job-results",
  "jobRunningCount": 0,
  "nextPayload": ""
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `taskId` | String | 每次下发的唯一任务 ID |
| `namespace` | String | 命名空间，与服务端一致 |
| `appName` | String | 应用名称，与服务端一致 |
| `jobName` | String | 任务名称，与服务端一致 |
| `jobCategory` | String | 任务分类：standalone/broadcast/map |
| `jobModel` | String | 运行模式：lite/plus/max/pro/ultra |
| `condition` | String | 运行条件 |
| `jobArgs` | String | 任务参数（服务端配置的自定义参数） |
| `jobCreatedAt` | String | 任务创建时间 |
| `jobExpireTime` | String | 任务过期时间 |
| `jobEndKvKey` | String | 结束 KV 键（**空值表示 lite/plus，无需回写**） |
| `jobEndResultKvBucket` | String | 结束 KV 桶名 |
| `nextPayload` | String | Map 模式节点间透传数据（JSON 字符串，客户端写入，下一节点读取） |

---

## 五、结束任务规范

> **规范重点**：仅 max、pro、ultra 模式需要结束任务；lite 和 plus 无需也无法回写。

将 `jobEndKvKey` 对应的值写入 KV 桶 `natsjob-job-results`：

```json
{
  "status": "success",
  "reason": "处理完毕",
  "monitorStatus": "monitor:email",
  "monitorPayload": "自定义监控载荷"
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `status` | 必填 | `success`：任务成功结束；`fail`：任务失败结束；`success:next`：Map 模式触发下一步 |
| `reason` | 非必填 | 结束原因描述 |
| `monitorStatus` | 非必填 | 不为空时，natsjob 自动将监控消息推送到 monitor Subject |
| `monitorPayload` | 非必填 | 随监控消息一起下发的业务数据 |

### Map 模式回复规则

- 回复 `success:next` → natsjob 继续下发下一步 Subject（`natsjob.job.start.{ns}.{app}.{job}`）
- 回复 `success` 或 `fail` → 任务彻底结束，natsjob 关闭该任务

---

## 六、心跳注册规范（pro / ultra 必须实现）

**每 5 秒**向 KV 桶 `natsjob-heartbeat` 写一次心跳：

```
Key：natsjob.heartbeat.client.{namespace}.{appName}.{clientId}
```

心跳数据（JSON）：

```json
{
  "id": "client-1",
  "namespace": "app",
  "appName": "biz",
  "ip": "127.0.0.1",
  "comment": "描述信息",
  "weight": 100
}
```

| 字段 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | 必填 | — | 客户端唯一 ID：英文/数字/横线，或 UUID |
| `namespace` | 必填 | — | 与服务端配置一致 |
| `appName` | 必填 | — | 与服务端配置一致 |
| `ip` | 非必填 | — | 客户端 IP（自定义填写） |
| `comment` | 非必填 | — | 描述 |
| `weight` | 非必填 | 100 | 权重（ultra 模式下：0 = 不接收任务） |
| `machineCpuUsage` | 非必填 | — | 机器 CPU 使用率 |
| `machineMemoryUsage` | 非必填 | — | 机器内存使用率 |
| `processCpuUsage` | 非必填 | — | 进程 CPU 使用率 |
| `processMemoryRss` | 非必填 | — | 进程内存（RSS） |

> **规范重点**：`weight=0` 时服务端不会下发任务，可用于客户端资源告警场景的自动摘流。

---

## 七、上报子流程轨迹规范

Subject：`natsjob.job.sub-result-flow`（固定值）

```json
{
  "taskId": "2091838529360826368",
  "namespace": "app",
  "appName": "biz",
  "jobName": "owner",
  "clientId": "client-A",
  "sceneId": "scene-1",
  "sceneName": "场景1",
  "status": "process1",
  "reason": "进入金丹境",
  "monitorStatus": "monitoring:email",
  "monitorPayload": "积压1w条数据",
  "startAt": "2099-09-09 14:47:24.000",
  "endAt": "2099-09-09 15:47:24.000"
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `taskId` | String | 任务唯一标识（来自下发消息） |
| `clientId` | String | 客户端 ID（自定义） |
| `sceneId` | String | 场景 ID（自定义） |
| `sceneName` | String | 场景名称（自定义） |
| `status` | String | 自定义状态 |
| `reason` | String | 自定义原因 |
| `monitorStatus` | String | 监控状态（自定义，不为空时触发监控） |
| `monitorPayload` | String | 监控随路数据 |
| `startAt` | String | 开始时间，格式：`yyyy-MM-dd HH:mm:ss.SSS` |
| `endAt` | String | 结束时间，格式：`yyyy-MM-dd HH:mm:ss.SSS` |

---

## 八、监控消息规范

当客户端回写结果或子流程中 `monitorStatus` 不为空时，natsjob 自动推送监控消息到：

```
natsjob.job.monitor.{namespace}.{appName}
```

**客户端接收监控消息字段**：

| 字段 | 类型 | 说明 |
|------|------|------|
| `taskId` | String | 任务唯一标识 |
| `subTaskId` | String | 子任务标识 |
| `namespace` | String | 命名空间 |
| `appName` | String | 应用名称 |
| `jobName` | String | 任务名称 |
| `status` | String | 状态 |
| `reason` | String | 原因 |
| `monitorStatus` | String | 监控状态（客户端自定义，用于业务分支判断） |
| `monitorPayload` | String | 监控随路数据 |

---

## 九、服务端配置参数

| 环境变量 | 默认值 | 说明 |
|---------|--------|------|
| `NATSJOB_NATS_URL` | `nats://127.0.0.1:4222` | NATS 连接地址，带认证格式：`nats://user:pass@ip:port` |
| `NATSJOB_HTTP_PORT` | `7788` | Web 管理界面端口 |
| `NATSJOB_LOG_ENV` | `console` | 日志模式：`console` / `json` |
| `NATSJOB_SECRET_KEY` | （内置）| 系统密钥，生产环境务必修改 |
| `NATSJOB_LOGIN_USER` | `natsjob` | Web 管理界面用户名 |
| `NATSJOB_LOGIN_PWD` | `natsjob` | Web 管理界面密码，生产环境务必修改 |
| `NATSJOB_LOGIN_TOKEN_EXPIRE_HOURS` | `2` | Token 过期时间（小时） |
| `NATSJOB_JOB_RESULT_EXPIRE_HOURS` | `24` | 任务结果保留时长（小时） |
| `NATSJOB_DB_TYPE` | `sqlite` | 数据库类型：`sqlite` / `mysql` / `postgres` / `dm` |
| `NATSJOB_DB_URL` | （空） | 数据库连接串，sqlite 可留空 |
| `NATSJOB_DB_CHAN_COUNT` | `100` | 任务结果并发写库通道数 |

> **启动优先级**：环境变量（Docker/K8s）> 命令行参数 > 配置文件（conf/config.yaml）

---

## 十、定时任务表达式规范

natsjob 底层使用 `github.com/robfig/cron/v3`，支持 **秒级（6字段）** cron 表达式：

```
秒 分 时 日 月 周
```

### 常用简写

| 表达式 | 含义 |
|--------|------|
| `@every 1s` | 每 1 秒 |
| `@every 5s` | 每 5 秒 |
| `@every 1m` | 每 1 分钟 |
| `@every 1h` | 每 1 小时 |
| `@every 1d` | 每 1 天 |

> **注意**：`@every` 从任务启动时间开始计算，不对齐系统时钟。需对齐时钟（如每天 00:00 执行）请使用标准 cron 表达式 `0 0 0 * * *`。

### 秒级 cron 示例（6字段）

| 表达式 | 含义 |
|--------|------|
| `0 * * * * *` | 每分钟第 0 秒 |
| `*/5 * * * * *` | 每 5 秒 |
| `0,30 * * * * *` | 每分钟 0 秒和 30 秒各执行一次 |

---

## 十一、客户端开发规范（多语言通用）

### 单机模式（standalone）

```
subscribe(subject, workQueue, handler)  // 必须带 workQueue，保证竞争消费
```

- `lite`：订阅 `natsjob-void.job.start.{ns}.{app}.{job}`，无需回写
- `plus`：订阅 `natsjob.job.start.{ns}.{app}.{job}`，无需回写
- `max`：订阅 `natsjob.job.start.{ns}.{app}.{job}`，**必须回写 KV 结果**
- `pro`：同 max，**必须每 5 秒注册心跳**
- `ultra`：订阅 `natsjob.job.client-start.{ns}.{app}.{job}.{clientId}`，**必须心跳**

### 广播模式（broadcast）

```
subscribe(subject, handler)  // 不带 workQueue，所有消费者均收到
```

- Subject 格式与单机完全相同，仅去除 `workQueue` 参数

### Map 模式（map）

- 前置节点订阅 `pre-start` Subject
- 节点处理完成后，将 `jobMessage` (可更新 `nextPayload`) **publish** 到下一个节点的 Subject
- 最终节点（或任意节点）回写 KV 结束任务
- `success:next` 表示服务端继续下发下一步；`success`/`fail` 表示彻底结束

### 生产环境必做项

1. **NATS 连接必须开启自动重连**（`maxReconnects=-1`，`reconnectWait=2s`）
2. **pro/ultra 模式必须注册心跳**，每 5 秒写入一次 KV
3. **max/pro/ultra 模式必须回写任务结果**，否则任务会等待超时才结束
4. **`weight=0` 可用于资源告警场景的自动摘流**

---

## 十二、Nginx 反向代理配置规范

```nginx
upstream natsjobweb {
    server 127.0.0.1:7788;
}

# API 代理
location /natsjob/api {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $http_host;
    proxy_pass http://natsjobweb$request_uri;
}

# Web 页面代理
location /natsjob/ {
    proxy_pass http://natsjobweb/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

---

## 十三、常见错误规范

| 错误行为 | 正确做法 |
|---------|---------|
| pro/ultra 模式不注册心跳 | 每 5 秒向 `natsjob-heartbeat` KV 写心跳 |
| lite/plus 模式尝试回写结果 | lite/plus 无 jobEndKvKey，无需也不应回写 |
| `jobEndKvKey` 为空时调用结束 | 先判断 `jobEndKvKey` 不为空再回写 |
| Map 模式最终节点忘记回写 `success` | 末尾节点必须回写结果以关闭任务 |
| clientId 包含中文或特殊字符 | 只使用英文、数字、横线组合 |
| Subject 中字段与服务端配置大小写不一致 | Subject 字段严格区分大小写 |
| `@every 1h` 期望对齐整点执行 | 用 `0 0 */1 * * *` 代替 |
| 单机模式忘记传 workQueue | 单机必须带 workQueue，广播不带 |

---

## 十四、参考资源

- 项目 README：`/README.md`
- 核心使用手册：`/docs/user_manual.md`（Subject 规范、消息体格式、结束任务、心跳、监控、流水）
- Web 界面手册：`/docs/web_manual.md`（命名空间管理、服务任务管理、定时任务配置）
- Java 示例代码：`/docs/examples/natsjob-java/`（含 standalone/broadcast/map/monitor 全场景示例）
- NATS 官方文档：https://nats.io/
- cron 库文档：https://pkg.go.dev/github.com/robfig/cron/v3
