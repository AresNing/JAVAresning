> [Lombok使用指南 - CSDN博客](https://blog.csdn.net/weixin_39958911/article/details/110212628)

# Lombok 简介

- Lombok 是一款 Java 开发插件，开发者可通过其定义的一些注解来消除业务工程中冗长和繁琐的代码，尤其对于简单的 Java 模型对象（POJO）
- 对于这些方法，Lombok 能够在编译源代码期间自动生成这些方法，但并不会像反射那样降低程序的性能



# 使用步骤

1. IDEA 安装 Lombok 插件（防止报错）
2. 添加 maven 依赖

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

3. 创建一个实体类（演示`@Data`注解）

```java
import lombok.Data;

@Data
public class MyBean {
    private int id;
    private String name;
    private String password;
}
```

4. 测试

```java
public class MyBeanTest {
    public static void main(String[] args) {
        MyBean bean = new MyBean();
        bean.setId(1);
        bean.setName("zhangsan");
        bean.setPassword("123");
        System.out.println(bean);
    }
}
```

# 常用注解

- `@Data`：注解在类上，注解在类上，相当于同时使用了`@ToString`、`@EqualsAndHashCode`、`@Getter`、`@Setter`和`@RequiredArgsConstrutor`这些注解，对于 POJO 类十分有用
- `@AllArgsConstructor`：注在类上，提供类的全参构造
- `@NoArgsConstructor`：注在类上，提供类的无参构造
- `@Setter`：注在属性上，提供`set`方法
- `@Getter`：注在属性上，提供`get`方法
- `@EqualsAndHashCode`：注在类上，提供对应的`equals`和`hashCode`方法
- `@Slf4j`/`@Log4j`  : 注解在类上, 为类提供一个属性名为`log`的`log4j`的日志对象