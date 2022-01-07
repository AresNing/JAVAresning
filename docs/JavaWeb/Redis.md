# 基本概念

## NoSQL

- NoSQL = Not Only SQL，泛指非关系型的数据库
- 优点
  - 成本：nosql 数据库简单易部署
  - **查询速度：nosql 数据库将数据存储在缓存中，关系型数据库将数据存储在硬盘中，查询速度远不及 nosql 数据库**
  - 存储数据的格式：nosql 可以存储基础类型以及集合等各种格式，而数据库则只支持基础类型
  - 扩展性：nosql 数据之间没有耦合性，所以非常容易水平扩展；关系型数据库有类似 join 的多表查询机制的限制，导致扩展很艰难
- 缺点
  - 维护的工具和资料有限，nosql 是属于新的技术
  - **不提供关系型数据库对事务的处理**
  - 不提供对 sql 的支持，有一定的学习和使用成本
- **一般会将数据存储在关系型数据库中，在 nosql 数据库中备份存储关系型数据库的数据**，两者为互补关系
- 主流的 NoSQL 产品：Redis、MongoDB...

## Redis

- Redis 是用 C 语言开发的一个开源的高性能键值对（key-value）非关系型数据库
- **应用场景**
  - **缓存（数据查询、短连接、新闻内容、商品内容等等）**
  - 聊天室的在线好友列表
  - **任务队列（秒杀、抢购等）**
  - 应用排行榜
  - 网站访问统计
  - **数据过期处理（可以精确到毫秒）**
  - 分布式集群架构中的 session 分离
- **注意：使用 Redis 缓存一些不经常发生变化的数据**
  - **数据库的数据一旦发生改变（增删改），则需要更新缓存，再次存入**
  - **在`service`对应的增删改方法中，将 Redis 数据删除**

    

# 命令操作

## Redis 的数据结构及使用场景

- **Redis 存储的是`key,value`格式的数据，其中`key`都是字符串，`value`有5种不同的数据结构**
  1. 字符串类型`string`
  2. 哈希类型`hash`：`map`格式
  3. 列表类型`list`：`linkedlist`格式，支持重复元素
  4. 集合类型`set`：不允许重复元素
  5. 有序集合类型`sortedset`：不允许重复元素，且元素有顺序

## string

### 基本操作

1. 存储：`set key value`

```
set username zhangsan
```

2. 获取：`get key`

```
get username
```

3. 删除：`del key`

```
del age
```

### 使用场景

- 一般常用在需要计数的场景，比如用户的访问次数、热点文章的点赞转发数量等

## hash

### 基本操作

1. 存储：`hset key field value`

```
hset myhash username lisi
```

2. 获取：
- `hget key field value`：获取指定的`field`对应的`value`

```
hget myhash username
```

- `hget key field value`：获取所有的`field`和`value`

```
hgetall myhash
```

3. 删除：`hdel key field`

```
hdel myhash username
```
### 使用场景

- 系统中对象数据的存储，比如用户信息、商品信息

## list

### 基本操作

1. 添加：可以添加一个元素到列表的头部（左边）或者尾部（右边）

- `lpush key value`：将元素加入列表左边

```
lpush myList a
```

- `rpush key value`：将元素加入列表右边

```
rpush myList b
```

2. 获取：`lrange key start end`范围获取

```
// 第一个元素至最后一个元素
lrange myList 0 -1
```

3. 删除

- `lpop key`：删除列表最左边的元素，并将元素返回
- `rpop key`：删除列表最右边的元素，并将元素返回

### 使用场景

- 消息队列、慢查询

## set

### 基本操作

1. 存储：`sadd key value`

```
sadd myset a
```

2. 获取：`smembers key`获取 set 集合中所有元素

```
smembers myset
```

3. 删除：`srem key value`

```
srem myset a
```
### 使用场景

- 需要存放的数据不能重复以及需要获取多个数据源交集和并集等场景，比如共同关注、共同粉丝、共同喜好等功能

## sortedset

> sortedset：不允许重复元素，且元素有顺序，**每个元素都会关联一个 double 类型的分数**
>
> Redis 是通过分数为集合中的成员进行**从小到大的排序**

### 基本操作

1. 存储：`zadd key score value`

```
zadd mysort 60 zhangsan
```

2. 获取：`zrange key start end [withscores]`

```
// 第一个元素至最后一个元素
zrange mysort 0 -1
```

```
// 第一个元素至最后一个元素，及其分数
zrange mysort 0 -1 withscores
```

3. 删除：`zrem key value`

```
zrem mysort lisi
```

### 使用场景

- 需要对数据根据某个权重进行排序的场景，比如在直播系统中，实时排行信息，其中包含直播间在线用户列表、各种礼物排行榜、弹幕消息（可以理解为按消息维度的消息排行榜）等信息

## 通用命令

1. `keys *`：查询所有的键
2. `type key`：获取键对应的`value`的类型
3. `del key`：删除指定的`key-value`

# 持久化

- Redis 是一个内存数据库，当 Redis 服务器或客户端重启，数据会丢失，可以**将 Redis 内存中的数据持久化保存到硬盘的文件中**
- Redis 持久化机制
  1. RDB
  2. AOF

## RDB

### 概念

- 默认方式，不需要进行配置，默认使用该机制
- 在一定的间隔时间中，检测`key`的变化情况，然后持久化数据

### 步骤

1. 编辑`redis.windows.conf`文件

```
#   after 900 sec (15 min) if at least 1 key changed
save 900 1
#   after 300 sec (5 min) if at least 10 keys changed
save 300 10
#   after 60 sec if at least 10000 keys changed
save 60 10000
```

2. 重新启动 Redis 服务器，并在命令行指定配置文件名称

```
redis-server.exe redis.windows.conf
```

## AOF

### 概念

- 日志记录的方式，可以记录每一条命令的操作，可以每一次命令操作后持久化数据

### 步骤

1. 编辑`redis.windows.conf`文件

```
 appendonly no (关闭aof) --> appendonly yes (开启aof)
```

```
# appendfsync always # 每一次操作都进行持久化
appendfsync everysec # 每隔一秒进行一次持久化
# appendfsync no     # 不进行持久化
```

# Jedis

- Jedis: 一款 java 操作 Redis 数据库的工具

## 基本步骤

1. 导入 jedis 的 jar 包
2. 获取连接；如果使用空参构造，默认值`"localhost"`，`6379`端口

```java
Jedis jedis = new Jedis("localhost", 6379);
```

3. 操作

```java
jedis.set("username", "zhangsan");
```

4. 关闭连接

```java
jedis.close();
```

## Jedis 操作 Redis 的数据结构

### string

- 存储：`set`

```java
jedis.set("username", "zhangsan");
```

- 获取：`get`

```java
String name = jedis.get("username");
```

- 使用`setex(key, seconds, value)`方法存储指定过期时间的`key-value`

```java
// 将activecode：hehe键值对存入Redis，并且20秒后自动删除该键值对
jedis.setex("activeCode", 20, "hehe");
```

### hash

- 存储：`hset`

```java
jedis.hset("user", "name", "lisi");
jedis.hset("user", "age", "23");
jedis.hset("user", "gender", "male");
```

- 获取：`hget`

```java
String name = jedis.hget("user", "name");
// 获取hash的所有map中的数据
Map<String, String> user = jedis.hgetAll("user");
```

### list

- 存储：`lpush`、`rpush`

```java
jedis.lpush("mylist","a","b","c"); //从左边存
jedis.rpush("mylist","a","b","c"); //从右边存
```

- 范围获取：`lrange`

```java
List<String> mylist = jedis.lrange("mylist", 0, -1);
```

- 弹出：`lpop`、`rpop`

```java
String element1 = jedis.lpop("mylist");
String element1 = jedis.rpop("mylist");
```

### set

- 存储：`sadd`

```java
jedis.sadd("myset","a","b","c");
```

- 范围获取：`smembers`

```java
Set<String> myset = jedis.smembers("myset");
```

### sortedset

- 存储：`zadd`

```java
jedis.zadd("mysortedset", 3, "apple");
jedis.zadd("mysortedset", 30, "orange");
jedis.zadd("mysortedset", 55, "lemon");
```

- 范围获取：`zrange`

```java
Set<String> mysortedset = jedis.zrange("mysortedset", 0, -1);
```

## Jedis 连接池

1. 创建`JedisPool`连接池对象
2. 调用`getSource()`方法获取 Jedis 连接

```java
// 创建JedisPool配置对象
JedisPoolConfig config = new JedisPoolConfig();
config.setMaxTotal(50); // 最大活动对象数  
config.setMaxIdle(10); // 最大能够保持idel状态的对象数

// 创建Jedis连接池对象
JedisPool jedisPool = new JedisPool(config, "localhost", 6379);

// 获取连接
Jedis jedis = jedisPool.getResource();

// 具体操作
jedis.set("username", "zhangsan");

// 关闭，归还到连接池
jedis.close();
```

## 连接池工具类

- 将连接池配置、创建连接池对象等功能封装到连接池工具类中

```java
public class JedisPoolUtils {
    private static JedisPool jedisPool;
    
    static {
        // 读取配置文件
        InputStream is = JedisPoolUtils.class.getClassLoader.getResourceAsStream("jedis.properties");
        // 创建 Properties 对象
        Properties pro = new Properties();
        // 关联文件
        try {
            pro.load(is);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 获取数据, 设置到JedisPoolConfig中
        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxTotal(Integer.parseInt(pro.getProperty("redis.pool.maxTotal")));
        config.setMaxIdel(Integer.parseInt(pro.getProperty("redis.pool.maxIdle")));
        // 初始化JedisPool
        jedisPool = new JedisPool(config, pro.getProperty("redis.ip"), Integer.parseInt(pro.getProperty("port")));
    }
    
    /*获取连接的方法*/
    public static Jedis getJedis() {
        return jedisPool.getResource();
    }
}
```

- JedisPool 的详细配置`jedis.properties`

```properties
#最大活动对象数     
redis.pool.maxTotal=1000    
#最大能够保持idel状态的对象数      
redis.pool.maxIdle=100  
#最小能够保持idel状态的对象数   
redis.pool.minIdle=50    
#当池内没有返回对象时，最大等待时间    
redis.pool.maxWaitMillis=10000    
#当调用borrow Object方法时，是否进行有效性检查    
redis.pool.testOnBorrow=true    
#当调用return Object方法时，是否进行有效性检查    
redis.pool.testOnReturn=true  
#“空闲链接”检测线程，检测的周期，毫秒数。如果为负值，表示不运行“检测线程”。默认为-1.  
redis.pool.timeBetweenEvictionRunsMillis=30000  
#向调用者输出“链接”对象时，是否检测它的空闲超时；  
redis.pool.testWhileIdle=true  
# 对于“空闲链接”检测线程而言，每次检测的链接资源的个数。默认为3.  
redis.pool.numTestsPerEvictionRun=50  
#redis服务器的IP    
redis.ip=127.0.0.1
#redis服务器的Port    
redis1.port=6379   
```

