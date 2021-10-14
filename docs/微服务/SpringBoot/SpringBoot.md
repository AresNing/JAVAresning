# SpringBoot 概述

- **SpringBoot 并不是对 Spring 功能上的增强，而是提供了一种快速使用 Spring 的方式，基于约定优于配置的思想**

## Spring 缺点

- 配置繁琐
- 依赖繁琐

## SpringBoot 功能

- 自动配置
  - 应用程序启动时，SpringBoot自动决定 Spring 配置应该用哪个，不该用哪个
- 起步依赖
  - 将具备某种功能的坐标打包到一起，并提供一些默认的功能
- 辅助功能
  - 提供了一些大型项目中常见的非功能性特性，如嵌入式服务器（把web服务器（如tomcat）集成到 SpringBoot 中）、安全、指标，健康检测、外部配置等

# SpringBoot 开发步骤

## 创建 Maven 项目

## 导入 SpringBoot 起步依赖

```xml
<!--springboot工程需要继承的父工程-->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.5</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```

```xml
<!--web开发的起步依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

## 定义 Controller

```java
@RestController
public class Controller {
    @RequestMapping("/hello")
    public String hello() {
        return "hello SpringBoot!";
    }
}
```

- 



































