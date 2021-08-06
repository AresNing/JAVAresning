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

## 基本实现

- 服务器端会话技术，在一次会话的多次请求间共享数据，**将数据保存在服务器端的对象中**，其中的常用对象为`HttpSession`

## 使用步骤

1. 获取`HttpSession`对象：
   `HttpSession session = request.getSession();`
2. 使用`HttpSession`对象：
   - `Object getAttribute(String name)  `
   - `void setAttribute(String name, Object value)`
   - `void removeAttribute(String name)`

## 原理

- Session 的实现是依赖于 Cookie 的
- 请求 / 响应头中的`JSESSIONID`指向`HttpSession`对象

## Session 的细节

1. 当客户端关闭后，服务器不关闭，两次获取`session`是否为同一个？

   - 默认情况下，不是同一个`session`

   - 如果需要相同，则可以创建`Cookie`，键为`JSESSIONID`，设置最大存活时间，让`Cookie`持久化保存

     ```java
     Cookie c = new Cookie("JSESSIONID",session.getId());
     c.setMaxAge(60*60); // 假设保存时间为60*60s
     response.addCookie(c);
     ```

2. 客户端不关闭，服务器关闭后，两次获取的`session`是同一个吗？

   - 不是同一个`session`，但为了确保数据不丢失，tomcat 自动完成以下工作
     - `session`的钝化：在服务器正常关闭之前，将`session`对象序列化到硬盘上
     - `session`的活化：在服务器启动后，将`session`文件转化为内存中的`session`对象（反序列化）

3. `session`什么时候被销毁

   - 服务器关闭

   - `session`对象调用`invalidate()`

   - `session`默认失效时间 30分钟

     - 可以进行选择性配置修改

       ```xml
       <session-config>
       	<session-timeout>30</session-timeout>
       </session-config>
       ```

## Session 的特点

- Session 用于存储一次会话的多次请求的数据，存在服务器端
- Session 可以存储任意类型，任意大小的数据
- Session 与 Cookie 的区别
  1. Session 存储数据在服务器端，Cookie 存储数据在客户端
  2. Session 没有数据大小限制，Cookie 有数据大小限制
  3. Session 数据安全，Cookie 相对不安全





















