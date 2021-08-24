# Spring 程序开发基本步骤

## 导入 Spring 开发的基本包坐标

```xml
<properties>
	<spring.version>5.0.5.RELEASE</spring.version>
</properties>

<dependencies>
    <!--导入spring的context坐标, context依赖core、beans、expression-->
	<dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>${spring.version}</version>
    </dependency>
</dependencies>
```

## 编写 Dao 接口和实现类

```java
public interface UserDao {
    public void method();
}
```

```java
public class UserDaoImpl implements UserDao {
    @Override
    public void method() {...}
}
```

## 创建 Spring 核心配置文件

- 在类路径下（**resources**）创建`applicationContext.xml`配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
			http://www.springframework.org/schema/beans 
			http://www.springframework.org/schema/beans/spring-beans.xsd">
</beans>
```

## 在 Spring 配置文件中配置 UserDaoImpl

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
			http://www.springframework.org/schema/beans 
			http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="userDao" class="xxx.xxx.dao.impl.UserDaoImpl(即全类名)"></bean>
</beans>
```

## 使用 Spring 的 API 获得 Bean 实例

```java
@Test
public void test() {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserDao userDao = (UserDao) applicationContext.getBean("userDao"); 
    // getBean方法的返回类型W为Object, 故需要强制转换; 
    // getBean方法的参数为Spring配置文件中的bean id
}
```

# Spring 配置文件

![Spring的重点配置](pics/image-20210824103522304.png)

## Bean 标签基本配置

- 用于配置对象交由 Spring 来创建
- 默认情况下它调用的是**类中的无参构造器**，如果没有无参构造器则不能创建成功
- `id`：Bean 实例在 Spring 容器中的唯一标识
- `class`：Bean 的全限定名称/全类名

## Bean 标签范围配置

- `scope`：指对象的作用范围，取值如下：
  - `singleton`：默认值，单例的
  - `prototype`：多例的
- 当`scope`的取值为`singleton`时
  - Bean 的实例化个数：1个
  - Bean 的实例化时机：当 Spring 核心文件被加载时，实例化 Bean
  - Bean 的生命周期
    - **对象创建：当应用加载，创建容器时，对象就被创建了**
    - **对象运行：只要容器在，对象一直活着**
    - **对象销毁：当应用卸载，销毁容器时，对象就被销毁了**
- 当`scope`的取值为`prototype`时
  - Bean 的实例化个数：多个
  - Bean 的实例化时机：当调用`getBean()`方法时实例化 Bean
  - Bean 的生命周期
    - **对象创建：当使用对象时，创建新的对象实例**
    - **对象运行：只要对象在使用中，就一直活着**
    - **对象销毁：当对象长时间不用时，被 Java 的垃圾回收器GC回收了**

## Bean 生命周期配置

- `init-method`：指定类中的初始化方法名称，实例化 Bean 之后调用该方法
- `destroy-method`：指定类中销毁方法名称，销毁 Bean 之前调用该方法

## 引入其他配置文件

- Spring 主配置文件通过`<import>`标签进行加载其他配置文件，分模块开发

  ```xml
  <import resource="applicationContext-xxx.xml"/>
  ```

# Bean 实例化的三种方式

## 无参构造方法实例化

- 根据**默认无参构造方法**来创建类对象，如果 bean 中没有默认无参构造函数，将会创建失败

```xml
<bean id="userDao" class="com.itheima.dao.impl.UserDaoImpl"/>
```

## 工厂静态方法实例化

- 工厂的静态方法返回 Bean 实例

```java
public class StaticFactoryBean {
    public static UserDao createUserDao() {
        return new UserDaoImpl();
    }
}
```

```xml
<bean id="userDao" class="xxx.xxx.factory.StaticFactoryBean" 
factory-method="createUserDao" />
```

## 工厂实例方法实例化

- 工厂的非静态方法返回 Bean 实例

```java
public class DynamicFatoryBean {
    public UserDao createUserDao() {
        return new UserDaoImpl();
    }
}
```

```xml
<bean id="factoryBean" class="xxx.xxx.factory.DynamicFatoryBean"/>
<bean id="userDao" factory-bean="factoryBean" factory-method="createUserDao"/>
```

# Bean 的依赖注入

- 依赖注入（Dependency Injection），Spring 框架核心 IOC（Inverse Of Control，控制反转） 的具体实现
- 在编写程序时，通过控制反转，把对象的创建交给了 Spring，IOC 解耦只是降低他们（业务层和持久层）的依赖关系
- 业务层和持久层的依赖关系让 Spring 来维护，坐等框架把持久层对象传入业务层，而不用自己去获取

## Bean 的依赖注入方式

### set 方法注入

- 在`UserServiceImpl`中添加`setUserDao`方法

  ```java
  public class UserServiceImpl implements UserService {
      // 定义userDao对象
      private UserDao userDao;
      public void setUserDao(UserDao userDao) {
          this.userDao = userDao;
      }
      @Override
      public void method() {
          userDao.method();
      }
  }
  ```

- 配置 Spring 容器调用`set`方法进行注入

  ```xml
  <bean id="userDao" class="xxx.xxx.dao.impl.UserDaoImpl"/>
  
  <!-- name 指的是UserServiceImpl定义的userDao对象 -->
  <!-- ref 指的是配置文件定义的bean id -->
  <bean id="userService" class="xxx.xxx.service.impl.UserServiceImpl">
      <property name="userDao" ref="userDao"/>
  </bean>
  ```

- **P 命名空间注入**本质也是`set`方法注入，具体做法如下：先引入 P 命名空间，再修改注入方式

  ```xml
  xmlns:p="http://www.springframework.org/schema/p"
  ```

  ```xml
  <bean id="userService" class="xxx.xxx.service.impl.UserServiceImpl" p:userDao-
  ref="userDao"/>
  ```

### 构造方法注入

- 创建有参构造

  ```java
  public class UserServiceImpl implements UserService {
      @Override
      public void method() {
          ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
          UserDao userDao = (UserDao) applicationContext.getBean("userDao");
          userDao.method();
      }
  }
  ```

- 配置 Spring 容器调用有参构造时进行注入

  ```xml
  <bean id="userDao" class="xxx.xxx.dao.impl.UserDaoImpl"/>
  <bean id="userService" class="xxx.xxx.service.impl.UserServiceImpl">
      <constructor-arg name="userDao" ref="userDao"></constructor-arg>
  </bean>
  ```

## Bean 的依赖注入的数据类型

以`set`方法注入为例，在`<bean>`标签下添加`<property>`标签，进行注入

- 普通数据类型
- 引用数据类型
- 集合数据类型：`List`、`Map`、`Properties`等

# Spring 相关 API

## ApplicationContext 的继承体系

- 接口类型，代表应用上下文，可以通过其实例获得 Spring 容器中的 Bean 对象

![ApplicationContext继承体系](pics/image-20210824103603150.png)

## ApplicationContext 的实现类

- `ClassPathXmlApplicationContext`：从类的根路径下加载配置文件**（推荐使用）**
- `FileSystemXmlApplicationContext`：从磁盘路径上加载配置文件，配置文件可以在磁盘的任意位置
- `AnnotationConfigApplicationContext`：当使用注解配置容器对象时，需要使用此类来创建 spring 容器，它用来读取注解

## getBean() 方法使用

- `getBean(String name)`：参数的数据类型是字符串，根据 Bean 的`id`从容器中获得 Bean 实例，返回是`Object`，需要强转
- `getBean(Class<T> requiredType)`：参数的数据类型是Class类型，根据类型从容器中匹配 Bean 实例，**当容器中相同类型的 Bean 有多个时，此方法会报错**
  - `UserService userService = applicationContext.getBean(UserService.class);`

































