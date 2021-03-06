# 分布式 Session 的作用

- 问题：实际的项目会部署在多台服务器上，业务请求先后访问了不同的服务器，会导致之前的 Session 丢失
- 处理方式：
  - 方法一：使用原生的 Session，在多台服务器之间同步 Session，但实际应用使用较少，因为性能较低且实现复杂
  - 方法二：分布式 Session

# 分布式 Session 的实现

- 用户登录后生成随机字符串（生成 UUID），并向 cookie 中写入此字符串
- 在 Redis 中记录此字符串和用户信息的映射
- 当用户再次访问网页时，取出 cookie 中对应字段值，根据此字段值访问 Redis 得到用户相关信息

