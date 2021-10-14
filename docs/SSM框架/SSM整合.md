# Spring 整合 MyBatis

## 整合思路

- **将`SqlSessionFactory`交给 Spring 容器管理，从容器中获得执行操作的`Mapper`实例即可**
- **将事务控制交给 Spring 容器进行声明式事务控制**

## 将 SqlSessionFactory 配置到 Spring 容器中

- 导入`mybatis-spring`包

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>1.3.1</version>
</dependency>
```

- 在`applicationContext.xml`中配置数据源和`SqlSessionFactory`

```xml
<!--加载properties文件-->
<context:property-placeholder location="classpath:jdbc.properties"/>

<!--配置数据源信息-->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.driver}"/>
    <property name="jdbcUrl" value="${jdbc.url}"/>
    <property name="user" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>
<!--配置sessionFactory-->
<!--配置MyBatis的SqlSessionFactory-->
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <!--加载mybatis核心文件-->
    <property name="configLocation" value="classpath:sqlMapConfig-spring.xml"/>
</bean>
```

## 扫描 Mapper，让 Spring 容器产生 Mapper 实现类

- 在`applicationContext.xml`中扫描`mapper`所在的包

```xml
<!--扫描mapper所在的包，为mapper接口创建实现类-->
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="com.njk.mapper"></property>
</bean>
```

## 配置声明式事务控制

- 在`applicationContext.xml`中配置声明式事务控制

```xml
<!--声明式事务控制-->
<!--配置平台事务管理器-->
<bean id="transactionManger" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"></property>
</bean>

<!--事务增强配置-->
<tx:advice id="txAdvice" transaction-manager="transactionManger">
    <tx:attributes>
        <tx:method name="*"/>
    </tx:attributes>
</tx:advice>

<!--配置事务的aop织入-->
<aop:config>
    <aop:pointcut id="txPointcut" expression="execution(* com.njk.service.impl.*.*(..))"/>
    <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointcut"/>
</aop:config>
```

## 修改 Service 实现类代码

- 从 Spring 容器中注入`AccountMapper`接口的实现对象，并调用该对象的方法

```java
@Service("accountService")
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountMapper accountMapper;
    
    public void save(Account account) {
        accountMapper.save(account);
    }
    public List<Account> findAll() {
        return accountMapper.findAll();
    }
}
```