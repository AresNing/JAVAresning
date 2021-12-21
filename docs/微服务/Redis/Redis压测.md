> [Redis 基准测试 性能测试工具](https://www.redis.com.cn/topics/benchmarks.html#:~:text=Redis 包含了工具程序 redis-benchmark，它可以模拟运行命令，相当于模拟N个客户端同时发送总数M个查询 (和apache的ab工具程序类似)。. 下面是在linux系统上执行benchemark后的完整输出，支持的选项如下：. Usage%3A redis-benchmark [-h,The substitution changes every time a  command.)
>
> [Redis 性能测试 | 菜鸟教程 (runoob.com)](https://www.runoob.com/redis/redis-benchmarks.html)

- 100个并发连接，100000个请求，Redis 的连接密码为`root`

```bash
redis-benchmark -h 127.0.0.1 -p 6379 -a root -c 100 -n 100000
```

- 存取大小为100字节的数据包，`-q`表示只显示`query/sec`值

```bash
redis-benchmark -h 127.0.0.1 -p 6379 -a root -q -d 100
```

- 只测试某些操作的性能

```bash
redis-benchmark -a root -t set,lpush -n 100000 -q
```

- 只测试某些数值存取的性能

```bash
redis-benchmark -a root -n 100000 -q script load "redis.call('set','foo','bar')"
```

