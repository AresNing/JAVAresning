# CentOS 安装 Docker

- Docker 分为 CE 和 EE 两大版本。CE 即社区版（免费，支持周期 7 个月），EE 即企业版，强调安全，付费使用，支持周期 24 个月。
- Docker CE 分为 `stable` `test` 和 `nightly` 三个更新频道。
- 官方网站上有各种环境下的 [安装指南](https://docs.docker.com/install/)，这里主要介绍 Docker CE 在 CentOS上的安装。
- Docker CE 支持 64 位版本 CentOS 7，并且要求内核版本不低于 3.10， CentOS 7 满足最低内核的要求，所以我们在CentOS 7安装Docker。

## 卸载（可选）

- 如果之前安装过旧版本的 Docker，可以使用下面命令卸载：

```bash
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine \
                  docker-ce
```

## 安装 Docker

1. 需要安装 yum 工具

```bash
yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2 --skip-broken
```

2. 更新本地镜像源：

```bash
# 设置docker镜像源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

yum makecache fast
```

3. yum 安装 docker-ce 社区免费版本

```bash
yum install -y docker-ce
```

## 启动 Docker

1. Docker 应用需要用到各种端口，逐一去修改防火墙设置非常麻烦，可选择直接关闭防火墙或在云服务器控制台逐一开放端口

```bash
# 关闭
systemctl stop firewalld
# 禁止开机启动防火墙
systemctl disable firewalld
```

2. 通过命令启动 Docker

```bash
systemctl start docker  # 启动docker服务

systemctl stop docker  # 停止docker服务

systemctl restart docker  # 重启docker服务
```

3. 查看docker版本：

```bash
docker -v
```

## 配置镜像加速

- Docker 官方镜像仓库网速较差，需要设置国内镜像服务
- 参考阿里云的镜像加速文档：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

# CentOS 7 安装 DockerCompose

## 下载

```bash
# 安装
curl -L https://github.com/docker/compose/releases/download/1.23.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

## 修改文件权限

```bash
# 修改权限
chmod +x /usr/local/bin/docker-compose
```

## Base自动补全命令

```sh
# 补全命令
curl -L https://raw.githubusercontent.com/docker/compose/1.29.1/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose
```

- 如果这里出现错误，需要修改自己的 hosts 文件：

```bash
echo "199.232.68.133 raw.githubusercontent.com" >> /etc/hosts
```

# Docker 镜像仓库

- 搭建镜像仓库可以基于 Docker 官方提供的 DockerRegistry 来实现
- 官网地址：https://hub.docker.com/_/registry

## 简化版镜像仓库

- Docker 官方的 Docker Registry 是一个基础版本的 Docker 镜像仓库，具备仓库管理的完整功能，但是没有图形化界面

```bash
docker run -d \
    --restart=always \
    --name registry	\
    -p 5000:5000 \
    -v registry-data:/var/lib/registry \
    registry
```

- 命令中挂载了一个数据卷`registry-data`到容器内的`/var/lib/registry`目录，这是私有镜像库存放数据的目录
- 浏览器访问：http://IPaddr:5000/v2/_catalog 可以查看当前私有镜像服务中包含的镜像

## 带有图形化界面版本

- 使用 DockerCompose 部署带有图象界面的 DockerRegistry

```yaml
version: '3.0'
services:
  registry:
    image: registry
    volumes:
      - ./registry-data:/var/lib/registry
  ui:
    image: joxit/docker-registry-ui:static
    ports:
      - 8080:80
    environment:
      - REGISTRY_TITLE=AresNing私有仓库
      - REGISTRY_URL=http://registry:5000
    depends_on:
      - registry
```

## 配置Docker信任地址

- 私服采用的是 http 协议，默认不被 Docker 信任，所以需要做一个配置

```bash
# 打开要修改的文件
vi /etc/docker/daemon.json
# 添加内容：
"insecure-registries":["http://8.142.98.103:8080"] # 填写自己服务器的ip
# 重加载
systemctl daemon-reload
# 重启docker
systemctl restart docker
```
