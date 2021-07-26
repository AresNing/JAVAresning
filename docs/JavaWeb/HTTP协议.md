# 基本介绍

- Hyper Text Transfer Protocol 超文本传输协议
- 特点
  1. 基于 TCP/IP 的高级协议
  2. **默认端口号：`80`**
  3. **基于请求/响应模型：一次请求对应一次响应**
  4. 无状态的：每次请求之间相互独立，不能交互数据
- 历史版本
  - 1.0版本：每一次请求响应都会建立新的连接
  - 1.1版本：复用连接

# 请求消息

**客户端发送给服务器端的数据**

```html
<!-- 字符串格式 -->
POST /login.html	HTTP/1.1
Host: localhost
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Referer: http://localhost/login.html
Connection: keep-alive
Upgrade-Insecure-Requests: 1
		
username=zhangsan
```

## 请求行

- 格式：请求方式 请求URL 请求协议/版本

  ```html
  GET /login.html HTTP/1.1
  ```

- 请求方式：HTTP 协议中有7种请求方式，常用的有2种

  1. `GET`
     - 请求参数在请求行中，在URL后（**没有请求体**）
     - 请求的 URL 长度有限制
     - 不太安全
  2. `POST`
     - 请求参数在请求体中
     - 请求的 URL 长度无限制
     - 相对安全

## 请求头

客户端浏览器告知服务器的一些消息

- 格式：请求头名称：请求头值
- 常见的请求头名称
  1. `User-Agent`：浏览器告知服务器，**当前请求使用的浏览器版本信息**；可以在服务器端获取该头的信息，**解决浏览器的兼容性问题**
  2. `Referer`：告知服务器，当前请求的来源；作用是防盗链、统计数量

## 请求空行

- 用于分隔`POST`请求的请求头、请求体

## 请求体（正文）

- 封装`POST`请求消息的请求参数
- 键值对格式：键=值

# Request

## Request 对象和 Response 对象的原理

- `Request`和`Response`对象是由服务器创建的，程序员来使用它们
- `Request`对象是用于获取请求消息，`Response`对象是用于设置响应消息

## Request 对象继承体系结构

![Request对象继承体系](pics/image-20210726103546915.png)

## Request 功能

1. 获取请求消息数据
   - 获取请求行消息
   - 获取请求头消息
   - 获取请求体消息
2. **其他功能**
   - 获取请求参数通用方式
   - 请求转发
   - 共享数据
   - 获取`ServletContext`

## 获取请求行消息

`GET /httpdemo/demo1?name=zhangsan HTTP/1.1`

1. 获取请求方式 ：`String getMethod()` --> `GET`
2. **获取虚拟目录**：`String getContextPath()` --> `/httpdemo`
3. 获取Servlet路径：`String getServletPath()` --> `/demo1`
4. 获取`GET`方式的请求参数：`String getQueryString()` --> `name=zhangsan`
5. **获取请求 URI**：`String getRequestURI()` --> `/httpdemo/demo1`
   - URI：统一资源标识符
   - URL：统一资源定位符
   - 囊括范围：URI > URL
6. 获取请求 URL：`StringBuffer getRequestURL()` --> `http://localhost/httpdemo/demo1`
7. 获取协议及版本：`String getProtocol()` --> `HTTP/1.1`
8. 获取客户端的 IP 地址：`String getRemoteAddr()`

## 获取请求头数据

1. **`String getHeader(String name)`：通过请求头的名称获取请求头的值**
2. `Enumeration<String> getHeaderNames()`：获取所有的请求头名称

## 获取请求体数据

- 只有`POST`请求方式才有请求体，在请求体中封装了`POST`请求的请求参数
- 步骤

  1. 获取流对象
     - `BufferedReader getReader()`：获取字符输入流，只能操作字符数据
     - `ServletInputStream getInputStream()`：获取字节输入流，可以操作所有类型数据
  2. 再从流对象中拿数据

## 获取请求参数通用方式

- **不论`GET`还是`POST`请求方式都可以使用下列方法来获取请求参数**

1. **`String getParameter(String name)`：根据参数名称获取参数值**
2. `String[] getParameterValues(String name)`：根据参数名称获取参数值的数组
3. `Enumeration<String> getParameterNames()`：获取所有请求的参数名称
4. **`Map<String,String[]> getParameterMap()`：获取所有参数的`Map`集合**

- **中文乱码问题**
  
  - `GET`方式：tomcat8 已解决`GET`方式乱码问题
  
  - `POST`方式：**在获取参数前**，设置`Request`的编码
  
    ```java
    request.setCharacterEncoding("utf-8");
    ```
  
## 请求转发

- 一种在**服务器内部**的资源跳转方式

- 步骤

  1. 通过`Request`对象获取请求转发器对象：`RequestDispatcher getRequestDispatcher(String path)`
  2. 使用`RequestDispatcher`对象来进行转发：`forward(ServletRequest request, ServletResponse response)`

  ```java
  request.getRequestDispatcher(跳转路径).forward(request, response); 
  ```

- 特点

  1. 浏览器地址栏路径在资源跳转时不发生变化
  2. 只能转发到当前服务器内部资源中
  3. 转发是一次请求

## 共享数据

- 域对象：有作用范围的对象，其可以在范围内共享数据
- `Request`域：代表一次请求的范围，一般用于**在请求转发的多个资源中共享数据**
- 方法
  1. `void setAttribute(String name,Object obj)`：存储数据
  2. `Object getAttitude(String name)`：通过键获取值
  3. `void removeAttribute(String name)`：通过键移除键值对

## 获取 ServletContext

- `ServletContext getServletContext()`









