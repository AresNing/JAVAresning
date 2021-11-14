# 单机部署

> Centos7 中使用 Docker 来安装

## 下载镜像

- 在线拉取

``` bash
docker pull rabbitmq:3-management
```

- 使用命令加载镜像即可

```bash
docker load -i mq.tar
```

## 安装MQ

- 执行下面的命令来运行 MQ 容器

```sh
docker run \
 -e RABBITMQ_DEFAULT_USER=root \
 -e RABBITMQ_DEFAULT_PASS=r \
 --name mq \
 --hostname mq1 \
 -p 15672:15672 \
 -p 5672:5672 \
 -d \
 rabbitmq:3-management
```

- `-p 15672:15672`：RabbitMQ 管理端口
- `-p 5672:5672`：RabbitMQ 服务端口

# 集群部署

## 集群分类

- 在 RabbitMQ 的官方文档中，讲述了两种集群的配置方式
- 普通模式：普通模式集群不进行数据同步，每个 MQ 都有自己的队列、数据信息（其它元数据信息如交换机等会同步）
  - 例如有2个 MQ：mq1 和 mq2，如果用户消息在 mq1，而用户连接到了mq2，那么 mq2 会去 mq1 拉取消息，然后返回给用户
  - 如果 mq1宕机，消息就会丢失
- 镜像模式：与普通模式不同，队列会在各个 MQ 的镜像节点之间同步，因此用户连接到任何一个镜像节点，均可获取到消息；而且如果一个节点宕机，并不会导致数据丢失
  - 不过，这种方式增加了数据同步的带宽消耗
