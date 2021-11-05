# 微服务概述

## 单体架构

- 定义：将业务的所有功能集中在一个项目中开发，打成一个包部署
- 优点：
  - 架构简单
  - 部署成本低
- 缺点：
  - 耦合度高（维护困难、升级困难）

## 分布式架构

- 定义：根据业务功能对系统做拆分，每个业务功能模块作为独立项目开发，称为一个**服务**
- 优点：
  - 降低服务耦合
  - 有利于服务升级和拓展
- 缺点：
  - 服务调用关系错综复杂

## 微服务

- 微服务是一种经过良好架构设计的**分布式架构方案**
- **微服务的架构特征：**
  - **单一职责**：微服务拆分粒度更小，每一个服务都对应唯一的业务能力，做到单一职责
  - **自治**：团队独立、技术独立、数据独立，独立部署和交付
  - **面向服务：服务提供统一标准的接口，与语言和技术无关**
  - **隔离性强**：服务调用做好隔离、容错、降级，避免出现级联问题

## 微服务技术对比

![微服务核心流程](pics/image-20211105100047856.png)

- **SpringCloud** 和 阿里巴巴的 **Dubbo**
- 微服务技术对比

|                | Dubbo               | SpringCloud              | SpringCloudAlibaba       |
| -------------- | ------------------- | ------------------------ | ------------------------ |
| 注册中心       | Zookeeper、Redis    | Eureka、Consul           | Nacos、Eureka            |
| 服务远程调用   | Dubbo 协议          | Feign（HTTP 协议）       | Dubbo、Feign             |
| 配置中心       | 无                  | SpringCloudConfig        | SpringCloudConfig、Nacos |
| 服务网关       | 无                  | SpringCloudGateway、Zuul | SpringCloudGateway、Zuul |
| 服务监控和保护 | dubbo-admin，功能弱 | Hystix                   | Sentinel                 |

- 企业需求

![微服务框架的企业需求](pics/image-20211105101921803.png)

## SpringCloud

- 官网地址：https://spring.io/projects/spring-cloud
- SpringCloud 集成了**各种微服务功能组件**，并**基于 SpringBoot 实现了组件的自动装配**，从而提供了良好的开箱即用体验
- SpringCloud 的常见组件

![SpringCloud的常见组件](pics/image-20211105102317902.png)

- **注意：**SpringCloud 底层是依赖于 SpringBoot 的，并且有**版本的兼容关系**
  - **SpringCloud 版本是 Hoxton.SR10，对应的 SpringBoot 版本是 2.3.x 版本**

![SpringCloud和SpringBoot的版本兼容关系](pics/image-20211105102457800.png)

# 服务拆分及远程调用

## 服务拆分原则

- **单一职责**：不同微服务，不要重复开发相同业务
- **数据独立**：微服务数据独立，不要访问其它微服务的数据库
- **面向服务**：微服务将自己的业务暴露为接口，供其它微服务调用

## 微服务远程调用

> 案例：order-service（根据 id 查询订单），user-service（根据 id 查询用户）

- **基于`RestTemplate`发起的 HTTP 请求实现远程调用**
- **HTTP 请求做远程调用是与语言无关的调用，只要知道对方的 IP、端口、接口路径、请求参数即可**

### 注册 RestTemplate

- 在 order-service 的`OrderApplication`中注册`RestTemplate`

```java
@MapperScan("cn.njk.order.mapper")
@SpringBootApplication
public class OrderApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

### 服务远程调用 RestTemplate

- 修改 order-service 中的`OrderService`的`queryOrderById`方法

```java
@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private RestTemplate restTemplate;

    public Order queryOrderById(Long orderId) {
        // 1.查询订单
        Order order = orderMapper.findById(orderId);
        // 2. 查询用户
        String url = "http://localhost:8081/user/" + order.getUserId();
        User user = restTemplate.getForObject(url, User.class);
        // 3. 封装 user 信息
        order.setUser(user);
        // 4.返回
        return order;
    }
}
```

## 提供者与消费者

- 服务提供者 Provider：暴露接口给其它微服务调用
- 服务消费者 Consumer：调用其它微服务提供的接口
- 服务提供者与服务消费者的角色是相对的

# Eureka 注册中心

![Eureka注册中心](pics/image-20211105111529973.png)

## Eureka 作用

- 消费者该如何获取服务提供者具体信息？
  1. **服务注册：服务提供者启动时向 eureka-server（Eureka 服务端）注册自己的信息**
  2. **eureka-server 保存服务名称到服务实例地址列表的映射关系**
  3. **服务发现 / 服务拉取：消费者根据服务名称向 eureka-server 拉取（`pull`）提供者信息**
- 如果存在多个服务提供者，消费者应该如何选择？
  1. **服务消费者利用负载均衡算法，从服务实例列表中挑选一个**
  2. 向该实例地址发起远程调用
- 消费者如何感知服务提供者的健康状态？
  - **服务提供者会每隔一段时间（默认30秒）向 eureka-server 发送心跳请求，报告健康状态**
  - eureka-server 会**更新**记录服务列表信息，心跳不正常会被剔除
  - **消费者就可以拉取（`pull`）到最新的信息**

## Eureka 的两类角色

- EurekaServer：服务端，注册中心
  - 记录服务信息
  - 心跳监控
- EurekaClient：客户端
  - Provider：服务提供者
    - 注册自己的信息到 EurekaServer
    - 每隔30秒向 EurekaServer 发送心跳
  - Consumer：服务消费者
    - 根据服务名称从 EurekaServer 拉取服务列表
    - 基于服务列表做负载均衡，选中一个微服务发起远程调用

![Eureka使用步骤](pics/image-20211105130437816.png)

## 搭建 eureka-server

### 创建 eureka-server 服务

- 在父工程下，创建`eureka-server`子模块

### 引入依赖

- 引入 SpringCloud 为 eureka 提供的`starter`依赖

```xml
<!--eureka服务端依赖-->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

### 编写启动类

- 给`eureka-server`服务编写一个启动类，添加一个`@EnableEurekaServer`注解，开启 eureka 的注册中心功能

```java
@SpringBootApplication
@EnableEurekaServer // 开启 eureka 的注册中心功能
public class EurekaApplication {
    public static void main(Sring[] args) {
        SpringApplication.run(EurekaApplication.class, args);
    }
}
```

### 编写配置文件

- 编写`application.yml`文件，添加服务名称、eureka 地址

```yaml
server:
  port: 10086
spring:
  application:
    name: eurekaserver # eureka-server服务名字
eureka:
  client:
    service-url: 
      defaultZone: http://127.0.0.1:10086/eureka # eureka服务端地址
```

### 启动服务

- 浏览器访问http://127.0.0.1:10086

## 服务注册

> 将 user-service 注册到 eureka-server 中

### 引入依赖

- 在`user-service`中引入`eureka-client`依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

### 配置文件

- 在`user-service`中，修改`application.yml`文件，添加服务名称、eureka地址

```yaml
spring:
  application:
    name: userservice # eureka-client服务名字: userservice
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka # eureka服务端地址
```

### IDEA 启动多个实例

- 复制原来的`user-service`启动配置

![image-20211105132745454](pics/image-20211105132745454.png)

- 在弹窗中填写信息：实例名称、端口号（避免端口冲突）

![image-20211105132809273](pics/image-20211105132809273.png)

- SpringBoot 窗口会出现两个`user-service`启动配置

![image-20211105132828606](pics/image-20211105132828606.png)

## 服务发现

> 修改 order-service 的逻辑：向 eureka-server 拉取 user-service 的信息，实现服务发现

### 引入依赖

- 在`order-service`中引入`eureka-client`依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

### 配置文件

- 在`order-service`中，修改`application.yml`文件，添加服务名称、eureka地址

```yaml
spring:
  application:
    name: orderservice # eureka-client服务名字: orderservice
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka # eureka服务端地址
```

### 服务拉取和负载均衡

- 去`eureka-server`中拉取`user-service`服务的实例列表，并且实现负载均衡
- 在`order-service`的启动类`OrderAppliaction`中，**给`RestTemplate`这个 Bean 添加`@LoadBalanced`注解**

```java
@MapperScan("cn.njk.order.mapper")
@SpringBootApplication
public class OrderApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

- 修改`order-service`服务中的`OrderService`类中的`queryOrderById`方法，用服务名代替 IP 地址和端口，即**利用服务名称远程调用**

```java
@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private RestTemplate restTemplate;

    public Order queryOrderById(Long orderId) {
        // 1.查询订单
        Order order = orderMapper.findById(orderId);
        // 2. 查询用户
        String url = "http://userservice/user/" + order.getUserId();
        User user = restTemplate.getForObject(url, User.class);
        // 3. 封装 user 信息
        order.setUser(user);
        // 4.返回
        return order;
    }
}
```

# Ribbon 负载均衡

## 负载均衡原理

- SpringCloud 底层利用了一个名为`Ribbon`的组件，来实现负载均衡功能的

![Ribbon负载均衡流程](pics/image-20211105134941920.png)

## 源码分析

![Ribbon负载均衡流程详解](pics/image-20211105135140191.png)

### LoadBalancerInterceptor

![LoadBalancerInterceptor](pics/image-20211105140559378.png)

- 此处的`intercept`方法拦截了用户的 HttpRequest 请求，并执行以下操作：
  - `request.getURI()`：获取请求 URI
  - `originalUri.getHost()`：获取 URI 路径的主机名，实际上是**服务 ID**
  - `this.loadBalancer.execute()`：处理服务 ID 和用户请求
    - 此处的`this.loadBalancer`是`LoadBalancerClient`接口类型，该接口的其中一个实现类是`RibbonLoadBalancerClient`

### RibbonLoadBalancerClient

![RibbonLoadBalancerClient](pics/image-20211105141425704.png)

- `getLoadBalancer(serviceId)`：根据服务 ID 获取`ILoadBalancer`负载均衡器，而`ILoadBalancer`会拿着服务 ID 去 eureka 中获取服务列表并保存起来
- `getServer(loadBalancer)`：利用内置的负载均衡算法，从服务列表中选择一个服务

### IRule 负载均衡策略

- `getServer(loadBalancer)`做负载均衡，实际由`chooseServer`方法实现

![chooseServer](pics/image-20211105142156461.png)

- `BaseLoadBalancer`中的`chooseServer`方法进行服务选择的是`rule`

![BaseLoadBalancer](pics/image-20211105142609128.png)

- `rule`的默认值是一个`RoundRobinRule`，即为**轮询策略**

![image-20211105142941746](pics/image-20211105142941746.png)

### 总结

1. 拦截`RestTemplate`请求
2. `RibbonLoadBalancerClient`会从请求 URL 中获取服务名称
3. `DynamicServerListLoadBalancer`根据服务名称到 eureka 拉取服务列表
4. eureka 返回列表
5. `IRule`利用内置负载均衡规则，从列表中选择一个
6. `RibbonLoadBalancerClient`修改请求地址，用真实 IP 地址替代服务名称，发起真实请求

## 负载均衡策略

### 负载均衡规则类

- Ribbon 的负载均衡规则是`IRule`接口来定义的，每一个子接口都是一种规则
- **默认实现是`ZoneAvoidanceRule`，根据 zone 选择服务列表，然后轮询**

![IRule](pics/image-20211105143528496.png)

| **内置负载均衡规则类**    | **规则描述**                                                 |
| ------------------------- | ------------------------------------------------------------ |
| RoundRobinRule            | 简单轮询服务列表来选择服务器。它是 Ribbon 默认的负载均衡规则 |
| AvailabilityFilteringRule | 对以下两种服务器进行忽略：（1）在默认情况下，这台服务器如果3次连接失败，这台服务器就会被设置为“短路”状态。短路状态将持续30秒，如果再次连接失败，短路的持续时间就会几何级地增加。（2）并发数过高的服务器。如果一个服务器的并发连接数过高，配置了AvailabilityFilteringRule规则的客户端也会将其忽略。并发连接数的上限，可以由客户端的{clientName}.{clientConfigNameSpace}.ActiveConnectionsLimit属性进行配置 |
| WeightedResponseTimeRule  | 为每一个服务器赋予一个权重值。服务器响应时间越长，这个服务器的权重就越小。这个规则会随机选择服务器，这个权重值会影响服务器的选择 |
| **ZoneAvoidanceRule**     | 以区域可用的服务器为基础进行服务器的选择。使用 Zone 对服务器进行分类，这个 Zone 可以理解为一个机房、一个机架等。而后再对 Zone 内的多个服务做轮询 |
| BestAvailableRule         | 忽略那些短路的服务器，并选择并发数较低的服务器               |
| RandomRule                | 随机选择一个可用的服务器                                     |
| RetryRule                 | 重试机制的选择逻辑                                           |

### 自定义负载均衡策略

> 注意：一般用默认的负载均衡规则，不做修改

- 方式一（代码方式）：在`order-service`中的`OrderApplication`类中，定义一个新的`IRule`
  - 特点：全局配置，访问所有服务都会被修改负载均衡规则

```java
@Bean
public IRule randomRule(){
    return new RandomRule(); // 负载均衡：随机
}
```

- 方式二（配置文件方式）：在`order-service`的`application.yml`文件中，添加新的配置来修改规则
  - 特点：针对某个服务进行配置，访问特定的服务才会被修改负载均衡规则

```yaml
userservice: # 给某个微服务配置负载均衡规则，这里是userservice服务
  ribbon:
    NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule # 负载均衡规则 
```

## 饥饿加载

- **Ribbon 默认是采用懒加载**，即第一次访问时才会去创建`LoadBalanceClient`，请求时间会很长
- **饥饿加载则会在项目启动时创建，降低第一次访问的耗时**
- 配置文件开启饥饿加载

```yaml
ribbon:
  eager-load:
    enabled: true # 开启饥饿加载
    clients: # 指定对userservice这个服务饥饿加载
        - userservice # 集合
```

# Nacos 注册中心

## 基本概念

- [Nacos](https://nacos.io/) 是阿里巴巴的产品，现在是 [SpringCloud](https://spring.io/projects/spring-cloud) 中的一个组件；相比 [Eureka](https://github.com/Netflix/eureka) 功能更加丰富，在国内受欢迎程度较高
- Nacos 是 SpringCloudAlibaba 的组件，而 SpringCloudAlibaba 也遵循 SpringCloud 中定义的服务注册、服务发现规范。因此使用 Nacos 和使用 Eureka 对于微服务来说，并没有太大区别
- 两者的主要使用差异：
  1. 依赖不同
  2. 服务地址不同

## 服务注册到 Nacos



## 服务分级存储模型

## 权重配置

## 环境隔离

## Nacos 与 Eureka 的对比





























