# 部署单点 ES

## 创建网络

- 需要部署 kibana 容器，就需要让 ES 和 kibana 容器互联，因此先创建一个网络

```bash
docker network create es-net
```

## 加载镜像

> 此处采用 ElasticSearch 的 7.12.1版本的镜像

- 运行命令加载即可

```bash
# 导入数据
docker load -i es.tar
```

- 同理，`kibana`的 tar 包也按类似上述方法加载

## 运行

- 运行 docker 命令，部署单点 ES

```bash
docker run -d \
--name es \
-e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
-e "discovery.type=single-node" \
-v es-data:/usr/share/elasticsearch/data \
-v es-plugins:/usr/share/elasticsearch/plugins \
--privileged \
--network es-net \
    -p 9200:9200 \ # es的服务地址端口
    -p 9300:9300 \ # es集群的互连端口
elasticsearch:7.12.1
```

### 命令解释

- `-e "cluster.name=es-docker-cluster"`：设置集群名称
- `-e "http.host=0.0.0.0"`：监听的地址，可以外网访问
- `-e "ES_JAVA_OPTS=-Xms512m -Xmx512m"`：内存大小
- `-e "discovery.type=single-node"`：非集群模式
- `-v es-data:/usr/share/elasticsearch/data`：挂载逻辑卷，绑定 es 的数据目录
- `-v es-logs:/usr/share/elasticsearch/logs`：挂载逻辑卷，绑定 es 的日志目录
- `-v es-plugins:/usr/share/elasticsearch/plugins`：挂载逻辑卷，绑定 es 的插件目录
- `--privileged`：授予逻辑卷访问权
- `--network es-net` ：加入一个名为 es-net 的网络中
- `-p 9200:9200`：端口映射配置

### 访问

- 浏览器访问http://8.142.98.103:9200 访问 ElasticSearch 的管理界面


# 部署 kibana

- kibana 提供一个 ElasticSearch 的可视化界面

## 部署

- 运行 docker 命令，部署 kibana

```bash
docker run -d \
--name kibana \
-e ELASTICSEARCH_HOSTS=http://es:9200 \
--network=es-net \
-p 5601:5601  \
kibana:7.12.1
```

### 命令解释

- - `--network es-net` ：加入一个名为 es-net 的网络中，与 ElasticSearch 在同一个网络中
- `-e ELASTICSEARCH_HOSTS=http://es:9200"`：设置 ElasticSearch 的地址，**因为 kibana 已经与 ElasticSearch 在一个网络，因此可以用容器名直接访问 ElasticSearch**
- `-p 5601:5601`：端口映射配置
- 查看运行日志
```sh
docker logs -f kibana
```

### 访问

- 浏览器访问：http://192.168.150.101:5601 访问 kibana 的管理界面

## DevTools

- kibana 中提供了一个 DevTools 界面：该界面中可以编写 DSL 来操作 ElasticSearch，并且对 DSL 语句有自动补全功能


# 安装 IK 分词器



## 在线安装 ik 插件（较慢）

```bash
# 进入容器内部
docker exec -it elasticsearch /bin/bash

# 在线下载并安装
./bin/elasticsearch-plugin  install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.12.1/elasticsearch-analysis-ik-7.12.1.zip

#退出
exit
#重启容器
docker restart elasticsearch
```

## 离线安装 ik 插件（推荐）

### 查看数据卷目录

- 安装插件需要知道 ElasticSearch 的 plugins 目录位置，因此需要查看 ElasticSearch 的数据卷目录

```bash
docker volume inspect es-plugins
```

### 解压缩分词器安装包

### 上传到es容器的插件数据卷中

###  重启容器

```bash
# 重启容器
docker restart es
```

```bash
# 查看es日志
docker logs -f es
```

### 分词器模式

- IK 分词器包含两种模式
  - `ik_smart`：最少切分
  - `ik_max_word`：最细切分

## 扩展词词典

> IK 分词器提供了扩展词汇的功能

1. 打开 IK 分词器 config 目录
2. 在`IKAnalyzer.cfg.xml`配置文件内容添加

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典 *** 添加扩展词典-->
        <entry key="ext_dict">ext.dic</entry>
</properties>
```

3. 新建一个`ext.dic`，可以参考`config`目录下复制一个配置文件进行修改
4. 重启 ElasticSearch 

```bash
docker restart es

# 查看 日志
docker logs -f elasticsearch
```

> 注意当前文件的编码必须是 UTF-8 格式，严禁使用 Windows 记事本编辑

## 停用词词典

> IK 分词器提供了强大的停用词功能，在索引时就直接忽略当前的停用词汇表中的内容

1. `IKAnalyzer.cfg.xml`配置文件内容添加

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
        <comment>IK Analyzer 扩展配置</comment>
        <!--用户可以在这里配置自己的扩展字典-->
        <entry key="ext_dict">ext.dic</entry>
         <!--用户可以在这里配置自己的扩展停止词字典  *** 添加停用词词典-->
        <entry key="ext_stopwords">stopword.dic</entry>
</properties>
```

2. 在`stopword.dic`添加停用词
3. 重启 ElasticSearch 

```bash
# 重启服务
docker restart elasticsearch
docker restart kibana

# 查看 日志
docker logs -f elasticsearch
```

> 注意当前文件的编码必须是 UTF-8 格式，严禁使用 Windows 记事本编辑


# 部署 ES 集群

- 部署 ES 集群可以直接使用`docker-compose`来完成，要求 Linux 虚拟机至少有**4G**的内存空间
- 首先编写一个`docker-compose`文件

```bash
version: '2.2'
services:
  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.12.1
    container_name: es01
    environment:
      - node.name=es01
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es02,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data01:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
    networks:
      - elastic
  es02:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.12.1
    container_name: es02
    environment:
      - node.name=es02
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es03
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data02:/usr/share/elasticsearch/data
    networks:
      - elastic
  es03:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.12.1
    container_name: es03
    environment:
      - node.name=es03
      - cluster.name=es-docker-cluster
      - discovery.seed_hosts=es01,es02
      - cluster.initial_master_nodes=es01,es02,es03
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - data03:/usr/share/elasticsearch/data
    networks:
      - elastic

volumes:
  data01:
    driver: local
  data02:
    driver: local
  data03:
    driver: local

networks:
  elastic:
    driver: bridge
```

- 运行`docker-compose`以建立集群

```bash
docker-compose up
```