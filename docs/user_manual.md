# natsjob 核心使用场景

natsjob 依托 NATS 灵活的 Subject 命名规范和 KV 存储模式实现定时任务下发，通过不同的 Subject 格式约定，适配纯内存、持久化、单机/广播/Map 等多种业务场景。

## 一、Subject 格式规范

### 基础格式
```
<natsjob-void|natsjob>.job.<action>.<namespace>.<app-name>.<job-name>.<client-id>
```

**模式说明**

| 前缀类型      | 底层模式       | 核心特性                                                                 |
|---------------|----------------|--------------------------------------------------------------------------|
| `natsjob-void` | NATS 纯内存模式 | 无任何持久化记录，natsjob 仅负责下发消息，无存储开销，性能怪兽 |
| `natsjob`      | NATS JetStream | 基于 Stream + KV 存储任务记录（默认保留 24 小时），支持数据回溯、ACK 确认等高级特性 |

### 核心 Subject 类型说明

| 类型          | Subject 示例                          | 功能说明                                   |
|---------------|---------------------------------------|--------------------------------------------|
| VoidStart     | `natsjob-void.job.start.app.biz.owner` | 任务启动（纯缓存模式，无记录）             |
| PreStart      | `natsjob.job.pre-start.app.biz.owner`  | 任务预启动（Map 模式前置流程）             |
| Start         | `natsjob.job.start.app.biz.owner`      | 任务启动（单机/广播核心场景）              |
| ClientStart   | `natsjob.job.client-start.app.biz.owner` | 客户端定向启动（支持按客户端 ID 分发）    |
| GroupStart    | `natsjob.job.group-start.app.biz.owner` | 分组启动（功能尚未实现）                   |
| AgentStart    | `natsjob.job.agent-start.app.biz.owner` | 智能体启动（功能尚未实现）                 |
| SubResultFlow | `natsjob.job.sub-result-flow` | 子任务流水信息上报subject通道（客户端发起）         |
| Monitor       | `natsjob.job.monitor`    | 监控subject（客户端监听它自定义处理后续监控逻辑）       |

> 注：示例中 `namespace` 默认值为 `app`，`app-service` 默认值为 `biz`，`job-name` 示例为 `owner`。后面同是。

> SubResultFlow 与 Monitor 都是固定命名subject，客户端自定义上报流水和监听监控信息。

## 二、单机模式

单机模式下，相同队列的任务仅由一个客户端接收处理，按功能强度分为以下等级：

| 等级         | Subject 示例                          | 核心特性                                                                 |
|--------------|---------------------------------------|--------------------------------------------------------------------------|
| 炼气-lite    | `natsjob-void.job.start.app.biz.owner` | 纯内存模式；客户端无需上报心跳；无任何记录；仅下发任务，性能怪兽        |
| 筑基-plus    | `natsjob.job.start.app.biz.owner`      | JetStream 模式；客户端无需上报心跳；natsjob不写库，仅下发任务；NATS记录历史数据；性能怪兽 |
| 金丹-max     | `natsjob.job.start.app.biz.owner`      | JetStream 模式；客户端无需上报心跳；natsjob写库和下发任务；支持并发控制、超时控制 |
| 元婴-pro     | `natsjob.job.start.app.biz.owner`      | JetStream 模式；客户端需上报心跳；natsjob写库和下发任务；支持并发/超时控制；无心跳则不处理任务 |
| 道祖-ultra   | `natsjob.job.client-start.app.biz.owner.<客户端ID>` | JetStream 模式；客户端需上报心跳；natsjob写库和下发任务；支持并发/超时控制；无心跳则不处理任务。可按「随机/轮询/最先注册/最大权重」策略定向下发任务<br/>示例：<br/>- `natsjob.job.client-start.app.biz.owner.客户端id1` |

## 三、广播模式

广播模式与单机模式核心逻辑一致，区别在于：**无队列限制，所有客户端均可接收并处理同一任务**。

| 等级         | Subject 示例                          | 核心特性                                                                 |
|--------------|---------------------------------------|--------------------------------------------------------------------------|
| 炼气-lite    | `natsjob-void.job.start.app.biz.owner` | 纯内存模式；客户端无需上报心跳；无任何记录；仅下发任务，性能怪兽         |
| 筑基-plus    | `natsjob.job.start.app.biz.owner`      | JetStream 模式；客户端无需上报心跳；natsjob不写库，仅下发任务；NATS记录历史数据；性能怪兽 |
| 金丹-max     | `natsjob.job.start.app.biz.owner`      | JetStream 模式；客户端无需上报心跳；natsjob写库和下发任务；支持并发控制、超时控制 |
| 元婴-pro     | `natsjob.job.start.app.biz.owner`      | JetStream 模式；客户端需上报心跳；natsjob写库和下发任务；支持并发/超时控制；无心跳则不处理任务 |
| 道祖-ultra   | `natsjob.job.client-start.app.biz.owner.<客户端ID>` | JetStream 模式；客户端需上报心跳；natsjob写库和下发任务；支持并发/超时控制；无心跳则不处理任务。按已上报心跳的客户端 ID 批量下发任务<br/>示例：<br/>- `natsjob.job.client-start.app.biz.owner.客户端id1`<br/>- `natsjob.job.client-start.app.biz.owner.客户端id2`<br/>- `natsjob.job.client-start.app.biz.owner.客户端id3` |

## 四、Map 模式

Map 模式适配 Map/MapReduce 等流程化任务场景，核心逻辑为「预启动任务 → 客户端回复 → 触发下一步/结束任务」，natsjob 仅等待最终结果，流程控制由客户端自主实现。

| 等级         | Subject 示例                          | 核心特性                                                                 |
|--------------|---------------------------------------|--------------------------------------------------------------------------|
| 炼气-lite    | `natsjob-void.job.pre-start.app.biz.owner` | 纯内存模式；客户端无需上报心跳；无任何记录；仅下发任务，性能怪兽 |
| 筑基-plus    | `natsjob.job.pre-start.app.biz.owner`  | JetStream 模式；客户端无需上报心跳；natsjob不写库；NATS 记录历史数据；性能怪兽 |
| 金丹-max     | `natsjob.job.pre-start.app.biz.owner`  | JetStream 模式；客户端无需上报心跳；natsjob写库和下发任务；支持并发/超时控制<br/>▸ 客户端回复 `success:next`：natsjob 下发下一步任务（Subject：`natsjob.job.start.app.biz.owner`）<br/>▸ 客户端回复 `success/fail`：任务彻底结束，natsjob关闭该任务 |
| 元婴-pro     | `natsjob.job.pre-start.app.biz.owner`  | JetStream 模式；客户端需上报心跳；natsjob写库和下发任务；支持并发/超时控制；无心跳则不处理任务<br/>客户端回复逻辑同「max」等级 |
| 道祖-ultra   | -                                     | 无人到达此境界                                               |

> 补充说明：客户端可根据业务场景自定义交互流程，natsjob 提供 demo 示例参考，NATS 原生支持跨主题流转任务，可灵活实现复杂的：静态分片、Map、MapReduce、流转等逻辑。

> max和pro回复: success:next 才会下发下一步任务; 回复: success/fail 会彻底结束任务
### MapReduce 自定义设计思路
natsjob 仅提供基础的任务下发与结果接收能力，不介入 MapReduce 流程的具体实现，客户端可完全自定义分片、处理、流转逻辑，核心设计思路如下：

1. **分片存储层自定义**：
   客户端可将任务分片数据存储至 Redis、关系型数据库、Elasticsearch、ClickHouse 等任意存储介质，灵活适配数据规模与查询需求。

2. **分片处理层自定义**：
   客户端根据业务场景定义不同的 Subject，通过 Subject 定向分发分片任务；不同客户端监听专属 Subject 完成分片处理，并将处理结果上报至 Redis/数据库等存储介质。

3. **流程流转层自定义**：
   客户端可根据业务需求，自主触发后续的任务流转、数据聚合、统计分析等环节，无需依赖 natsjob 介入。

4. **natsjob 核心定位**：
   仅负责接收最终任务结果与全流程场景流水，不干预中间任何分片、处理、流转环节，最大化保障客户端的自主可控性。


## 下发消息

```json
{
"taskId": "2091838529360826368",
"namespace": "app",
"appName": "biz",
"jobName": "owner",
"jobCategory": "standalone",
"jobModel": "max",
"condition": "",
"jobArgs": "test",
"jobCreatedAt": "2099-09-09 14:47:24.000",
"jobExpireTime": "2099-09-09 14:47:34.000",
"jobEndKvKey": "natsjob.job.end.app.biz.owner.2091838529360826368",
"jobEndResultKvBucket": "natsjob-job-results",
"jobRunningCount": 0,
"nextPayload": ""
}
```

**参数字段说明**

| 字段名                | 类型           | 字段说明                                                                 |
|-----------------------|----------------|--------------------------------------------------------------------------|
| taskId                | String         | 每次下发任务的唯一标识                                                   |
| namespace             | String         | 命名空间，与服务端配置一致                                         |
| appName               | String         | 应用名称，与服务端配置一致                                         |
| jobName               | String         | 任务名称，与服务端配置一致                                         |
| jobCategory           | String         | 任务分类，与服务端配置一致                                         |
| jobModel              | String         | 任务模型，与服务端配置一致                                         |
| condition             | String         | 运行条件，与服务端配置一致                                         |
| jobArgs               | String         | 任务参数，与服务端配置一致                                         |
| jobCreatedAt          | String         | 任务创建时间                                                             |
| jobExpireTime         | String         | 任务过期时间                                                             |
| jobEndKvKey           | String         | 任务结束 KV 键<br/>▸ 空值：表示此任务无需结束，服务端不会存储任务结束结果(lite和plus) |
| jobEndResultKvBucket  | String         | 任务结束 KV 桶                                                           |
| nextPayload           | String         | 自定义下一个任务时，可将相关信息以 JSON 格式存储此字段<br/>▸ 服务端下发时默认为空 |

> nextPayload字段特殊说明：客户端需要流转下一步，可将相关信息以 JSON 格式存储此字段，那么下一步就可以拿到全部数据和业务数据。

## 结束任务

> 注意： lite与plus是不具备结束任务的，nastjob只是无脑下发任务消息，不做其他任何处理。

> max，pro，ultra具备结束任务，任务结束方式：来自客户端触发结束，超时结束。

nats的kv桶: natsjob-job-results ，将你收取消息中 jobEndKvKey 此值更新如下json信息就可以结束任务

```json
{
   "status": "success",
   "reason": "赚到1个小目标",
   "monitorStatus": "monitior:world",
   "monitorPayload": "通知全世界我有1个小目标了"
}
```
**参数字段说明**

| 字段名          | 类型   | 字段说明       |
|-----------------|--------|----------------|
| status          | String | 状态: success,fail,success:next          |
| reason          | String | 原因           |
| monitorStatus   | String | 监控状态，自定义      |
| monitorPayload  | String | 监控随路数据，自定义  |

状态说明：

- success：代表本次任务成功,任务彻底结束
- fail: 代表本次任务失败,任务彻底结束
- success:next：代表本次前置任务成功可触发下一个

## 监控机制
监控是 natsjob 的内置默认行为，同时支持客户端自主扩展消息通知与处理逻辑。

- **监控主题**：`natsjob.job.monitor`

### 工作流程
1. 客户端上报任务结果时，若 `monitorStatus` 不为空时触发监控下发
2. natsjob 会自动将监控消息推送到 `natsjob.job.monitor`
3. 客户端可订阅该主题，根据消息内容触发后续业务逻辑（告警、通知、补偿等）

> 说明：`monitorStatus` 和 `monitorPayload` 均为**完全自定义**，以下仅为示例思路。

### 监控状态示例
| 监控状态 | 监控随路数据 | 下一步行为 |
|----------|---------------|------------|
| monitor:email:qiwei:sms   | 数据积压1个亿了 | 给全员发邮件和企微提醒加班，短信轰炸 |
| monitor:dingding | 数据积压2个亿了 | 给全员发钉钉通知轰炸 |
| monitor:feishu | 数据积压3个亿了 | 给全员发飞书通知轰炸 |


**客户端接收监控消息参数字段说明**

| 字段名          | 类型   | 字段说明                     |
|-----------------|--------|------------------------------|
| taskId          | String | 每次下发任务的唯一标识       |
| subTaskId       | String | 子任务唯一标识               |
| namespace       | String | 命名空间，与服务端配置一致   |
| appName         | String | 应用名称，与服务端配置一致   |
| jobName         | String | 任务名称，与服务端配置一致   |
| status          | String | 状态                         |
| reason          | String | 原因                         |
| monitorStatus   | String | 监控状态                     |
| monitorPayload  | String | 监控随路数据                 |



## 上报任务流水
在使用中执行一次任务，需记录相关流水信息。可自定义场景信息来进行自定义上报记录。

subject：natsjob.job.sub-result-flow

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
"MonitorStatus": "monitoring:email",
"MonitorPayload": "积压1w条数据",
"startAt": "2099-09-09 14:47:24.000",
"endAt": "2099-09-09 15:47:24.000"
}
```

**参数字段说明**

| 字段名          | 类型           | 字段说明                     |
|-----------------|----------------|------------------------------|
| taskId          | String         | 每次下发任务的唯一标识       |
| namespace       | String         | 命名空间，与服务端配置一致   |
| appName         | String         | 应用名称，与服务端配置一致   |
| jobName         | String         | 任务名称，与服务端配置一致   |
| clientId        | String         | 客户端ID                     |
| sceneId         | String         | 场景ID，自定义    |
| sceneName       | String         | 场景名称，自定义   |
| status          | String         | 任务状态                     |
| reason          | String         | 任务状态原因                 |
| monitorStatus   | String         | 监控状态                     |
| monitorPayload  | String         | 监控随路数据                 |
| startAt         | String         | 任务开始时间 (yyyy-MM-dd HH:mm:ss.SSS)|
| endAt           | String         | 任务结束时间 (yyyy-MM-dd HH:mm:ss.SSS)|



## 客户端推送心跳

客户端自定义心跳推送，每5秒触发一次变更，natsjob会监听到。用于pro，ultra任务。

nats的kv bucket： natsjob-heartbeat

key值：
```
natsjob.heartbeat.client.<namespace>.<app-service>.<客户端id>

示例： natsjob.heartbeat.client.app.biz.client-1
```
心跳数据：
```json
{
   "id": "client-1",
   "namespace": "app",
   "appName": "biz",
   "ip": "127.0.0.1",
   "comment": "demo",
   "weight": 100
}
```

**参数字段说明**

| 字段名               | 类型    | 必填性 | 默认值 | 字段说明                                                                                                 |
|----------------------|---------|--------|--------|----------------------------------------------------------------------------------------------------------|
| id                   | String  | 必填   | -      | 自定义 ID，格式要求：英文、数字、横线组合；也可采用uuid                                                                 |
| namespace            | String  | 必填   | -      | 命名空间，取值来自配置                                                                                   |
| appName              | String  | 必填   | -      | 应用名称，取值来自配置                                                                                   |
| ip                   | String  | 非必填 | -      | IP 地址，支持自定义填写                                                                                  |
| comment              | String  | 非必填 | -      | 描述信息，支持自定义填写                                                                                 |
| weight               | Integer | 非必填 | 100    | 权重值 默认100，用于服务端任务下发策略：<br/>▸ 权重为 0 时，服务端不会下发任务<br/>▸ 场景：客户端可根据服务器 CPU/内存阈值将权重设为 0，避免任务下发至资源紧张的服务器 |
| machineCpuUsage      | String  | 非必填 | -      | 机器 CPU 使用率                                                                                          |
| machineMemoryUsage   | String  | 非必填 | -      | 机器内存使用率                                                                                            |
| processCpuUsage      | String  | 非必填 | -      | 进程 CPU 使用率                                                                                          |
| processMemoryRss     | String  | 非必填 | -      | 进程内存使用率（RSS）    

> 权重：只针对ultra 场景，ultra场景是可控制发指定客户端。

# 日志文件
natsjob 日志默认配置规则：日志文件达到 500MB 时自动分割；历史日志保留遵循 “最近 7 天” 和 “最多 10 个文件” 双重限制（满足任一条件即清理）；所有过期日志文件均会自动压缩归档。


# 总结
读到这里，相信你已经理解 natsjob 的核心设计思想：
**natsjob 只负责调度、监听与消息下发，所有业务场景的控制权，完全交给客户端。**

即使你在 natsjob 管理页面配置的是单机任务，只要客户端按广播、Map 模式去处理消息，一样可以正常运行——框架不做强制限制，真正做到**轻量、可控、面向场景**。