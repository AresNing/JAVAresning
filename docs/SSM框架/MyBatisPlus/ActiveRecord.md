# ActiveRecord 的主要思想

- **每一个数据库表对应创建一个类，类的每一个对象实例对应于数据库中表的一行记录；通常表的每个字段在类中都有相应的 Field**
- ActiveRecord 同时**负责把自己持久化**，在 ActiveRecord 中封装了对数据库的访问，即 **CURD**；
- ActiveRecord 是一种领域模型（Domain Model），封装了部分业务逻辑

# 开启 ActiveRecord 

- 在 MP 中，开启 ActiveRecord 只需要将**实体对象继承`Model`即可**
- **开启后，实体对象具备`Model`所有方法（CRUD），而无需通过`Mapper`来 CRUD**

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User extends Model<User> {
    //...
}
```

# 根据主键查询

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserMapperTest {
    @Test
    public void testAR() {
        User user = new User();
        user.setId(2L);
        User user2 = user.selectById(); // 无需通过 userMapper
        System.out.println(user2);
    }
}
```

# 新增数据

```java
@Test
public void testAR() {
    User user = new User();
    user.setName("刘备");
    user.setAge(30);
    user.setPassword("123456");
    user.setUserName("liubei");
    user.setEmail("liubei@njk.com");
    boolean insert = user.insert(); // 无需通过 userMapper
    System.out.println(insert);
}
```

# 更新操作

```java
@Test
public void testAR() {
    User user = new User();
    user.setId(8L);
    user.setAge(35);
    boolean update = user.updateById(); // 无需通过 userMapper
    System.out.println(update);
}
```

# 删除操作

```java
@Test
public void testAR() {
    User user = new User();
    user.setId(8L);
    boolean delete = user.deleteById(); // 无需通过 userMapper
    System.out.println(delete);
}
```

# 根据条件查询

```java
@Test
public void testAR() {
    User user = new User();
    QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
    userQueryWrapper.le("age","20");
    List<User> users = user.selectList(userQueryWrapper); // 无需通过 userMapper
    for (User user1 : users) {
        System.out.println(user1);
    }
}
```