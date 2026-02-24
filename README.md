[![License][License-Image]][License-Url] [![Release][Release-Image]][Release-Url] [![Docker Downloads][Docker-Image]][Docker-Url]

[License-Url]: https://www.apache.org/licenses/LICENSE-2.0
[License-Image]: https://img.shields.io/badge/License-Apache2-blue.svg
[Docker-Image]: https://img.shields.io/docker/pulls/luanxinghai/natsjob?style=flat-square&logo=docker
[Docker-Url]: https://hub.docker.com/r/luanxinghai/natsjob
[Release-Url]: https://github.com/luanxinghai/natsjob/releases/latest
[Release-Image]: https://img.shields.io/github/v/release/luanxinghai/natsjob

# natsjob

natsjob 是一款基于 NATS 消息中间件 + Go 语言构建的分布式定时任务框架。框架设计不追求功能上的“大而全”，而是以工程实践场景为核心导向，聚焦“轻量、可控、场景”三大目标，为分布式定时任务提供极简且高效的解决方案。

github：
- 服务端：[natsjob](https://github.com/luanxinghai/natsjob)
- web：[natsjob-web](https://github.com/luanxinghai/natsjob/web)
- 手册: [natsjob-docs](https://github.com/luanxinghai/natsjob/docs)

#### 设计核心理念

natsjob 围绕“零侵入、云原生、轻量级、高可用”核心特性构建，并通过标准化通信约定，支持多编程语言、多数据库适配，实现定时任务的灵活交互与管理：

- **零侵入集成**：客户端仅需依赖 NATS 官方 SDK 与 NATS 服务建立通信，即可完成定时任务交互；客户端业务逻辑完全自主掌控，无任何侵入性约束。
- **云原生适配**：全面兼容云原生生态，NATS 与 natsjob 均支持 Docker 容器化部署、K8s 编排管理，适配云原生环境的弹性伸缩与运维体系。
- **极致轻量化**：NATS 二进制 + natsjob 二进制总体积100M左右；运行时资源占用低，即使在高频读写场景下，二者总和的内存占用仍可控制在较低水平。
- **多语言兼容**：依托 NATS 对40+ 种编程语言的全面支持（详见 NATS 官网：<https://nats.io/download/>），natsjob 可无缝对接多语言技术栈的业务系统。
- **多数据库支持**：默认SQLite，同时兼容 MySQL、PostgreSQL（含人大金仓 PostgreSQL 兼容模式）、达梦等主流数据库，满足不同数据存储场景需求。手动建库natsjob，服务natsjob连接后会自动建表。
- **高可用保障**：底层基于 NATS 集群模式，natsjob 自身支持主从架构——当 master 节点故障时，集群可30s内自动选举新 master 节点，继续执行任务。
- **跨平台部署**：提供 Windows、Linux、macOS 多系统二进制包，以及 AMD/ARM 架构的 Docker 镜像，适配不同部署环境。
- **可视化管理**：内置 Web 管理界面，支持定时任务的可视化配置：单机、广播、MAP。命名空间互相独立，划分不同场景区域，例如：dev，uat，test等。



## NATS

NATS 是一款**轻量级、高性能、分布式**的开源消息中间件（MQ），专为云原生架构、分布式系统场景设计，具备低延迟、高可用、易部署的核心特性。

### 官方资源

- 官方网站：[NATS 官网](https://nats.io/)
- GitHub 仓库：
    - NATS 服务端：[nats-io/nats-server](https://github.com/nats-io/nats-server)
    - NATS 命令行工具：[nats-io/natscli](https://github.com/nats-io/natscli)

# 安装与启动
## 1. 启动 NATS 服务
必须开启js模式
```bash
# Windows 环境
#nats-server.exe -a 0.0.0.0 -p 4222 -m 8222 -js
nats-server.exe -a 0.0.0.0 -p 4222  -js
# Linux/macOS 环境
#nats-server -a 0.0.0.0 -p 4222 -m 8222 -js
nats-server -a 0.0.0.0 -p 4222  -js
# docker
#docker run -d --name nats -p 4222:4222 -p 8222:8222 nats:latest -js
docker run -d --name nats -p 4222:4222  nats:latest -js

# Windows 环境 带账号密码启动
nats-server.exe -a 0.0.0.0 -p 4222 -js --user natsjob --pass natsjob123
# Linux/macOS 环境 带账号密码启动
nats-server -a 0.0.0.0 -p 4222  -js --user natsjob --pass natsjob123
# docker 带账号密码启动
docker run -d --name nats -p 4222:4222 nats:latest -js --user natsjob --pass natsjob123
```

**参数说明**：

- `-a 0.0.0.0`：监听所有网络地址，允许外部访问
- `-p 4222`：NATS 核心通信端口
- `-m 8222`：HTTP 监控端口,可以不开启
- `-js`：启用 NATS JetStream 功能




## 2. 启动 natsjob

**natsjob 配置参数说明**

| 配置项名称                     | 默认值                          | 参数说明                                                                 |
|--------------------------------|---------------------------------|--------------------------------------------------------------------------|
| NATSJOB_LOG_ENV                | "console"                       | 日志输出方式，console、json两种模式|
| NATSJOB_NATS_URL               | "nats://127.0.0.1:4222"         | NATS 服务连接地址，带账号密码时格式为：nats://用户名:密码@IP:端口 <br/>- 示例：nats://natsjob:natsjob123@127.0.0.1:4222         |
| NATSJOB_SECRET_KEY             | "******" | 系统秘钥，用于接口签名、Token 加密等安全相关操作，建议自行修改为随机字符串 |
| NATSJOB_HTTP_PORT              | "7788"                          | Web 管理界面及 HTTP 接口的监听端口                                       |
| NATSJOB_LOGIN_USER          | "natsjob"                       | Web 管理界面的默认登录用户名                                             |
| NATSJOB_LOGIN_PWD              | "natsjob"                       | Web 管理界面的默认登录密码，建议部署后修改                                |
| NATSJOB_LOGIN_TOKEN_EXPIRE_HOURS | "2"                            | Web 登录生成的 Token 过期时间（小时），默认 2 小时                       |
| NATSJOB_JOB_RESULT_EXPIRE_HOURS | "24"                           | 定时任务执行结果的保留时长（小时），超时后自动清理，默认 24 小时          |
| NATSJOB_DB_TYPE                | "sqlite"                        | 数据库类型，支持 <br/>- sqlite<br/>- mysql<br/>- postgres<br/>- dm（达梦）                     |
| NATSJOB_DB_URL                 | ""                              | 数据库连接地址：<br>- sqlite 可留空（默认使用本地文件）<br>- mysql 格式：root:natsjob123@tcp(127.0.0.1:3306)/natsjob?charset=utf8mb4&parseTime=True&loc=Local<br>- postgres 格式：host=127.0.0.1 user=postgres password=natsjob123 port=5432 dbname=natsjob sslmode=disable TimeZone=Asia/Shanghai<br/>- 达梦 格式：dm://SYSDBA:natsjob123@127.0.0.1:5236?schema=natsjob |
| NATSJOB_DB_CHAN_COUNT          | "100"                           | 数据库操作的通道数量，仅控制**任务结果并发写库**的最大数，建议根据数据库性能调整；默认100    |

**启动命令**

> 启动参数优先级: 环境变量(docker/k8s) > 命令行 > 配置文件

```bash
###本地config.yaml文件启动,[启动服务就自动创建conf下配置文件]
natsjob.exe 
natsjob

###命令行启动
natsjob.exe --NATSJOB_LOG_ENV=json ...其他环境变量
natsjob --NATSJOB_LOG_ENV=json ...其他环境变量

#docker环境变量（k8s同理）
docker run -idt --restart=always \
-p 7788:7788 \
-e TZ=Asia/Shanghai \
-v /opt/natsjob/logs:/app/logs \
-v /opt/natsjob/data:/app/data \
-v /opt/natsjob/conf:/app/conf \
-e NATSJOB_NATS_URL=nats://127.0.0.1:4222 \
-e NATSJOB_DB_TYPE=mysql \
-e "NATSJOB_DB_URL=root:natsjob123@tcp(127.0.0.1:3306)/natsjob?charset=utf8mb4&parseTime=True&loc=Local" \
--name natsjob luanxinghai/natsjob:latest



```
***
**Web 管理页面访问**

地址：[http://127.0.0.1:7878](http://127.0.0.1:7878)
> 说明：启动 natsjob 后，直接访问该地址即可进入可视化管理界面，无需额外配置。


## Web 页面 Nginx 代理配置
natsjob Web 管理页面支持通过 Nginx 反向代理访问，可集成至统一的服务管理域名下，无需直接暴露后端端口，提升安全性。

### 完整 Nginx 配置示例
```nginx
# 配置后端服务上游节点
upstream natsjobweb {
    server 127.0.0.1:7788;  # natsjob Web 服务的实际地址和端口
    # 若部署多实例，可添加多行 server 实现负载均衡，示例：
    # server 127.0.0.1:7789;
}

# 代理 API 接口（适配接口路由）
location /natsjob/api {
    proxy_set_header X-Real-IP $remote_addr;          # 透传客户端真实 IP
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;       # 透传协议（http/https）
    proxy_set_header Host $http_host;                 # 透传请求主机名
    proxy_pass http://natsjobweb$request_uri;         # 转发请求至上游服务
}

# 代理 Web 页面（适配前端路由）
location /natsjob/ {
    proxy_pass http://natsjobweb/;                    # 转发前端页面请求
    proxy_set_header Host $host;                      # 透传主机名
    proxy_set_header X-Real-IP $remote_addr;          # 透传客户端真实 IP
}
```

# 定时任务表达式
natsjob 底层采用 `github.com/robfig/cron/v3` 库实现定时任务调度，**支持最小秒级粒度**的任务触发，兼容标准 cron 表达式并扩展了秒级能力。

## 核心依赖信息

- GitHub 仓库：[robfig/cron](https://github.com/robfig/cron)
- 官方文档：[pkg.go.dev/github.com/robfig/cron/v3](https://pkg.go.dev/github.com/robfig/cron/v3)

| 表达式          | 含义                  | 等价 cron 表达式（秒级） | 适用场景                |
|-----------------|-----------------------|--------------------------|-------------------------|
| `@every 1s`     | 每 1 秒执行一次       | `*/1 * * * * *`          | 高频心跳、实时监控      |
| `@every 5s`     | 每 5 秒执行一次       | `*/5 * * * * *`          | 秒级数据采集            |
| `@every 10s`    | 每 10 秒执行一次      | `*/10 * * * * *`         | 短间隔检测任务          |
| `@every 1m`     | 每 1 分钟执行一次     | `0 */1 * * * *`          | 常规业务定时任务        |
| `@every 2m30s`  | 每 2 分 30 秒执行一次 | `30 */2 * * * *`         | 非整数分钟间隔任务      |
| `@every 1h`     | 每 1 小时执行一次     | `0 0 */1 * * *`          | 小时级统计任务          |
| `@every 1h15m`  | 每 1 小时 15 分执行   | `0 15 */1 * * *`         | 非整数小时间隔任务      |
| `@every 1d`     | 每 1 天执行一次       | `0 0 0 * * *`            | 每日备份、结算          |
| `@every 24h`    | 每 24 小时执行一次    | `0 0 0 * * *`            | 等价 `@every 1d`        |
| `@every 7d`     | 每 7 天执行一次       | `0 0 0 * * 0`            | 周度数据汇总            |

> 注意：`@every` 是**从任务启动时间开始计算间隔**，而非严格对齐时钟（如 `@every 1h` 若 10:05 启动，下次执行是 11:05，而非 11:00）；若需对齐时钟，建议使用标准 cron 表达式。

秒级 cron 表达式示例（6字段格式）
该库默认启用 6 字段（秒 分 时 日 月 周）的秒级扩展，以下是精准控制秒级触发的典型示例：

| 表达式                | 含义                                  | 适用场景                  |
|-----------------------|---------------------------------------|---------------------------|
| `0 * * * * *`         | 每分钟的第 0 秒执行一次               | 对齐分钟的常规任务        |
| `15 * * * * *`        | 每分钟的第 15 秒执行一次              | 分钟内精准秒级触发        |
| `0,30 * * * * *`      | 每分钟的 0 秒、30 秒各执行一次        | 分钟内两次触发            |
| `10-20 * * * * *`     | 每分钟的 10-20 秒，每秒执行一次       | 分钟内连续秒级任务        |




# 压力测试

## 1. 测试环境

| 组件                | 配置说明                                                                 |
|---------------------|--------------------------------------------------------------------------|
| 操作系统            | Ubuntu 22.04.3（笔记本 VMware 虚拟机）<br/>CPU：4核 内存：8G  硬盘：200G |
| NATS                | 默认部署（无特殊配置）|
| natsjob             | 默认部署（无特殊配置）|
| MySQL 8.0           | 数据库连接池设置：2000                                                   |

## 2. 测试场景与结果

### 测试说明

测试场景为**1000个定时任务同时启用+结束，并发写库**，数据为多轮测试的平均值，受环境差异影响仅供参考。
> 注意测试针对并发场景，多少任务数产生这些并发取决于实际场景，可能数万任务才产生这种并发。

| 并发压力场景                          | natsjob 资源占用       | NATS 资源占用          | cron 执行耗时 | 并发限制 | 超时时间 | 数据库回写结果并发限制 |
|---------------------------------------|------------------------|------------------------|---------------|----------|----------|------------------------|
| 1000 次/10秒                          | 内存 < 100M、CPU < 50% | 内存 < 300M、CPU < 50% | 1s            | 1        | 10s      | 100                    |
| 2000 次/10秒                          | 内存 < 200M、CPU < 100%| 内存 < 400M、CPU < 100%| 1s            | 2        | 10s      | 100                    |
| 10000 次/10秒<br/>（长时间运行服务器资源全打满，数据库CPU较高，访问出现异常） | 内存 < 400M、CPU < 600% | 内存 < 600M、CPU < 200% | 1s            | 10       | 10s      | 100 / 1000（对比测试） |

## 3. 性能瓶颈分析

测试结果表明，系统性能瓶颈**主要集中在数据库层**，具体评估如下：

- **低压力场景（并发 < 1000 次/10秒）**：
  低频读写下，natsjob、NATS、数据库均可轻松应对，无资源瓶颈，系统运行稳定。
- **高压力场景（并发 >= 10000 次/10秒）**：
  高频读写时需重点优化数据库服务器配置（提升 CPU 算力、扩容内存、更换 SSD 硬盘）；
  核心问题为：定时任务调度结果会缓存至内存，若数据库消费速度低于任务产生速度，长时间运行易引发**内存溢出、CPU 占满**等异常。

## 4. 优化建议
1. 高并发场景下，优先升级数据库服务器硬件配置（SSD 硬盘可显著提升写库速度）；
2. 调整数据库回写并发限制（如从 100 提升至 1000），匹配高并发任务的写库需求；
3. 超高频任务场景监控内存/CPU 阈值，避免数据库瞬时压力过大；

# demo示例
## java (兼容各版本JDK)
<https://github.com/luanxinghai/natsjob/docs/examples>

**消费模式说明**
本文档中提供的所有示例均基于**临时消费模式**，该模式轻量、高效，能够满足绝大多数业务场景的需求。

若需使用 NATS JetStream 的高阶特性（如消息确认（ACK）、至少一次（At-Least-Once）消费策略、消息重发等），可参考示例代码：`MaxJsTest.java`。

> 提示：临时消费模式已覆盖 90%+ 的常规业务场景，无需盲目追求高阶特性；仅在对消息可靠性有强要求（如金融交易、数据同步）的场景下，建议使用 ACK 机制保障消费可靠性。

比划一下单机版示例：
> 本示例实现 NATS 自动重连，服务不会因 NATS 异常而退出，会持续后台重连，推荐生产环境使用。

```xml
        <!-- Source: https://mvnrepository.com/artifact/io.nats/jnats -->
        <dependency>
            <groupId>io.nats</groupId>
            <artifactId>jnats</artifactId>
            <version>最新版</version>
        </dependency>
```

```java
 public static void main(String[] args) {
        String natsURL = "nats://127.0.0.1:4222";
        String subject = "natsjob-void.job.start.app.biz.owner";
        String workQueue = "worker-queue";
        //设置自动重连,并打印日志信息
        Options build = new Options.Builder().server(natsURL)
                .connectionListener((conn, type) -> {
                    System.out.println("connectionListener:" + type);
                })
                .build();
        try (Connection nc = Nats.connectReconnectOnConnect(build)) {
            //模拟单机客户端1
            nc.createDispatcher()
                    .subscribe(subject, workQueue, (msg) -> {
                        System.out.printf("work1: %s on subject %s\n", new String(msg.getData(), StandardCharsets.UTF_8), msg.getSubject());
                    });

            //模拟单机客户端2
            nc.createDispatcher()
                    .subscribe(subject, workQueue, (msg) -> {
                        System.out.printf("work2: %s on subject %s\n", new String(msg.getData(), StandardCharsets.UTF_8), msg.getSubject());
                    });
            //可继续模拟单机客户端....无数个

            System.out.println("start success...");
            Thread.currentThread().join();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }
```

## 其他语言
python go .net node等可用大模型智能体将java示例转换即可（亲测可行）,为大模型点赞,强的一批!!!
