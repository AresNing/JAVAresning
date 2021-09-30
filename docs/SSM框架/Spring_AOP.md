# Spring 的 AOP 简介

## AOP 介绍

- AOP（Aspect Oriented Programming）：面向切面编程，是通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术
- AOP 是 OOP 的延续，利用 AOP 可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低
- 作用：在程序运行期间，在不修改源码的情况下对方法进行功能增强
- 优势：减少重复代码，提高开发效率，并且便于维护

## AOP 的底层实现

- AOP 的底层是通过 Spring 提供的动态代理技术实现的
- **在运行期间，Spring 通过动态代理技术动态的生成代理对象**，代理对象方法执行时进行增强功能的介入，再去调用目标对象的方法，从而完成功能的增强

## AOP 的动态代理技术

- **JDK 代理**：**基于接口**的动态代理技术
- **Cglib 代理**：**基于父类**的动态代理技术

![动态代理技术](pics/image-20210930170802580.png)

## JDK 的动态代理

- 目标类接口

```java
public interface TargetInterface {
    public void method();
}
```

- 目标类

```java
public class Target implements TargetInterface {
    @Override
    public void method() {
        ... // 目标方法的具体实现
    }
}
```

- 动态代理代码

```java
// 创建目标对象
Target target = new Target();
// 创建代理对象
TargetInterface proxy = (TargetInterface) Proxy.newProxyInstance(
    target.getClass().getClassLoader(),
    target.getClass().getInterfaces(),
    new InvocationHandler() {
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            ... // 前置增强代码
            Object invoke = method.invoke(target, args);
            ... // 后置增强代码
            return invoke;    
        }
    }
)
```

- 调用代理对象的方法测试

```java
// 测试，当调用接口的任何方法时，代理对象的代码都无需修改
proxy.method();
```

## Cglib 的动态代理

> Spring 框架吸收了 Cglib 包，因此无需额外代入 Cglib 包

- 目标类

```java
public class Target implements TargetInterface {
    @Override
    public void method() {
        ... // 目标方法的具体实现
    }
}
```

- 动态代理代码

```java
Target 
```

















