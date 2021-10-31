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

- `@Controller`与`@RestController`区别
  - `@RestController`是`@Controller`和`@ResponseBody`两个注解的结合体
  - `@Controller`一般应用在有返回界面的应用场景下，e.g. 需要从后台直接返回 Model 对象到前台
  -  如果只是接口，那么就用`@RestController`来注解

> [Spring Boot Web 开发@Controller @RestController 使用教程](https://www.cnblogs.com/fishpro/p/spring-boot-study-restcontroller.html)

## 编写引导类 / 启动类

```java
/*
* 引导类/启动类：SpringBoot项目的入口,运行main方法就可以启动项目
* Application启动类要放在最外侧,即包含所有子包
* spring-boot会自动加载启动类所在包下及其子包下的所有组件
* */
@SpringBootApplication
public class SpringHelloworldApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringHelloworldApplication.class, args);
    }
} 
```

# 起步依赖原理分析

1.  `spring-boot-starter-parent`
   - 在`spring-boot-starter-parent`中定义了各种技术的版本信息，组合了一套最优搭配的技术版本
   - 在各种`starter`中（如`starter-web`），定义了完成该功能需要的坐标合集，其中大部分版本信息来自于父工程
2. ` spring-boot-starter-web`
   - 创建的工程继承`parent`，引入`starter`后，通过依赖传递，就可以简单方便获得需要的 jar 包，并且不会存在版本冲突等问题

# SpringBoot 配置

## 配置文件分类

- SpringBoot **提供了2种配置文件类型**
  - `properties`，键值对形式
  - `yml` / `yaml`，缩进形式
- 在同一级目录下**优先级**为：`properties` > `yml` > `yaml`
- **默认配置文件名称**：`application`

## YAML

### 基本概念

- [YAML 全称是 YAML Ain't Markup Language]([YAML_百度百科 (baidu.com)](https://baike.baidu.com/item/YAML/1067697))
- YAML 是一个可读性高，用来表达数据序列化的格式
- YAML 文件是**以数据为核心**的，比传统的 xml 方式更加简洁
- YAML 文件的扩展名可以使用`.yml`或者`.yaml`

### 基本语法

```yaml
server: 
  port: 8080
  address: 127.0.0.1

name: abc
```

- 大小写敏感
- **数据值前边必须有空格，作为分隔符**
- **使用缩进表示层级关系**
- 缩进时不允许使用 Tab 键，只允许使用空格（各个系统 Tab 对应的空格数目可能不同，导致层次混乱）
  - 使用 IDEA 则无需考虑此问题，IDEA 会自动将 Tab 转换为空格
- **缩进的空格数目不重要，只要相同层级的元素左侧对齐即可**
-  `#`表示注释，从这个字符一直到行尾，都会被解析器忽略

### 数据格式

- 对象（map）：键值对的集合

```yaml
person:
  name: zhangsan
  age: 20
# 行内写法，行内写法并不常用
person: {name: zhangsan, age: 20}
```

- 数组：一组按次序排列的值

```yaml
address:
  - beijing
  - shanghai
# 行内写法，行内写法并不常用
address: [beijing,shanghai]
```

- 纯量：单个的、不可再分的值

```yaml
msg1: 'hello \n world'  # 单引忽略转义字符
msg2: "hello \n world"  # 双引识别转义字符 
```

- 参数引用

```yaml
name: lisi

person:
  name: ${name}  # 引用上边定义的name值
  age: 20
  address:
    - beijing
    - shanghai
```

## 读取配置文件

> [Spring boot之@Value注解的使用总结_hunan961的博客](https://blog.csdn.net/hunan961/article/details/79206291)

- `@Value`：单个属性注入

```java
@RestController
public class Controller {
    @Value("${name}")
    private String name;
    @Value("${person.age}")
    private int age;
    @Value("${person.address[0]}")
    private String address0;
    
    @RequestMapping("/hello")
    public String hello() {
        System.out.println(name);
        System.out.println(age);
        System.out.println(address0);
        return "hello";
    }
}
```

- `Environment`：将配置信息注入环境对象`Environment`，通过属性名获得对应的属性值

```java
@RestController
public class Controller {
    @Autowired
    private Environment env;
    
    @RequestMapping("/hello")
    public String hello() {
        System.out.println(env.getProperty("name"));
        System.out.println(env.getProperty("person.age"));
        System.out.println(env.getProperty("person.address[0]"));
        return "hello";
    }
}
```

- `@ConfigurationProperties`：可以使配置和对象之间产生映射

```java
@RestController
public class Controller {
    @Autowired
    private Person person;
    
    @RequestMapping("/hello")
    public String hello() {
        System.out.println(person);
        return "hello";
    }
}
```

```java
@Component
@ConfigurationProperties(prefix = "person") // prefix 明确配置文件的主属性, 即properties文件里的person主属性
public class Person {
    private String name;
    private int age;
    private String[] address;
    // getter,setter,toString 方法
}
```

## profile

- 开发 SpringBoot 应用时，通常同一套程序会被安装到不同环境，比如：开发 dev 、测试 test 、生产 prod 等
- 其中数据库地址、服务器端口等等配置都不同，如果每次打包时，都要修改配置文件，那么非常麻烦

```properties
# 例如：修改项目的访问路径，默认值为/
server.servlet.context-path=/hello
```

- **profile 功能就是来进行动态配置切换的**

### profile 配置方式

- 多 profile 文件方式：提供多个配置文件，每个代表一种环境
  - `application-dev.properties/yml`开发环境
  - `application-test.properties/yml`测试环境
  - `application-prod.properties/yml`生产环境
- yml 多文档方式
  - 在 yml 中使用`---`分隔不同配置
  - `spring.profiles`配置项已被弃用，替换为`spring.config.activate.on-profile`

```yaml
---
server:
  port: 8081
spring:
  config:
    activate:
      on-profile: dev
---
server:
  port: 8082
spring:
  config:
    activate:
      on-profile: test
---
server:
  port: 8083
spring:
  config:
    activate:
      on-profile: prod
---
spring:
  profiles:
    active: dev
```

### profile 激活方式

- **配置文件**
  - 在`.properties`配置文件中配置：`spring.profiles.active=dev`，代表选择开发环境配置
  - 在`.yml/.yaml`配置文件中配置：`spring.profiles.active:dev`，代表选择开发环境配置
- **虚拟机参数**
  - IDEA 的 edit configurations - Environment - VM options 设置，指定：`-Dspring.profiles.active=dev`，代表选择开发环境配置
- **命令行参数**：常用于配置打包后的 SpringBoot 应用，方便部署
  - powershell 命令行运行

```powershell
java -jar xxx.jar --spring.profiles.active=dev
```

## 内部配置加载顺序

- **Springboot 程序启动时，会从以下位置加载配置文件：**
  1. `file:./config/`：当前项目下的`/config`目录下
  2. `file:./`：当前项目的根目录
  3. `classpath:/config/`：`classpath`的`/config`目录
  4. `classpath:/`：`classpath`的根目录
- 加载顺序为上述的排列顺序，**优先级**由高到底，高优先级的配置会覆盖低优先级的配置
- SpringBoot 会从这四个位置全部加载主配置文件，**互补配置**

## 外部配置加载顺序

> [官网关于外部配置的说明 Spring Boot Reference Documentation: Externalized Configuration](https://docs.spring.io/spring-boot/docs/2.5.5/reference/htmlsingle/#features.external-config)

**Command line arguments：powershell 命令行运行外部配置**

> [外部配置-命令行参数](https://docs.spring.io/spring-boot/docs/2.5.5/reference/htmlsingle/#features.external-config.command-line-args)

- 可以在命令行进行单独的外部配置：多个配置用空格分开； --配置项=值

```powershell
java -jar xxx.jar --server.port=8081 --server.context-path=/abc
```

  - 也可以通过`--spring.config.location`导入外部配置文件

```powershell
java -jar xxx.jar --spring.config.location=D:/application.properties
```

  - **外部配置自动加载顺序**
    - **优先级**从高到低，高优先级的配置覆盖低优先级的配置，所有的配置会形成互补配置
    - **由 jar 包外向 jar 包内进行寻找**
    - **优先加载带 profile** 即`application-{profile}.properties/.yml/.yaml`，**再加载不带 profile** 即`application.properties/.yml/.yaml`

# SpringBoot 整合其他框架

## SpringBoot 整合 Junit

> [SpringBoot2---单元测试（Junit5）_CSDN博客](https://blog.csdn.net/m0_53157173/article/details/119393404)
>
> SpringBoot 2.2.0 版本开始引入 Junit5.0，单元测试不再需要 @RunWith

1. 引入`starter-test`起步依赖
2. 编写测试类，添加测试相关注解
   - `@SpringBootTest`加在测试类前
   - `@Test`加在测试方法前

```java
// 测试UserService的save方法
@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;
    @Test
    public void test1() {
        userService.save();
    }
}
```

## SpringBoot 整合 Mybatis

1. 引入 mybatis 起步依赖，添加 mysql 驱动
2. 编写 DataSource 和 MyBatis 相关配置

```yaml
# datasource
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql:///springboot?serverTimeZone=UTC
    username: root
    password: root

# mybatis
mybatis:
  mapper-location: classpath:mapper/*Mapper.xml  # mapper映射文件路径
  type-aliases-package: com.njk.springbootmybatis.domain
  # config-location:  # 指定mybatis的核心配置文件
```

3. 定义表和实体类
4. 编写 dao 和 mapper 文件/纯注解开发

- **注解开发**：只需配置 DataSource 信息

```java
@Mapper // 在接口类上添加了@Mapper，在编译之后会生成相应的接口实现类
@Repository
public interface UserMapper {
    @Select("select * from t_user")
    public List<User> findAll();
}
```

- **配置文件开发**：需要配置 DataSource 和 MyBatis 相关配置

```java
@Mapper
@Repository
public interface UserXmlMapper {
    public List<User> findAll();
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.njk.springbootmybatis.mapper.UserXmlMapper">
    <select id="findAll" resultType="user">
        select * from t_user
    </select>
</mapper>
```

5. 测试

### @Mapper 和 @Repository 的区别

> [@Repository 与 @Mapper的区别_CSDN博客](https://blog.csdn.net/qq_44421399/article/details/109825479)
>
> [Spring Boot的MyBatis注解：@MapperScan和@Mapper - MyBatis中文官网](http://www.mybatis.cn/archives/862.html)

- SpringBoot 中在 mapper 接口上写一个`@Repository`注解，只是为了标识，用于声明一个 Bean
- `@Mapper`是 mybatis 自身带的注解
- 在SpringBoot中，mybatis 需要找到对应的 mapper，在编译时生成动态代理类，与数据库进行交互，这时需要用到`@Mapper`注解
- **当有很多 mapper 接口时，就需要写很多`@Mappe`注解，有一种简便的配置化方法便是在启动类上使用`@MapperScan`注解，可以自动扫描包路径下所有的mapper 接口，从而不用再在接口上添加任何注解**

```java
@SpringBootApplication
@MapperScan("com.njk.springbootmybatis.mapper")
public class SpringbootMybatisApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringbootMybatisApplication.class, args);
    }
}
```

## SpringBoot 整合 Redis

1. 引入redis起步依赖：`starter-data-redis`
2. 配置 Redis 相关属性
   - 若使用本地 Redis 服务器，则无需配置相关属性

```yaml
spring:
  redis:
    host: 127.0.0.1 # redis的主机ip
    port: 6379
```

3. 注入 RedisTemplate 模板
   - SpringBoot 自动配置了 RedisTemplate，使用时直接注入即可

```java
@SpringBootTest
class SpringbootRedisApplicationTests {
    @Autowired
    private RedisTemplate redisTemplate;
    @Test
    void testSet() {
        // 存入数据
        redisTemplate.boundValueOps("name").set("zhangsan");
    }
    @Test
    void testGet() {
        Object name = redisTemplate.boundValueOps("name").get();
        System.out.println(name);
    }
}
```

## SpringBoot 整合 Dubbo

# SpringBoot 自动配置

## Condition

### 基本概念

- `Condition`是在 Spring 4.0 增加的**条件判断功能**，通过该功能可以**实现选择性的创建 Bean 操作**

### 自定义条件

1. 定义条件类
   - 自定义类实现`Condition`接口，重写`matches`方法，在`matches`方法中进行逻辑判断，返回`boolean`值
   - `matches`方法有两个参数
     - `context`：上下文对象，可以获取属性值、获取类加载器、获取`BeanFactory`等
     - `metedata`：元数据对象，用于获取注解属性
2. 判断条件：在初始化 Bean 时，使用`@Conditional(自定义条件类.class)`注解

### 自定义条件注解

1. 定义条件注解
   - 定义条件注解的属性值
   - 使用`@Conditional(自定义条件类.class)`注解自定义的条件注解，绑定自定义条件类的逻辑判断
   - 自定义条件类通过获取注解属性值进行逻辑判断，实现**动态判断**
2. 判断条件：在初始化 Bean 时，使用`@自定义条件注解(属性值)`注解，实现动态判断

### SpringBoot 提供的常用条件注解

- `ConditionalOnProperty`：判断配置文件中是否有对应属性和值才初始化Bean
- `ConditionalOnClass`：判断环境中是否有对应字节码文件才初始化 Bean
- `ConditionalOnMissingBean`：判断环境中没有对应 Bean 才初始化Bean

## 切换内置 web 服务器

- SpringBoot 的 web 环境中**默认使用 tomcat 作为内置服务器**
- SpringBoot 提供了**4种内置服务器**，可供选择
  1. **Jetty**
  2. **Netty**
  3. **Tomcat**
  4. **Undertow**
- 通过修改`pom.xml`切换内置 web 服务器

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <!--排除tomcat的依赖-->
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
</dependency>

<!--引入jetty的依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

## @Enable* 注解

- **SpringBoot 中提供了很多`Enable`开头的注解，这些注解都是用于动态启用某些功能的**
- **其底层原理是使用`@Import`注解导入一些配置类，实现 Bean 的动态加载**

```java
@SpringBootApplication
@EnableUser // 很多Enable开头的注解，用于动态启用某些功能的
public class SpringbootEnableApplication {
    ...
}
```

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Import(UserConfig.class) // 底层原理是@Import注解导入一些配置类，实现 Bean 的动态加载
public @interface EnableUser {
}
```

## @Import 注解

- `@Enable*`底层依赖于`@Import`注解导入一些配置类，使用`@Import`导入的类会被Spring 加载到 IOC 容器中
- `@Import`提供4种用法

1. 导入`Bean`

```java
@Import(User.class)
@SpringBootApplication
public class SpringbootEnableApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(SpringbootEnableApplication.class, args);
        User user = context.getBean(User.class);
        System.out.println(user);
}
```

2. 导入配置类

```java
@Import(UserConfig.class)
@SpringBootApplication
public class SpringbootEnableApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(SpringbootEnableApplication.class, args);
        User user = context.getBean(User.class);
        System.out.println(user);
}
```

```java
@Configuration
public class UserConfig {
    @Bean
    public User user() {
        return new User();
    }
}
```

3. 导入`ImportSelector`实现类，一般用于加载配置文件中的类

```java
@Import(MyImportSelect.class)
@SpringBootApplication
public class SpringbootEnableApplication {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(SpringbootEnableApplication.class, args);
        User user = context.getBean(User.class);
        System.out.println(user);
}
```

```java
public class MyImportSelector implements ImportSelector {
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        return new String[]{"com.njk.domain.User"};
    }
}
```

4. 导入`ImportBeanDefinitionRegistrar`实现类

```java
public class MyImportBeanDefinitionRegistar implements ImportBeanDefinitionRegistrar {
    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        AbstractBeanDefinition beanDefinition = BeanDefinitionBuilder.rootBeanDefinition(User.class).getBeanDefinition();
        registry.registerBeanDefinition("user", beanDefinition);
    }
}
```

## @EnableAutoConfiguration 注解

- `@EnableAutoConfiguration`注解内部使用`@Import(AutoConfigurationImportSelector.class)`来加载配置类
- 配置文件位置：`.../META-INF/spring.factories`，该配置文件中定义了大量的配置类，当 SpringBoot 应用启动时，会自动加载这些配置类，初始化 Bean
- 并不是所有的 Bean 都会被初始化，在配置类中使用`Condition`来加载满足条件的 Bean

## 自定义 starter

> 自定义 redis-starter，要求当导入 redis 坐标时，SpringBoot 自动创建 Jedis 的 Bean

1. 创建`redis-spring-boot-autoconfigure`模块
2. 创建`redis-spring-boot-starter`模块，并依赖`redis-spring-boot-autoconfigure`模块
3. 在`redis-spring-boot-autoconfigure`模块中初始化 Jedis 的 Bean，并定义`META-INF/spring.properties`文件
4. 在测试模块中引入自定义的`redis-starter`依赖

# SpringBoot 监听机制







