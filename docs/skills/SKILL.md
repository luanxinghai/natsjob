---
name: natsjob
description: This skill should be used when working on the natsjob open-source project — a lightweight distributed scheduled-job framework built on NATS + Go. Load this skill for any task involving client integration, Subject naming conventions, heartbeat registration, task result reporting, flow tracing, monitor subscription, server configuration, deployment, code generation, or code review against project standards.
---

# natsjob 开源项目规范

natsjob 是基于 NATS JetStream + Go 构建的轻量级分布式定时任务框架。核心定位：**调度、监听与消息下发**，所有业务控制权完全交由客户端，框架不做强制限制，实现"轻量、可控、面向场景"。

> **设计哲学**：natsjob 只负责调度、监听与消息下发。即使在管理页面配置的是单机任务，只要客户端按广播、Map 模式去处理消息，一样可以正常运行——框架不做强制限制，真正做到轻量、可控、面向场景。

---

## 一、Subject 命名规范（核心约定，严格遵守）

### 基础格式

```
<natsjob-void|natsjob>.job.<action>.<namespace>.<app-name>.<job-name>[.<client-id>]
```

### 前缀含义

| 前缀 | 底层模式 | 特性 |
|------|----------|------|
| `natsjob-void` | NATS 纯内存模式 | 无持久化，无记录，性能最高（plus 等级） |
| `natsjob` | NATS JetStream | 基于 Stream + KV 存储，支持持久化、ACK、回溯，默认保留 24 小时 |

### 完整 Subject 清单

| Subject 类型 | 格式 | 用途 |
|---|---|---|
| VoidStart | `natsjob-void.job.start.{ns}.{app}.{job}` | 纯内存单机/广播，无需回写结果 |
| Start | `natsjob.job.start.{ns}.{app}.{job}` | JetStream 单机/广播，支持结果回写 |
| VoidPreStart | `natsjob-void.job.pre-start.{ns}.{app}.{job}` | 纯内存 Map 前置节点，无需回写 |
| PreStart | `natsjob.job.pre-start.{ns}.{app}.{job}` | JetStream Map 前置节点，支持结果回写 |
| ClientStart | `natsjob.job.client-start.{ns}.{app}.{job}.{clientId}` | Ultra 模式：按 clientId 精准投递 |
| GroupStart | `natsjob.job.group-start.{ns}.{app}.{job}` | 分组启动（**功能尚未实现**） |
| AgentStart | `natsjob.job.agent-start.{ns}.{app}.{job}` | 智能体启动（**功能尚未实现**） |
| SubResultFlow | `natsjob.job.sub-result-flow` | 固定值，客户端上报子流程轨迹 |
| Monitor | `natsjob.job.monitor.{ns}.{app}` | 固定格式，监控消息下发/订阅 |

> **规范重点**：Subject 中 `namespace`、`app-name`、`job-name` 必须与 natsjob 服务端配置完全一致，大小写敏感，不可使用中文或特殊字符。

> **注意**：`GroupStart` 和 `AgentStart` 为规划中的功能，当前版本尚未实现，请勿在生产环境使用。

### 监控 Subject 通配符订阅

```
natsjob.job.monitor.{ns}.{app}     # 监听具体应用的监控消息
natsjob.job.monitor.{ns}.*         # 监听命名空间下所有应用
natsjob.job.monitor.*.*            # 监听所有命名空间所有应用
```

> `SubResultFlow` 与 `Monitor` 都是固定命名 Subject，客户端自定义上报流水和监听监控信息。

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

> `clientId` 格式要求：英文、数字、横线组合（如 `client-1`、`hostname-ip-port`）；也可用 UUID。

---

## 三、任务模式与等级

### 任务分类（jobCategory）

| 分类 | 说明 |
|------|------|
| `standalone` | 单机模式：相同队列只有一个客户端处理（带 `workQueue` 订阅） |
| `broadcast` | 广播模式：无队列，所有订阅者均收到（不带 `workQueue` 订阅） |
| `map` | Map 模式：流水线任务，pre-start 触发，客户端自主流转 |

### 运行模式（jobModel）四级体系

| 等级 | 名称 | 心跳 | 写库 | 并发/超时控制 | 精准投递策略 |
|------|------|------|------|--------------|-------------|
| plus | 轻量-plus | 不需要 | 不写库 | 无 | 无 |
| max | 基础-max | 不需要 | 写库 | 支持 | 无 |
| pro | 专业-pro | **必须** | 写库 | 支持 | 无 |
| ultra | 客户端-ultra | **必须** | 写库 | 支持 | 随机/轮询/最先注册/最大权重 |

> **规范重点**：pro 和 ultra 模式客户端**必须**注册心跳，natsjob 检测不到心跳时不会下发任务。

> **注意**：plus 模式（含 natsjob-void 前缀）无 `jobEndKvKey`，natsjob 仅负责下发消息，不做任何存储处理。

### 各模式功能对比（按场景选型）

| 场景需求 | 推荐等级 |
|---------|---------|
| 极致性能，无需追踪 | plus |
| 需要执行记录，无需心跳保障 | max |
| 需要心跳保障，确保客户端存活才下发 | pro |
| 需要按客户端精准投递，支持负载策略 | ultra |

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
| `jobCategory` | String | 任务分类：standalone / broadcast / map |
| `jobModel` | String | 运行模式：plus / max / pro / ultra |
| `condition` | String | 运行条件（与服务端配置一致） |
| `jobArgs` | String | 任务参数（服务端配置的自定义参数） |
| `jobCreatedAt` | String | 任务创建时间 |
| `jobExpireTime` | String | 任务过期时间 |
| `jobEndKvKey` | String | 结束 KV 键（**空值表示 plus，无需回写**） |
| `jobEndResultKvBucket` | String | 结束 KV 桶名 |
| `jobRunningCount` | Integer | 当前运行中任务数量 |
| `nextPayload` | String | Map 模式节点间透传数据（JSON 字符串，客户端写入，下一节点读取；服务端下发时默认为空） |

> **nextPayload 特殊说明**：客户端需要流转下一步时，可将相关信息以 JSON 格式存入此字段，下一步节点可拿到完整数据和业务上下文。

---

## 五、结束任务规范

> **规范重点**：仅 max、pro、ultra 模式需要结束任务；plus 无需也无法回写。

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
| `weight` | 非必填 | 100 | 权重（**仅 ultra 模式生效**：0 = 不接收任务） |
| `machineCpuUsage` | 非必填 | — | 机器 CPU 使用率 |
| `machineMemoryUsage` | 非必填 | — | 机器内存使用率 |
| `processCpuUsage` | 非必填 | — | 进程 CPU 使用率 |
| `processMemoryRss` | 非必填 | — | 进程内存（RSS） |

> **规范重点**：`weight=0` 时服务端不会下发任务，可用于客户端资源告警场景的**自动摘流**（如根据服务器 CPU/内存阈值动态调整）。权重仅对 ultra 场景生效。

---

## 七、上报子流程轨迹规范

Subject：`natsjob.job.sub-result-flow`（固定值，客户端发起）

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
  "reason": "进入基础境",
  "monitorStatus": "monitoring:email",
  "monitorPayload": "积压1w条数据",
  "startAt": "2099-09-09 14:47:24.000",
  "endAt": "2099-09-09 15:47:24.000"
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `taskId` | String | 任务唯一标识（来自下发消息） |
| `namespace` | String | 命名空间，与服务端配置一致 |
| `appName` | String | 应用名称，与服务端配置一致 |
| `jobName` | String | 任务名称，与服务端配置一致 |
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

### 工作流程

1. 客户端上报任务结果时，若 `monitorStatus` 不为空，触发监控下发
2. natsjob 自动推送监控消息到 `natsjob.job.monitor.{ns}.{app}`
3. 客户端订阅该主题，根据消息内容触发后续业务逻辑（告警、通知、补偿等）

### 监控状态示例（完全自定义，以下仅供参考）

| 监控状态 | 监控随路数据 | 下一步行为 |
|----------|-------------|------------|
| `monitor:email:qiwei:sms` | 数据积压1个亿了 | 发邮件 + 企微提醒 + 短信通知 |
| `monitor:dingding` | 数据积压2个亿了 | 发钉钉通知 |
| `monitor:feishu` | 数据积压3个亿了 | 发飞书通知 |

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

## 九、Map / MapReduce 自定义设计思路

Map 模式适配 Map/MapReduce 等流程化任务场景，核心逻辑：**预启动任务 → 客户端回复 → 触发下一步/结束任务**。natsjob 仅等待最终结果，流程控制由客户端完全自主实现。

1. **分片存储层自定义**：客户端可将任务分片数据存储至 Redis、关系型数据库、ES、ClickHouse 等任意存储介质。

2. **分片处理层自定义**：客户端根据业务场景定义不同 Subject，通过 Subject 定向分发分片任务；不同客户端监听专属 Subject 完成分片处理，并将结果上报至存储介质。

3. **流程流转层自定义**：客户端可自主触发后续的任务流转、数据聚合、统计分析等环节，无需依赖 natsjob 介入。

4. **natsjob 核心定位**：仅负责接收最终任务结果与全流程场景流水，不干预中间任何分片、处理、流转环节。

> NATS 原生支持跨主题流转任务，可灵活实现静态分片、Map、MapReduce、流转等复杂逻辑。

---

## 十、服务端配置参数

| 环境变量 | 默认值 | 说明 |
|---------|--------|------|
| `NATSJOB_NATS_URL` | `nats://127.0.0.1:4222` | NATS 连接地址，带认证格式：`nats://user:pass@ip:port` |
| `NATSJOB_HTTP_PORT` | `7788` | Web 管理界面端口 |
| `NATSJOB_LOG_ENV` | `console` | 日志模式：`console` / `json` |
| `NATSJOB_SECRET_KEY` | （内置） | 系统密钥，**生产环境务必修改** |
| `NATSJOB_LOGIN_USER` | `natsjob` | Web 管理界面用户名 |
| `NATSJOB_LOGIN_PWD` | `natsjob` | Web 管理界面密码，**生产环境务必修改** |
| `NATSJOB_LOGIN_TOKEN_EXPIRE_HOURS` | `2` | Token 过期时间（小时） |
| `NATSJOB_JOB_RESULT_EXPIRE_HOURS` | `24` | 任务结果保留时长（小时） |
| `NATSJOB_DB_TYPE` | `sqlite` | 数据库类型：`sqlite` / `mysql` / `postgres` / `dm`（达梦） |
| `NATSJOB_DB_URL` | （空） | 数据库连接串，sqlite 可留空 |
| `NATSJOB_DB_CHAN_COUNT` | `100` | 任务结果并发写库通道数 |

> **启动优先级**：环境变量（Docker/K8s）> 命令行参数 > 配置文件（conf/config.yaml）

### 数据库连接串示例

```
# MySQL
root:natsjob123@tcp(127.0.0.1:3306)/natsjob?charset=utf8mb4&parseTime=True&loc=Local

# PostgreSQL（含人大金仓 PostgreSQL 兼容模式）
host=127.0.0.1 user=postgres password=natsjob123 port=5432 dbname=natsjob sslmode=disable TimeZone=Asia/Shanghai

# 达梦
dm://SYSDBA:natsjob123@127.0.0.1:5236?schema=natsjob
```

> **注意**：需手动建库（库名 `natsjob`），服务连接后会自动建表。

---

## 十一、定时任务表达式规范

natsjob 底层使用 `github.com/robfig/cron/v3`，支持 **秒级（6字段）** cron 表达式：

```
秒 分 时 日 月 周
```

### @every 简写完整对照表

| 表达式 | 含义 | 等价 6字段 cron | 适用场景 |
|--------|------|----------------|---------|
| `@every 1s` | 每 1 秒 | `*/1 * * * * *` | 高频心跳、实时监控 |
| `@every 5s` | 每 5 秒 | `*/5 * * * * *` | 秒级数据采集 |
| `@every 10s` | 每 10 秒 | `*/10 * * * * *` | 短间隔检测任务 |
| `@every 1m` | 每 1 分钟 | `0 */1 * * * *` | 常规业务定时任务 |
| `@every 2m30s` | 每 2 分 30 秒 | `30 */2 * * * *` | 非整数分钟间隔任务 |
| `@every 1h` | 每 1 小时 | `0 0 */1 * * *` | 小时级统计任务 |
| `@every 1h15m` | 每 1 小时 15 分 | `0 15 */1 * * *` | 非整数小时间隔任务 |
| `@every 1d` | 每 1 天 | `0 0 0 * * *` | 每日备份、结算 |
| `@every 24h` | 每 24 小时 | `0 0 0 * * *` | 等价 `@every 1d` |
| `@every 7d` | 每 7 天 | `0 0 0 * * 0` | 周度数据汇总 |

> **注意**：`@every` 从任务启动时间开始计算，**不对齐系统时钟**。需对齐时钟（如每天 00:00 执行）请使用标准 cron 表达式 `0 0 0 * * *`。

### 秒级 cron 示例（6字段）

| 表达式 | 含义 | 适用场景 |
|--------|------|---------|
| `0 * * * * *` | 每分钟第 0 秒 | 对齐分钟的常规任务 |
| `15 * * * * *` | 每分钟第 15 秒 | 分钟内精准秒级触发 |
| `*/5 * * * * *` | 每 5 秒 | 秒级数据采集 |
| `0,30 * * * * *` | 每分钟 0 秒和 30 秒各执行一次 | 分钟内两次触发 |
| `10-20 * * * * *` | 每分钟 10-20 秒，每秒执行一次 | 分钟内连续秒级任务 |

---

## 十二、客户端开发规范（多语言通用）

### 消费模式说明

natsjob 客户端推荐使用**临时消费模式**（Core NATS subscribe），该模式轻量高效，覆盖 90%+ 常规业务场景。

若需 NATS JetStream 高阶特性（ACK 确认、At-Least-Once 消费、消息重发），仅在对消息可靠性有强要求的场景（金融交易、数据同步）下使用。

### 单机模式（standalone）

```
subscribe(subject, workQueue, handler)  // 必须带 workQueue，保证竞争消费
```

- `plus`：订阅 `natsjob-void.job.start.{ns}.{app}.{job}` 或 `natsjob.job.start.{ns}.{app}.{job}`，无需回写
- `max`：订阅 `natsjob.job.start.{ns}.{app}.{job}`，**必须回写 KV 结果**
- `pro`：同 max，**必须每 5 秒注册心跳**
- `ultra`：订阅 `natsjob.job.client-start.{ns}.{app}.{job}.{clientId}`，**必须心跳**

### 广播模式（broadcast）

```
subscribe(subject, handler)  // 不带 workQueue，所有消费者均收到
```

- Subject 格式与单机完全相同，仅去除 `workQueue` 参数

### Map 模式（map）

Map 模式仅支持 **plus / max / pro** 三个等级，**不支持 ultra**。

| 等级 | 前置节点 Subject | 心跳 | 写库 | 并发/超时控制 |
|------|-----------------|------|------|--------------|
| plus | `natsjob.job.pre-start.{ns}.{app}.{job}` 或 `natsjob-void.job.pre-start.{ns}.{app}.{job}` | 否 | 否 | 否 |
| max | 同上 | 否 | 是 | 是 |
| pro | 同上 | **必须** | 是 | 是 |

- 前置节点订阅 `pre-start` Subject
- 节点处理完成后，将 `jobMessage`（可更新 `nextPayload`）**publish** 到下一个节点的 Subject
- 最终节点（或任意节点）回写 KV 结束任务
- `success:next` 表示服务端继续下发下一步（Subject：`natsjob.job.start.{ns}.{app}.{job}`）；`success`/`fail` 表示彻底结束任务

### 多语言支持

natsjob 依托 NATS 对 40+ 种编程语言的全面支持实现多语言兼容（详见 [NATS 官网](https://nats.io/download/)）。非 Java 语言（Python、Go、.NET、Node.js 等）可参考 Java 示例代码转换。

### 生产环境必做项

1. **NATS 连接必须开启自动重连**（`maxReconnects=-1`，`reconnectWait=2s`）
2. **pro/ultra 模式必须注册心跳**，每 5 秒写入一次 KV
3. **max/pro/ultra 模式必须回写任务结果**，否则任务会等待超时才结束
4. **判断 `jobEndKvKey` 不为空**再调用结束逻辑，防止 plus 模式误操作
5. **`weight=0` 可用于资源告警场景的自动摘流**

---

## 十三、Nginx 反向代理配置规范

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

## 十四、日志规范

natsjob 日志默认配置：
- 日志文件达到 **500MB** 时自动分割
- 历史日志保留遵循 **"最近 7 天"** 和 **"最多 10 个文件"** 双重限制（满足任一条件即清理）
- 所有过期日志文件均自动压缩归档

---

## 十五、常见错误规范

| 错误行为 | 正确做法 |
|---------|---------|
| pro/ultra 模式不注册心跳 | 每 5 秒向 `natsjob-heartbeat` KV 写心跳 |
| plus 模式尝试回写结果 | plus 无 `jobEndKvKey`，无需也不应回写 |
| `jobEndKvKey` 为空时调用结束 | 先判断 `jobEndKvKey` 不为空再回写 |
| Map 模式最终节点忘记回写 `success` | 末尾节点必须回写结果以关闭任务 |
| clientId 包含中文或特殊字符 | 只使用英文、数字、横线组合 |
| Subject 中字段与服务端配置大小写不一致 | Subject 字段严格区分大小写 |
| `@every 1h` 期望对齐整点执行 | 用 `0 0 */1 * * *` 代替 |
| 单机模式忘记传 workQueue | 单机必须带 workQueue，广播不带 |
| 使用未实现的 GroupStart/AgentStart | 这两个 Action 当前版本尚未实现，勿使用 |

---

## 十六、参考资源

- 项目 README：`/README.md`（含架构图、安装启动、压力测试数据）
- 核心使用手册：`/docs/user_manual.md`（Subject 规范、消息体格式、结束任务、心跳、监控、流水）
- Web 界面手册：`/docs/web_manual.md`（命名空间管理、服务任务管理、定时任务配置）
- Java 示例代码：`/docs/examples/natsjob-java/`（含 standalone / broadcast / map / monitor 全场景示例，包含 JetStream ACK 高阶示例 `MaxJsTest.java`）
- NATS 官方文档：<https://nats.io/>
- cron 库文档：<https://pkg.go.dev/github.com/robfig/cron/v3>
- Docker Hub：<https://hub.docker.com/r/luanxinghai/natsjob>
- GitHub 服务端：<https://github.com/luanxinghai/natsjob>
