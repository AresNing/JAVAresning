# 引言

- RPC：remote procedure call，远程过程调用，分布式系统常见的通信方法，跨进程调用
- 跨进程交互形式：RESTful，WebService，HTTP，基于DB做数据交换，基于MQ做数据交换，RPC

![image-20220507153500134](pics/image-20220507153500134.png)

![image-20220507153535390](pics/image-20220507153535390.png)

- 核心原理

![image-20220507153743991](pics/image-20220507153743991.png)

![image-20220507153628227](pics/image-20220507153628227.png)

- 网络通信部分：主流方案是用TCP长连接，使用Netty（基于NIO）代替BIO



# 实践

- 步骤

![image-20220507153924621](pics/image-20220507153924621.png)

- 框架

![image-20220507154141123](pics/image-20220507154141123.png)