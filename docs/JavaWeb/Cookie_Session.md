# 会话技术

## 基本介绍

- 会话：一次会话中包含**多次请求和响应**
- 一次会话：浏览器第一次给服务器资源发送请求，会话建立，直到有一方断开为止

## 功能

- 功能：在一次会话的范围内的多次请求之间**共享数据**

## 方式

- 客户端会话技术：Cookie
- 服务器端会话技术：Session

# Cookie

## 基本介绍

- 客户端会话技术，**将数据保存到客户端**

## 使用步骤

1. 创建 Cookie 对象，绑定数据：`new Cookie(String name, String value)`
2. 发送 Cookie 对象：`response.addCookie(Cookie cookie)`
3. 获取 Cookie，取出数据：`Cookie[] request.getCookies()`

## 实现原理

- 基于响应头`set-cookie`和请求头`cookie`实现

## Cookie 的细节

1. 一次发送多个 Cookie：可以创建多个`Cookie`对象，通过`response`调用多次`addCookie()`方法
2. Cookie 的生命周期
   - 默认情况下：当浏览器关闭后，Cookie 数据被销毁
   - 持久化存储：`setMaxAge(int seconds)`
     - 正数：将 Cookie 数据写到硬盘的文件中，持久化存储，并指定 Cookie 存活时间；时间到后，Cookie 文件自动失效
     - 负数：默认值
     - 零：删除 Cookie 信息
3. Cookie 的中文乱码
   - 在 tomcat 8 之前 Cookie 中不能直接存储中文数据，需要将中文数据转码（一般采用URL编码）
   - 在 tomcat 8 之后，Cookie 支持中文数据；特殊字符还是不支持，建议使用URL编码
4. Cookie 共享问题
   -  在一个 tomcat 服务器中，多个 web 项目的 cookie 共享问题
     - 默认情况下 Cookie 不能共享
     - `setPath(String path)`：设置 Cookie 的获取范围。默认情况下，设置当前的虚拟目录；若要共享，则可以将`path`设置为`"/"`
   - 不同的 tomcat 服务器间 Cookie 共享问题
     - `setDomain(String path)`：如果设置一级域名相同，多个服务器之间 Cookie 可以共享

## Cookie 的特点

- Cookie 存储数据在客户端浏览器
- 浏览器对于单个 Cookie 的大小有限制（4kb左右） 
- 浏览器对同一个域名下的总 Cookie 数量有限制（20个左右）

## Cookie 的作用

- Cookie 一般用于存储少量的不太敏感的数据
- 在不登录的情况下，完成服务器对客户端的身份识别

# Session

























