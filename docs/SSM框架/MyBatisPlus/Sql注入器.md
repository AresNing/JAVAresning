- 在 MP 中，通过`AbstractSqlInjector`将`BaseMapper`中的方法注入到 MyBatis 容器，这些方法才可以正常执行
- 以扩展`findAll`方法为例，讲解如何扩充`BaseMapper`中的方法

# 编写 MyBaseMapper

- 编写`MyBaseMapper`，继承`BaseMapper`

```java
public interface MyBaseMapper<T> extends BaseMapper<T> {
    List<T>  findAll();
}
```

- 其他的`Mapper`都可以继承`MyBaseMapper`，实现统一的扩展

```java
public interface UserMapper extends MyBaseMapper<User> {
    User findById(Long id);
}
```

# 编写 MySqlInjector

- 如果直接继承`AbstractSqlInjector`，`BaseMapper`中原有的方法将失效，所以选择继承`DefaultSqlInjector`进行扩展

```java
public class MySqlInjector extends DefaultSqlInjector {
    @Override
    public List<AbstractMethod> getMethodList() {
        List<AbstractMethod> methodList = super.getMethodList();
        // 扩充自定义的方法
        methodList.add(new FindAll());
        return methodList;
    }
}
```

# 编写 FindAll

- **注意：`FIndAll`类与`MySqlInjector`类处于同一级目录下**

```java
public class FindAll extends AbstractMethod {
    @Override
    public MappedStatement injectMappedStatement(Class<?> mapperClass, Class<?> 
modelClass, TableInfo tableInfo) {
        String sqlMethod = "findAll";
        String sql = "select * from " + tableInfo.getTableName();
        SqlSource sqlSource = languageDriver.createSqlSource(configuration, sql, 
modelClass);
        return this.addSelectMappedStatement(mapperClass, sqlMethod, sqlSource, 
modelClass, tableInfo);
    }
}
```

# 注册到 Spring 容器

```java
/**
 * 自定义SQL注入器
 */
@Bean
public MySqlInjector mySqlInjector(){
    return new MySqlInjector();
}
```

# 测试

```java
private UserMapper userMapper;
@Test
public void testFindAll(){
    List<User> users = this.userMapper.findAll();
    for (User user : users) {
        System.out.println(user);
    }
}
```
