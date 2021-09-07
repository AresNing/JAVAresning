# 基本介绍

- SpringMVC 是一种基于 Java 的实现 MVC 设计模型的请求驱动类型的轻量级 Web 框架，属于SpringFrameWork 的后续产品，已经融合在 Spring Web Flow 中

# 开发基本步骤

![SpringMVC开发基本步骤](pics/image-20210827094945559.png)

## 导入 SpringMVC 相关坐标

- 导入 Spring 和 SpringMVC 的坐标

  ```xml
  <!--Spring坐标-->
  <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.0.5.RELEASE</version>
  </dependency>
  <!--SpringMVC坐标-->
  <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.0.5.RELEASE</version>
  </dependency>
  ```

- 导入 Servlet 和 Jsp 的坐标

  ```xml
  <!--Servlet坐标-->
  <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>servlet-api</artifactId>
      <version>2.5</version>
  </dependency>
  <!--Jsp坐标-->
  <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>jsp-api</artifactId>
      <version>2.0</version>
  </dependency>
  ```

## 配置 SpringMVC 核心控制器 DispatcherServlet

```xml
<servlet>
	<servlet-name>DispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
    	<param-name>contextConfigLocation</param-name>
        <param-value>classpath:spring-mvc.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
	<servlet-name>DispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

## 创建 Controller 和视图页面

- 创建`Controller`和业务方法

  ```java
  public class UserController {
      public String quickMethod() {
          ...
          return "index.jsp"; // 跳转的视图页面
      }
  }
  ```

- 创建视图页面`index.jsp`

  ```jsp
  <!-- index.jsp -->
  <html>
      <body>
          ...
      </body>
  </html>
  ```

## 使用注解配置 Controller 类中业务方法的映射地址

```java
@Controller
//@RequestMapping("user") // 映射地址: http://localhost:8080/user/... , 相当于加了一个映射地址的父目录
public class UserController {
    // 映射地址: http://localhost:8080/quick
    // 如果添加了映射地址的父目录, 映射地址: http://localhost:8080/user/quick
    @RequestMapping("/quick")
    public String quickMethod() {
        ...
        return "index.jsp"; // 跳转的视图页面
        // 如果添加了映射地址的父目录, 跳转页面的资源路径要加 / -> return "/index.jsp"
    }
}
```

## 配置 SpringMVC 核心文件 spring-mvc.xml

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/mvc
                           http://www.springframework.org/schema/mvc/spring-mvc.xsd
                           http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd">
	<!--配置注解扫描-->
	<context:component-scan base-package="xxx.xxx.controller"/>
</beans>
```

# SpringMVC 流程图示

![SpringMVC流程图示(代码角度)](pics/image-20210827095158242.png)

![SpringMVC流程图示](pics/image-20210827095215973.png)

# SpringMVC 组件解析

## SpringMVC 的执行流程

![SpringMVC的执行流程](pics/image-20210827102808846.png)

1. 用户发送请求至前端控制器`DispatcherServlet`
2. `DispatcherServlet`收到请求调用`HandlerMapping`处理器映射器
3. 处理器映射器找到具体的处理器（可以根据 xml 配置、注解进行查找），生成处理器对象及处理器拦截器（如果有则生成）一并返回给`DispatcherServlet`
4. `DispatcherServlet`调用`HandlerAdapter`处理器适配器
5. `HandlerAdapter`经过适配调用具体的处理器（`Controller`，也叫后端控制器）
6. `Controller`执行完成返回`ModelAndView`
7. `HandlerAdapter`将`Controller`执行结果`ModelAndView`返回`DispatcherServlet`
8. `DispatcherServlet`将`ModelAndView`传给`ViewReslover`视图解析器
9. `ViewReslover`解析后返回具体`View`
10. `DispatcherServlet`根据`View`进行渲染视图（即将模型数据填充至视图中）
11. `DispatcherServlet`响应用户

## SpringMVC 组件解析

1. 前端控制器：`DispatcherServlet`
   - 用户请求到达前端控制器，它就相当于 MVC 模式中的 C
   - `DispatcherServlet`是整个流程控制的中心，由它调用其它组件处理用户的请求
   - `DispatcherServlet`的存在降低了组件之间的耦合性
2. 处理器映射器：`HandlerMapping`
   - `HandlerMapping`负责根据用户请求找到`Handler`即处理器
   - SpringMVC 提供了不同的映射器实现不同的映射方式，例如：配置文件方式，实现接口方式，注解方式等
3. 处理器适配器：`HandlerAdapter`
   - 通过`HandlerAdapter`对处理器进行执行，这是适配器模式的应用
   - 通过扩展适配器可以对更多类型的处理器进行执行
4. 处理器：`Handler`
   - 开发中要编写的具体业务控制器
   - 由`DispatcherServlet`把用户请求转发到`Handler`；由`Handler`对具体的用户请求进行处理
5. 视图解析器：`View Resolver`
   - `View Resolver`负责将处理结果生成`View`视图
   - `View Resolver`首先根据逻辑视图名解析成物理视图名，即具体的页面地址
   - 再生成`View`视图对象，最后对`View`进行渲染将处理结果通过页面展示给用户
6. 视图：`View`
   - SpringMVC 框架提供了很多的`View`视图类型的支持，包括：`jstlView`、`freemarkerView`、`pdfView`等
   - 最常用的视图就是`jsp`

## SpringMVC 注解解析

### @RequestMapping

- 作用：用于建立请求 URL 和处理请求方法之间的对应关系
- 位置：
  - **类上**，请求URL 的第一级访问目录。此处不写的话，就相当于应用的根目录
  - **方法上**，请求 URL 的第二级访问目录，与类上的使用`@ReqquestMapping`标注的一级目录一起组成访问虚拟路径
- 属性：
  - `value`：用于指定请求的 URL，它和`path`属性的作用是一样的
  -  `method`：用于指定请求的方式
  - `params`：用于指定限制请求参数的条件，要求请求参数的`key`和`value`必须和配置的一模一样，例如：
    - `params = {"accountName"}`，表示请求参数必须有`accountName`
    - `params = {"money!=100"}`，表示请求参数中`money`不能是`100`

### mvc命名空间引入

```xml
<!-- 命名空间 -->
xmlns:context="http://www.springframework.org/schema/context"
xmlns:mvc="http://www.springframework.org/schema/mvc"
<!-- 约束空间 -->
http://www.springframework.org/schema/context
http://www.springframework.org/schema/context/spring-context.xsd
http://www.springframework.org/schema/mvc 
http://www.springframework.org/schema/mvc/spring-mvc.xsd
```

### 组件扫描

- SpringMVC 基于 Spring 容器，因此在进行 SpringMVC 操作时，需要将`Controller`存储到 Spring 容器中
- 如果使用`@Controller`注解标注的话，就需要使用`<context:component-scan base-package=“xxx.xxx.controller"/>`进行组件扫描
- `<context:component>`还可以添加参数`<include-filter>`和`<exclude-filter>`，来指定组件扫描的范围

## SpringMVC 的 XML 配置解析

- SpringMVC 有默认组件配置，默认组件都是`DispatcherServlet.properties`配置文件中配置的，该配置文件地址`org/springframework/web/servlet/DispatcherServlet.properties`
- 实际开发中可以重写默认组件的配置

### 视图解析器

`org.springframework.web.servlet.ViewResolver=org.springframework.web.servlet.view.InternalResourceViewResolver`

- 源码：视图解析器的默认配置为

  ```xml
  REDIRECT_URL_PREFIX = "redirect:"  <!-- 重定向前缀 -->
  FORWARD_URL_PREFIX = "forward:"    <!-- 转发前缀（默认值）-->
  prefix = "";     <!-- 视图名称 前缀-->
  suffix = "";     <!-- 视图名称 后缀-->
  ```

- 可以通过属性注入的方式修改视图的前后缀，之后在业务代码中填写资源地址就可以缺省填写*（但感觉会降低代码的可读性）*

  ```xml
  <!--配置内部资源视图解析器-->
  <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
      <!--资源地址前缀为/WEB-INF/views/-->
      <property name="prefix" value="/WEB-INF/views/"></property>
      <!--资源地址后缀为.jsp-->
      <property name="suffix" value=".jsp"></property>
  </bean>
  ```


# SpringMVC 的数据响应

## SpringMVC 数据响应方式

1. **页面跳转**
   - 直接返回字符串
   - 通过`ModelAndView`对象返回
2. **回写数据**
   - 直接返回字符串
   - 返回对象或集合

## 页面跳转

### 返回字符串形式

- 直接返回字符串：将返回的字符串与视图解析器的前后缀拼接后跳转

```java
@RequestMapping("/quick")
public String quickMethod() {
    return "index.jsp";
}
```

### 返回 ModelAndView 对象

```java
@RequestMapping("/quick")
public ModelAndView quickMethod() {
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.setViewName("redirect:index.jsp");
    return modelAndView;
}
```

```java
@RequestMapping("/quick")
public ModelAndView quickMethod() {
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.setViewName("forward:/WEB-INF/index.jsp");
    return modelAndView;
}
```

### 向 request 域存储数据

- 通过 SpringMVC 框架注入的`request`对象`setAttribute()`方法设置（不常用，不利于解耦）

```java
@RequestMapping("/quick")
public String quickMethod(HttpServletRequest request){
    request.setAttribute("name","zhangsan"); // 结合页面里的 EL 表达式或 ajax
    return "index.jsp";
}
```

- 通过`ModelAndView`的`addObject()`方法设置

```java
@RequestMapping("/quick")
public ModelAndView quickMethod(){
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.setViewName("forward:/WEB-INF/views/index.jsp");
    modelAndView.addObject("name","lisi"); // 结合页面里的 EL 表达式或 ajax
    return modelAndView;
}
```

## 回写数据

### 直接返回字符串

- 将需要回写的字符串直接返回，但此时**需要通过`@ResponseBody`注解告知 SpringMVC 框架**，方法返回的字符串不是跳转是直接在  http 响应体中返回

```java
@RequestMapping("/quick")
@ResponseBody
public String quickMethod() throws IOException {
    return "xxxxxxx";
}
```

- 返回`json`格式的字符串，使用`json`转换工具`jackson`将 Java 对象转换成`json`格式的字符串
  1. 导入`jackson`坐标（`jackson-core`，`jackson-databind`，`jackson-annotations`）
```xml
<!--jackson-->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.9.0</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.0</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.9.0</version>
</dependency>
```
  2. 创建`ObjectMapper`对象，调用`writeValueAsString`方法将 Java 对象转换`json`格式字符串

```java
@RequestMapping("/quick")
@ResponseBody
public String quickMethod() throws IOException {
    User user = new User();
    user.setUsername("zhangsan");
    user.setAge(18);
    ObjectMapper objectMapper = new ObjectMapper();
    String s = objectMapper.writerValueAsString(user);
    return s;
}
```

### 返回对象或集合

- 通过 SpringMVC 对对象或集合进行json字符串的转换并回写，**为处理器适配器配置消息转换参数，指定使用`jackson`进行对象或集合的转换**
- 两种实现方法：
  1. 在`spring-mvc.xml`中进行配置`RequestMappingHandlerAdapter`，**配置麻烦，不推荐**
  2. 在`spring-mvc.xml`中，**使用 mvc 的注解驱动**代替上述配置，**推荐使用**

#### mvc 注解驱动

- 在 SpringMVC 的各个组件中，**处理器映射器`HandlerMapper`、处理器适配器`HandlerAdapter`、视图解析器`ViewSolver`称为 SpringMVC 的三大组件**
- 使用`<mvc:annotation-driven>`自动加载`RequestMappingHandlerMapping`（处理映射器）和`RequestMappingHandlerAdapter`（ 处 理 适 配 器 ），可用在`spring-xml.xml`配置文件中使用`<mvc:annotation-driven>`替代注解处理器和适配器的配置
- 使用`<mvc:annotation-driven>`默认底层就会集成`jackson`进行对象或集合的 json 格式字符串的转换
- **建议在`spring-xml.xml`的前部就使用 mvc 的注解驱动**

1. 在`spring-mvc.xml`中，引入 mvc 的命名空间

   ```xml
   xmlns:mvc="http://www.springframework.org/schema/mvc"
   ```

   ```xml
   http://www.springframework.org/schema/mvc                      
   http://www.springframework.org/schema/mvc/spring-mvc.xsd
   ```

2. 在`spring-mvc.xml`中，使用 mvc 的注解驱动

   ```xml
   <mvc:annotation-driven>
   ```

3. 返回对象或集合，进行 json 格式字符串的转换

   ```java
   @RequestMapping("/quick")
   @ResponseBody
   public User quickMethod() throws IOException {
       User user = new User();
       user.setUsername("zhangsan");
       user.setAge(18);
       return user;
   }
   ```

# SpringMVC 获得请求数据













































