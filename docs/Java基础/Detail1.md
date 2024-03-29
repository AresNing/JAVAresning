# 类与对象

- 类：自定义的数据类型
  - 类包括**属性/成员变量**，**行为/成员方法**，**代码块**，**构造器**，**内部类**

  ```java
  package 包名;
  class 类名 {
      成员变量/属性;
      {}; // 代码块
      构造器;
      成员方法;
      class 内部类名 {
      }
  }
  ```

- 对象：类的具体实例
  - 从**类**到**对象**，有几种说法：创建一个对象；实例化一个对象；把类实例化...

## 对象的内存形式

**注意：**

- Java6和6之前，常量池是存放在方法区（永久代）中的
- Java7，将常量池是存放到了堆中
- **Java8之后**，取消了整个永久代区域，取而代之的是元空间；**运行时常量池和静态常量池存放在元空间中，而字符串常量池依然存放在堆中**

![对象的内存形式](pics/image-20210526133238638.png)

## 属性 / 成员变量 / 字段field

- 属性一般是基本数据类型，也可以是引用类型（对象，数组）
- 属性的定义语法同变量，利用**修饰符**控制属性的访问范围（`public`，`protected`，默认，`private`）
- 属性如果不赋值，有默认值，规则同数组

### 属性与成员变量/字段的区别

- 成员变量/字段（field）用于类内部，不会生成`set`和`get`方法，所以外界无法与成员变量接触，类私有变量
- 属性（property）产生了`set` 和`get`方法，允许让其他对象访问到该变量，与其他对象交互的变量

## 对象的创建

```java
// 第一种(直接创建)：类名 对象名 = new 类名(); 
ClassName objectName = new ClassName();

// 第二种(先声明再创建)：类名 对象名; 对象名 = new 类名(); 
ClassName objectName;
objectName = new ClassName();
```

## 类和对象的内存分配机制

- java内存的结构分析
  - 栈：一般存放基本数据类型（局部变量）
  - 堆：存放对象（类的对象，数据等）和字符串常量
  - 方法区/元空间：常量池，类加载信息

## 成员方法/方法

- 方法：对象可以执行的动作
- 好处
  - 提高代码的复用性
  - 可以将实现的细节封装起来，然后供其他用户来调用即可

## 成员方法的调用机制原理

![方法的调用机制原理](pics/image-20210526153919347.png)

- 当程序运行到方法时，就会开辟一个独立的空间（栈空间）

## 成员方法的定义

```java
/*访问修饰符 返回数据类型 方法名(形参列表) {
	语句；
 	return 返回值；
 }
 */
```

- 形参列表：表示成员方法输入
- 返回数据类型：表示成员方法输出, `void`表示没有返回值
- 方法主体：表示为了实现某一功能代码块
- `return`语句不是必须的
- 访问修饰符：作用是控制方法使用的范围（`public`，`protected`，默认，`private`）

## 成员方法的注意事项

- 方法里**不能嵌套**另一个方法的**定义**，可以**调用**别的方法
  - 方法调用细节
    - 同一个类中的方法调用：直接调用即可，`method.()`
    - 跨类中的方法调用：需要先创建对象，再通过对象名调用，（还与访问修饰符有关）
      `ClassName objectName = new ClassName(); objectName.method()`
- 一个方法最多有一个返回值；若需返回**多个结果**，返回**数组**
- 返回类型可以为任意类型，包含基本类型或引用类型(数组，对象)
- 方法名遵循驼峰命名法

## 成员方法传参机制

- 基本数据类型的传参：传递的是值（值拷贝），形参的任何改变不影响实参（独立内存空间）
- 引用数据类型（数组，对象）的传参：传递的是地址，可以通过形参影响实参（地址指向相同内存空间）
- 成员方法返回类型是引用类型时，注意其对应的内存空间

## 方法递归调用

![方法递归调用](pics/image-20210526191012084.png)

- 要点：找准递归结束条件
- 实例：斐波那契数列，吃桃子问题，迷宫问题（递归回溯），汉诺塔问题，八皇后问题（递归回溯）

## 方法重载（OverLoad）

- java中允许同一个类中，多个同名方法的存在，但要求形参列表不一致
- 方法名：必须相同
- 形参列表：必须不同（形参类型或个数或顺序，至少一样不同，参数名无要求）
- 返回类型：无要求

## 可变参数

- java允许将同一个类中多个同名同功能但参数个数不同的方法，封装成一个方法，就可以通过可变参数实现
- 基本语法


  ```java
  //访问修饰符 返回类型 方法名(数据类型... 形参名) {
  //}
  //求和n个数，n个数存放在nums数组
  public int sum(int... nums) {
      int res = 0;
      for(int i = 0; i < nums.length; i++) {
          res += nums[i];
      }
      return res;
  }
  ```

- 可变参数的本质就是数组
- 可变参数的实参可以为0个或任意多个
- 可变参数可与不同类型的参数一起放在形参列表，但可变参数必须在最后
- 一个形参列表中只能出现一个可变参数

# 作用域

## 基本使用

- java中，主要的变量是属性/成员变量/全局变量和局部变量
- 局部变量一般是指在成员方法中定义的变量
- java中作用域的分类
  - 全局变量/属性：作用域为整个类体，或被其他类使用（通过对象调用）
  - 局部变量：就是除了属性外的其他变量，作用域为定义它的代码块中
- 全局变量/属性可以不赋值，直接使用，因为有默认值；局部变量必须赋值后才能使用，因为没有默认值

## 作用域的注意事项

- 属性和局部变量可以重名（因为不在同一个作用域），访问时遵循就近原则
- 在同一个作用域中，比如在同一个成员方法中，两个局部变量，不能重名
- 属性的生命周期较长，伴随着对象的创建/销毁而创建/销毁；
  局部变量的生命周期较短，伴随着代码块的执行/结束而创建/销毁，即再一次方法调用中
- 全局变量/属性可以加修饰符；
  局部变量不可以加修饰符

# 构造方法/构造器constructor

- 作用：创建对象时，就直接赋值对象的属性（完成对象的初始化）

## 基本语法

**与成员方法类似**


```java
/*访问修饰符 方法名(形参列表) {
	方法体;
 }
 */
```

- 构造器的修饰符：`默认,public,protected,privated`
- **构造器没有返回值**
- **构造器的方法名与类名一致**
- 参数列表和成员方法一样的规则
- 构造器的调用由系统执行

## 构造器的注意事项

- 一个类可以定义多个不同的构造器，即构造器重载
- **构造器没有返回值**
- **构造器的方法名与类名一致**
- 构造器是完成对象的初始化，并不是创建对象
- 如果没有定义构造器，系统会自动给类生成一个默认无参构造器（也叫默认构造器），可以使用`javap`反编译指令进行查看


  ```java
  class ClassName {
      /*
      默认构造器
      ClassName() {
      }
      */
  }
  ```

- **一旦自定义了构造器，默认构造器就被覆盖了（无法再使用默认构造器），除非显式的定义它，即`ClassName() {}`**(相当于构造器重载)

# 对象创建的流程分析

## 流程分析

![流程分析](pics/image-20210527160742154.png)

1. 在方法区/元空间里加载类信息，只会加载一次
2. 在堆中分配空间（地址）
3. 完成对象初始化：默认初始化 -> 显式初始化 -> 构造器的初始化
4. 在对象在堆中的地址，返回给创建的对象

![流程分析](pics/image-20210527160815545.png)

# this 关键字

## 基本介绍

- jvm会给每个对象分配`this`，`this`代表当前对象，`this.objectName`代表当前对象的属性；哪个对象被调用，`this`就代表哪个对象
- 用处：`this`用于区分当前类的属性和局部变量
- 举例：构造器的形参能够直接写成属性名（并将形参赋值给`this.objectName`），解决了作用域的问题

## hashCode() 方法

- 使用`hashCode()`，以hashCode的十进制为格式返回对象的地址

## this 关键字的注意事项

- `this`关键字可以用来访问本类的**属性**、**方法**、**构造器**
- **访问成员方法**的语法：`this.methodName(parametersList);`
- **访问构造器**的语法：`this(parametersList);`（**只能在构造器中使用，即只能在构造器中访问其他构造器，并且对`this`的调用必须是构造器中的第一个语句**）
- `this`不能在类定义的外部使用，只能在类定义的方法中使用

# 包

## 作用

- 区分相同名字的类
- 当类很多时，可以很多的管理类
- 控制访问范围

## 基本语法

```java
package com.companyname;
// package 关键字,表示打包
//com.companyname 表示包名(com是company的缩写)
```

## 包的本质

- 包的本质：实际上就是创建不同的文件夹/目录保存类文件

## 包的命名

- 命名规则
  - 只能包含数字、字幕、下划线、小圆点
  - 不能用数字开头，不能是关键字或保留字
- 命名规范
  - 一般是小写字母+小圆点
  - 一般是`com.公司名.项目名.业务模块名`

```java
// 举例
com.sina.crm.user //用户模块
com.sina.crm.utils //订单模块
```

## 包的引入

```java
// 举例
import java.util.Scanner; // 只是引入一个类Scanner
import java.util.*; // 表示将java.util包的所有类都引入
```

- 需要使用哪个类，就导入哪个类即可，不建议使用`*`导入

## 包的注意事项

- `package`的作用是声明当前类所在的包，需要放在类的最上面，一个类中最多一句`package`
- `import`指令需放在`package`的下面，在类定义前面，`import`指令可以有多句且没有顺序要求

# 访问修饰符

| 访问级别 | 访问控制修饰符 | 同类               | 同包               | 子类               | 不同包             |
| -------- | -------------- | ------------------ | ------------------ | ------------------ | ------------------ |
| 公开     | `public`       | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| 受保护   | `protected`    | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :x:                |
| 默认     | 没有修饰符     | :heavy_check_mark: | :heavy_check_mark: | :x:                | :x:                |
| 私有     | `private`      | :heavy_check_mark: | :x:                | :x:                | :x:                |

## 访问修饰符的注意事项

- 修饰符可以用来修饰类中的**属性**，**成员方法**以及**类**
- **只有默认的和`public`才能修饰类**

# 封装encapsulation

## 作用

- 隐藏实现细节：方法（连接数据库）<-- 调用（传入参数）
- 可以对数据进行验证，保证安全合理

## 封装的实现步骤（三步）

1. 将属性私有化`private`（不能直接修改属性）
2. 提供一个公共的`(public)set`方法，用于对属性判断并赋值

```java
public void setXxx(类型 参数名) { // Xxx表示某个属性
// 加入数据验证的业务逻辑
属性 = 参数名；
}
```

3. 提供一个公共的`(public)get`方法，用于获取属性的值

```java
public 数据类型 getXxx() { // Xxx表示某个属性
// 加入权限判断的业务逻辑
return xx；
}
```

## 构造器与 setXxx 结合

- 举例

```java
//有三个属性的构造器
public Person(String name, int age, double salary) {
// this.name = name;
// this.age = age;
// this.salary = salary;
//我们可以将 set 方法写在构造器中，这样仍然可以验证
setName(name);
setAge(age);
setSalary(salary);
}
```

# 继承

## 作用

- 继承可以解决代码复用
- 当多个类存在相同的属性（变量）和方法时，可以从这些类中抽象出父类，在父类中定义这些相同的属性和方法，所有的子类不需要重新定义这些属性和方法，只需要通过 `extends`来声明继承父类即可

![继承](pics/image-20210529142937477.png)

## 继承的基本语法

```java
class 子类 extends 父类{
    
}
```

- 子类`subclass`自动拥有父类`superclass`定义的属性和方法
- 父类`superclass`又叫超类、基类
- 子类`subclass`又叫派生类

## 继承的注意事项

1. 子类继承了父类的所有属性和方法，非私有的属性和方法可以在子类直接访问，但是私有属性和方法不能在子类直接访问，要通过父类提供公共的方法去访问（`getXXX()`）
2. 子类必须调用父类的构造器，完成父类的初始化（可以理解为，只有先创建了父类的对象，子类的对象才能被创建，所以会调用父类的构造器）
3. 当创建子类对象时，不管使用子类的哪个构造器，默认情况下总会去调用父类的无参构造器，因为子类的构造器中默认包含`super()`语句；如果父类没有提供无参构造器，则必须在子类的构造器中用` super` 去指定使用父类的哪个构造器完成对父类的初始化工作，否则，编译不会通过
4. 如果希望指定去调用父类的某个构造器，则显式的调用一下 : `super(参数列表)`
5. `super`在使用时，必须放在构造器第一行(`super`只能在构造器中使用)
6. `super() `和 `this() `都只能放在构造器第一行，因此这两个方法不能共存在一个构造器
7. java 所有类都是 `Object `类的子类，`Object `是所有类的基类
8. 父类构造器的调用不限于直接父类！将一直往上追溯直到 `Object`类（顶级父类）
9. **子类最多只能继承一个父类（指直接继承），即 java 中是单继承机制**
    - 思考：如何让 A 类继承 B 类和 C 类？ 【A 继承 B， B 继承 C】
10. 不能滥用继承，子类和父类之间必须满足`is-a`的逻辑关系（从属关系）

## 继承的本质

**当子类继承父类，创建子类对象时，内存中的变化：**

1. 首先看子类是否有该属性
2. 如果子类有该属性，而且可以访问，则返回信息
3. 如果子类没有该属性，则看父类是否有该属性（如果父类有该属性，而且可以访问，则返回信息）
4. 如果父类没有该属性，则按3.的规则，继续找上级父类，直到`Object`

![继承的本质](pics/image-20210530103536271.png)

# super 关键字

## 基本介绍

- `super`代表父类的引用，用于访问父类的属性、方法、构造器

## 基本语法

- 访问父类的属性，但不能访问父类的`pravite`属性

```java
super.objectName;
```

- 访问父类的方法，但不能访问父类的`pravite`方法

```java
super.methodName(parameterList);
```

- 访问父类的构造器

```java
super(parameterList); // 只能放在构造器的第一句，且只能出现一句
```

## super 的注意事项

- 当子类中有和父类中的成员（属性和方法）重名时，为了访问父类的成，员（属性和方法）必须通过`super`；如果没有重名，使用`super`、`this`、直接访问是一样的效果
- `super`的访问不限于直接父类，如果爷爷类和本类中有同名的成员，也可以使用`super`去访问爷爷类的成员
- 如果多个基类（上级类）中都有同名的成员，使用`super`访问遵循就近原则

## super 和 this 的比较

|      | 区别点     | `this`                                                 | `super`                                  |
| ---- | ---------- | ------------------------------------------------------ | ---------------------------------------- |
| 1    | 访问属性   | 访问本类中的属性，如果本类没有该属性则从父类中继续查找 | 从父类开始查找属性                       |
| 2    | 调用方法   | 访问本类中的方法，如果本类没有该方法则从父类中继续查找 | 从父类开始查找方法                       |
| 3    | 调用构造器 | 调用本类构造器，必须放在构造器的首行                   | 调用父类构造器，必须放在子类构造器的首行 |
| 4    | 特殊       | 表示当前对象                                           | 子类中访问父类的对象                     |

# 方法重写/覆盖（Override）

## 基本介绍

- 子类有一个方法，与**父类**的某个方法的**名称**、**形参列表**、**返回类型**一样，那么我们就说子类的这个方法覆盖父类的方法

## Override 的注意事项

- 子类的方法的形参列表、方法名称，要和父类的形参列表、方法名称完全一样
- 子类的方法的返回类型和父类的返回类型一样，或者是父类返回方式的子类
  - 比如，父类方法的返回类型是`Object`，子类方法的返回类型是`String`
- 子类方法不能缩小父类方法的访问权限（`public` > `protected` > 默认 > `private`）

## Override vs Overload

| 名称                 | 发生范围 | 方法名   | 形参列表                         | 返回类型                                                     | 修饰符                             |
| -------------------- | -------- | -------- | -------------------------------- | ------------------------------------------------------------ | ---------------------------------- |
| 方法重载（Overload） | 本类     | 必须一样 | 类型，个数或者顺序至少有一个不同 | 无要求                                                       | 无要求                             |
| 方法重写（Override） | 父子类   | 必须一样 | 相同                             | 子类重写的方法，返回类型和父类方法的返回类型一致，或者是其子类 | 子类方法不能缩小父类方法的访问范围 |

# 多态

## 基本介绍

- 多态（多种形态）：方法或对象具有多种形态，面向对象的第三大特征，多态是建立在封装和继承的基础之上的

## 方法的多态

- 方法重写（Override）
- 方法重载（Overload）

## 对象的多态

- 对象的编译类型和运行类型可以不一致
- **编译类型**在定义对象时，就确定了，**不能改变**
- **运行类型**是**可以改变的**
- **编译类型看定义时`=`号的左边，运行类型看定义时`=`号的右边**

## 多态的注意事项

- 多态的前提：两个对象（类）存在继承关系
- 多态的**向上转型**
  1. 本质：父类的引用指向了子类的对象
  2. 语法：`父类类型 引用名 =  new 子类类型();`
  3. 特点：可以调用父类中的所有成员；不能调用子类中的特有成员
- 多态的**向下转型**
  1. 语法：`子类类型 引用名 = (子类类型) 父类引用名;`
  2. 只能强转父类的引用，不能强转父类的对象
  3. 要求父类的引用必须指向的是当前目标类型的对象
  4. 当向下转型后，可以调用子类中所有的成员
- 属性没有重写之说，属性的值看编译类型；方法看运行类型，因为方法有重写

## instanceOf 比较操作符

- 用于判断对象的运行类型是否为XX类型或XX类型的子类型

## java的动态绑定机制

- 当调用对象方法时，**该方法会和该对象的内存地址/运行类型绑定**
- 当调用对象属性时，**没有动态绑定机制**，哪里声明，哪里使用

## 多态的应用

- 多态数组：数组的定义类型为父类类型，里面保存的实际元素类型为子类类型
- 多态参数：方法定义的形参类型为父类类型，实参允许为子类类型

# Object 类详解

## equals 方法

1. `==`和`equals`的对比
   - `==`是一个比较运算符
     - `==`既可以判断基本类型，也可以判断引用类型
     - `==`判断基本类型，判断的是值是否相等
     - `==`判断引用类型，判断的是地址是否相等
   - `equals`是`Object`类中的方法
     - `equals`只能判断引用类型
     - 默认判断的是地址是否相等，子类中往往重写`equals`方法，用于判断内容是否相等（比如`Integer`和`String`的`equals`源代码）
2. 重写`equals`方法
3. 把**常量放在`equals()`方法的前面**，可以**避免空指针异常**

```java
常量.equals(变量); // 适合已知其中一个比较对象为常量的情况
```

4. **为避免空指针异常，推荐使用`Objects.equals(Object a, Object b)`方法**
   - 源码分析

```java
public final class Objects {
    private Objects() {
        throw new AssertionError("No java.util.Objects instances for you!");
    }

    /**
     * Returns {@code true} if the arguments are equal to each other
     * and {@code false} otherwise.
     * Consequently, if both arguments are {@code null}, {@code true}
     * is returned and if exactly one argument is {@code null}, {@code
     * false} is returned.  Otherwise, equality is determined by using
     * the {@link Object#equals equals} method of the first
     * argument.
     *
     * @param a an object
     * @param b an object to be compared with {@code a} for equality
     * @return {@code true} if the arguments are equal to each other
     * and {@code false} otherwise
     * @see Object#equals(Object)
     */
    public static boolean equals(Object a, Object b) {
        return (a == b) || (a != null && a.equals(b));
    }
    ...
}
```

## hashCode 方法

- 使用`hashCode()`，以hashCode的十进制为格式返回对象的地址
- 提高具有哈希结构的容器的效率
- 两个引用，如果指向的是同一个对象，则哈希值肯定是一样的；两个引用，如果指向的是不同对象，则哈希值是不一样的
- 哈希值主要根据地址号来的，但不能完全将哈希值等价于地址
- 在集合中，会根据需要重写`hashCode()`

## toString 方法

- 默认返回：全类名 + @ + 哈希值的十六进制 （全类名 = 包名 + 类名）
- 子类往往会重写`toString`方法，打印对象或拼接对象时，都会自动调用该对象的`toString`形式
- 当直接输出一个对象时，`toString`方法会被默认的调用，比如 `System.out.println(monster);` 就会默认调用
  `monster.toString()`
- `toString`方法重写后，一般是把对象的属性值输出

## finalize方法

**面试重点，实际开发中几乎不会运用 finalize方法**

- 当**对象被回收**时，**系统自动调用该对象的`finalize`方法**，子类可以重写该方法，做一些释放资源的操作
- 对象何时会被回收：当某个**对象没有任何引用**时，则 jvm 就认为这个对象是一个垃圾对象，就会使用**垃圾回收机制来销毁该对象**，在**销毁该对象前**，会**先调用`finalize`方法**
- 垃圾回收机制的调用，是由系统来决定（即有自己的 GC 算法）, 也可以通过`System.gc()` 主动触发垃圾回收机制

## 断点调试 Debug

- 断点可以在`Debug`过程中，动态的下断点
- 断点调试的快键键
  - F7：step in，跳入方法内
  - F8：step over，逐行执行代码
  - shift+F8：step out，跳出方法
  - F9：resume，执行到下一个断点

# 类变量

## 基本介绍

- 类变量/静态变量/静态属性：**该类的所有对象共享的变量**，该类的任何一个对象去访问它时，**取到的都是相同的值**
- 同样地，该类的任何一个对象去修改它时，**修改的也是同一个值**

## 类变量的定义与访问

- 定义语法

```java
访问修饰符 static 数据类型 变量名; //推荐用法
static 访问修饰符 数据类型 变量名;
```

- 访问

```java
类名.类变量名 //推荐用法
对象名.类变量名
```

  类变量/静态变量的访问修饰符的访问权限和范围和普通属性是一样的

## 类变量的内存布局

- JDK7 以上版本，静态域存储于定义类的`Class`对象中，`Class`对象如同堆中其他对象一样，存在与GC堆中
- `static`变量保存在`Class`实例的尾部，`Class`对象确实在堆中

## 类变量的注意事项

- 何时需要用类变量
  - 当需要让某个类的所有对象都共享一个变量时，可考虑使用类变量
- 类变量与实例变量/普通属性的区别
  - 类变量是该类的所有对象共享的，实例变量是每个对象独享的
- 加上`static`称为类变量或静态变量，否则称为实例变量/普通变量/非静态变量
- 实例变量不能通过`类名.类变量名`方式访问
- 类变量是在类加载时就初始化了，即使没有创建对象，只要类加载了，就可以使用类变量
- 类变量的生命周期是随类的加载开始的，随着类消亡而销毁

# 类方法

## 基本介绍

- 类方法也叫静态方法

## 类方法的定义与调用

- 定义

```java
访问修饰符 static 数据返回类型 方法名() {} //推荐用法
static 访问修饰符 数据返回类型 方法名() {}
```

- 调用

```java
类名.类方法名 //推荐用法
对象名.类方法名
```

## 类方法的应用场景

- 当方法中不涉及任何和对象相关的成员，则可以将方法设计成静态方法，提高开发效率
- 实际开发中，往往会将一些通用的方法，设计成静态方法，这样就不需要创建对象也可以调用方法，比如打印一维数组，冒泡排序，完成某个计算任务等...

## 类方法的注意事项

- 类方法和普通方法都是随着类的加载而加载，将结构信息存储在方法区
- **类方法中不允许使用和对象有关的关键字**，如`this`和`super`，普通方法可以
- 类方法中无`this`的参数，普通方法中隐含着`this`的参数
- **类方法/静态方法中，只能访问静态变量或静态方法**
- **普通成员方法/非静态方法，既可以访问非静态成员，也可以访问静态成员**

# 理解 main 方法

## 理解 main 方法的形式

`public static void main(String[] args) {}`

- `main()`方法由java虚拟机调用
- java虚拟机需要调用类的`main()`方法，所以该方法的访问权限必须是`public`
- java虚拟机在执行`main()`方法时不必创建对象，所以该方法必须是`static`
- 该方法接收`String`类型的数组参数，该数组中保存执行java命令时传递给所运行的类的参数

```java
java 运行的类名 第一个参数 第二个参数 第三个参数
```

  ![main方法的String类型数组参数](pics/image-20210602090147893.png)

## main 方法的注意事项

- `main()`方法中，可以直接调用`main()`方法所在类的静态方法或静态属性
- 不能直接访问该类中的非静态成员，必须创建该类的一个实例对象后，才能通过这个对象去访问类中的非静态成员

# 代码块

## 基本介绍

- 代码块，又称为**初始化块**，属于类的成员（即是类的一部分），类似于方法，将逻辑语句封装在方法体中，通过`{}`包围起来
- 与方法不同的是，没有方法名，没有返回，没有参数，只有方法体，且不通过对象或类显式调用；而是加载类时，或创建对象时隐式调用

## 基本语法

```java
[访问修饰符] {
    代码
};
```

- 修饰符可选，要写的话，也只能写`static`
- 代码块分为两类
  - 使用`static`修饰：静态代码块
  - 没有`static`修饰：普通代码块/非静态代码块
- 逻辑语句可以为任何逻辑语句
- `;`号可写可不写

## 代码块的应用场景

- 相当于另一种形式的构造器（对构造器的补充机制），可以做初始化操作
- 应用场景：如果**多个构造器中都有重复的语句**，可以**抽取到代码块/初始化块**，提高代码块的复用性

## 代码块的注意事项

- `static`代码块/静态代码块，作用是对类进行初始化，它**随着类的加载而执行**，且**只会执行一次**；普通代码块，**每创建一个对象，就执行一次**
- **类什么时候加载：** 
  1. 创建对象实例时（`new`）
  2. 创建子类对象实例，父类也会被加载
  3. 使用类的静态成员时（静态方法、静态属性） 
- 普通代码块，在创建对象实例时，会被隐式的调用，被创建一次，就会被调用一次；如果是使用类的静态成员时，普通代码块并不会执行
- **创建一个对象时，在一个类的调用顺序：** 
  1. 调用**静态代码块**和**静态属性**初始化（两者初始化调用的**优先级相同**，若有多个，则按定义的**顺序调用**）
  2. 调用**普通代码块**和**普通属性**初始化（两者初始化调用的**优先级相同**，若有多个，则按定义的**顺序调用**）
  3. 调用构造方法
- 构造器的最前面隐含了`super()`和调用普通代码块
- **创建一个子类对象时，调用顺序：**
  1. 父类的静态代码块和静态属性（优先级相同，按定义顺序执行）
  2. 子类的静态代码块和静态属性（优先级相同，按定义顺序执行）
  3. 父类的普通代码块和普通属性（优先级相同，按定义顺序执行）
  4. 父类的构造器
  5. 子类的普通代码块和普通属性（优先级相同，按定义顺序执行）
  6. 子类的构造器
- 静态代码块只能直接调用静态成员（静态方法和静态属性）；普通代码块可以调用任意成员

# 单例设计模式

## 基本介绍

- 采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例，并且该类只提供一个取得其对象实例的方法
- 单例模式有两种：
  - 饿汉式：在类加载的时候就创建了对象
  - 懒汉式：在需要使用时才创建对象

## 饿汉式单例模式

- 实现步骤
  1. 构造器私有化`pravite`（防止被直接创建`new`）
  2. **类的内部直接创建对象**，**定义并创建**一个**`static`属性对象**

```java
private static ClassName objectName = new ClassName();
```

  3. 提供一个公共的`static`方法`getInstance()`，用于返回对象

## 懒汉式单例模式

- 实现步骤
  1. 构造器私有化`pravite`（防止被直接创建`new`）
  2. **定义一个`static`属性对象**

```java
private static ClassName objectName; //默认为null
```

  3. 提供一个公共的`static`方法`getInstance()`，用于返回对象

```java
public static ClassName getInstance() {
    if(objectName == null) { // 如果还没有创建对象
        objectName = new ClassName();
    }
    return objectName;
}
```

   

  4. 只有当用户调用`getInstance()`方法时，才创建并返回对象，之后再次调用时，会返回上次创建的对象

## 饿汉式 vs 懒汉式

- 两者最主要的区别在于创建对象的时机不同
  - 饿汉式是在类加载时就创建了对象实例
  - 懒汉式是在使用时才创建
- 饿汉式不存在线程安全问题，懒汉式存在线程安全问题
- 饿汉式存在浪费资源的可能，如果没有使用创建的对象；懒汉式是使用时才创建，就不存在资源浪费的问题

# final 关键字

## 基本介绍

- `final`可以修饰类、属性、方法和局部变量
- `final`的应用场景
  1. 当不希望类被继承时，可以用`final`修饰
  2. 当不希望父类的某个方法被子类重写（Override）时，可以用`final`修饰
  3. 当不希望类的某个属性的值被修改时，可以用`final`修饰
  4. 当不希望某个局部变量被修改时，可以用`final`修饰

## final 的注意事项

- `final`修饰的属性又叫**常量**，用`XX_XX_XX`来命名（如`TAX_RATE`）
- `final`修饰的属性必须赋初值，且以后不能再修改；赋值可在以下位置之一：
  1. 定义时：如`public final double TAX_RATE = 0.08;`
  2. 在代码块中
  3. 在构造器中
- `final`修饰的属性是**静态**的，则赋初值的位置只能是：
  1. 定义时：如`public final double TAX_RATE = 0.08;`
  2. 在静态代码块中，**不能在构造器中赋值**
- `final`类不能继承，但可以实例化对象
- 如果类不是`final`类，但含有`final`方法，则该方法虽然不能被重写，但可以被继承
- 一般来说，如果一个类已经是`final`类，就没必要再将该类的方法修饰成`final`方法
- `final`不能修饰构造器
- `final`和`static`往往搭配使用，效率更高
  - **若`static final`修饰的是基本数据类型和`String`变量，则在使用该变量时不会导致类加载，底层编译器做了优化**
- 包装类（`Integer`，`Double`，`Float`，`Boolean`等都是`final`），`String`也是`final`类

# 抽象类

## 基本介绍

- 当父类的一些方法不能确定时，考虑将该方法设计为抽象（`abstract`）方法

- `abstract`关键字修饰一个类时，这个类叫做抽象类

  ```java
  访问修饰符 abstract 类名 {}
  ```

- `abstract`关键字修饰一个方法时，这个类叫做抽象方法

  ```java
  访问修饰符 abstract 返回类型 方法名(参数列表); // 没有方法体
  ```

- 抽象类的应用场景更多在于设计，是设计者设计后，**让子类继承并实现抽象类**

- 抽象类，面试考点，**在框架和设计模式使用较多**

## 抽象类的注意事项

- 抽象类不能被实例化
- 抽象类不一定要包含`abstract`方法
- 一旦类包含了`abstract`方法，则该类必须声明为`abstract`类
- `abstract`只能修饰类和方法，不能修饰属性和其他的
- 抽象类可以有任意成员（抽象类的本质还是类），如：非抽象方法、构造器、静态属性等
- 抽象方法不能有主体，即不能实现
- **如果一个类继承了抽象类，则它必须实现抽象类的所有抽象方法，除非它自己也声明为`abstract`类**
- **抽象方法不能使用`private`、`final`和`static`来修饰**，因为这些关键字都是和重写（`private`不能被重写，`static`与重写无关）、继承（`final`不能被继承）相违背的

## 抽象类应用于模板设计模式



# 接口

## 基本介绍

- 接口：给出一些没有实现的方法，封装到一起，到某个类要使用的时候，再根据具体情况把这些方法写出来
- **接口**是更加抽象的抽象的**类**（抽象类里的方法可以有方法体）
  - JDK 7 及之前：接口类里的所有方法都没有方法体
  - JDK 8 及之后：接口类可以有静态方法（用`static`修饰方法）、默认方法（用`default`修饰方法），即接口中可以有方法的具体实现
- 接口体现了程序设计的多态和高内聚低耦合的设计思想

## 基本语法

```java
interface 接口名 {
	//静态属性
    //抽象方法
    //默认方法
}
class 类名 implements 接口名 {
    自定义属性;
    自定义方法;
    必须实现的接口的抽象方法;
}
```

## 接口的注意事项

- 接口不能被实例化

- **接口中所有的方法都是`public`方法，接口中的抽象方法可以不用`abstract`修饰**

- 一个普通类实现接口，必须将该接口的所有方法都实现

- 抽象类实现接口，可以不用实现接口的方法

- 一个类可同时实现多个接口（然而抽象类只能被单继承）

  ```java
  class 类名 implements 接口名1,接口名2 {}
  ```

- 接口中的属性

  - 只能是`final`的，而且是`public static final`修饰符

  - 访问形式：`接口名.属性名`

- 接口不能继承其他类，但可以继承多个别的接口

  ```java
  interface 接口名1 extends 接口名2,接口名3 {}
  ```

- 接口的修饰符只能`public`和默认（和类的修饰符是一样的）

- 结合接口时，两个接口具有相同的方法不会出现问题；但是，它们的签名相同而返回类型不同，则会报错

## 实现接口 vs 继承类

- 实现接口是对 **java 单继承机制的一种补充**
  - 子类**继承了父类**，自动拥有父类的功能
  - 如果子类需要扩展功能，可以**通过实现接口的方式扩展**
- 接口和继承解决的问题不同
  - 继承：解决代码的复用性和可维护性
  - 接口：设计好各种规范（方法），让其他类去实现这些方法，更加灵活
- 接口比继承更加灵活
  - 继承满足`is-a`关系
  - 接口只需满足`like-a`关系
- 接口在一定程度上实现代码解耦（接口规范性+动态绑定机制）

## 接口的多态特性

- 多态参数

  - 接口引用（接口类型的变量）可以指向实现了接口的类的对象实例
  - **可类比继承中的父类（继承的多态体现：向上转型）**

- 多态数组

  - 接口类型数组，存放了实现这个接口的类的对象实例
  - **可类比动态绑定机制（继承的多态体现：向下转型、动态绑定机制）**

- 多态传递

  - **接口可以继承另一个接口**

    比如，接口B继承了接口A，C类实现了接口B，也相当于C类实现了接口A

# 内部类

## 基本介绍

- 一个类的内部又完整地嵌套了另一个类结构
  - 内部类（Inner class）：被嵌套的类
  - 外部类（Outer class）：嵌套其他类的类

## 基本语法

```java
class Outer { // 外部类
    class Inner { // 内部类
    }
}

class Other { // 外部其他类
}
```

## 内部类的分类

- 定义在外部类的局部位置上（比如在方法内）：
  - 局部内部类（有类名）
  - **匿名内部类（没有类名）**
- 定义在外部类的成员位置上：
  - 成员内部类（没用`static`修饰）
  - 静态内部类（使用`static`修饰）

## 局部内部类的使用

- 局部内部类定义在外部类的局部位置，比如**在方法中/代码块**，并且有类名
- **本质仍然是一个类**
- **作用域：仅仅在定义它的方法或代码块中**
- **不能添加访问修饰符**（因为它的地位是一个局部变量，局部变量不能使用修饰符），**但可以使用`final`修饰**（因为局部变量可以使用`final`）
- 局部内部类访问外部类的成员：直接访问
- 外部类访问局部内部类的成员：先创建对象，再访问
- 外部其它类不能访问局部内部类（因为局部内部类的地位是一个局部变量）
- 如果**外部类和局部内部类的成员重名**时，默认遵循**就近原则**；如果想访问外部类的成员，**可以使用`外部类名.this.成员名`去访问**

## 匿名内部类的使用

- 局部内部类定义在外部类的局部位置，比如**在方法中/代码块**，并且**没有类名**

  （实际上JDK底层在创建匿名内部类`OuterClassName$number`，`number`是创建匿名内部类的顺序）

- **本质仍然是一个类**

- 将创建类、重写父类方法/实现接口、实例化对象同时完成，且之后销毁这个类，仅保留对象

- 实际上就是对于那些低调用率的子类或实现接口的类，可以不用额外再创建个类去继承父类或实现接口，从而简化开发

- 基本语法

  ```java
    new 类名或接口名(参数列表) {
    	类体
    };
  // 两种用法
  // 第一种:举例,创建基于类的匿名内部类
  ClassName objectName = new ClassName() {
      public void method() {
          ...
      }
  };
  objectName.method();
  
  // 第二种:举例,直接调用,匿名内部类本身也是返回对象
  new ClassName() {
      public void method() {
          ...
      }
  }.method();
  ```

- **作用域：仅仅在定义它的方法或代码块中**
- **不能添加访问修饰符**（因为它的地位是一个局部变量，局部变量不能使用修饰符），**但可以使用`final`修饰**（因为局部变量可以使用`final`）
- 匿名内部类访问外部类的成员：直接访问
- 可以调用匿名内部类方法（匿名内部类既是一个类的定义，本身也是一个对象）
- 外部其它类不能访问匿名内部类（因为局部内部类的地位是一个局部变量）
- 如果**外部类和匿名内部类的成员重名**时，默认遵循**就近原则**；如果想访问外部类的成员，**可以使用`外部类名.this.成员名`去访问**
- 匿名内部类的常见应用：当做实参直接传递，简洁高效

## 成员内部类的使用

- 成员内部类是定义在外部类的成员位置，并且没有`static`修饰
- **作用域：整个内体，和外部类的其他成员一样**
- **可以添加任意访问修饰符**（因为它的地位是一个成员）
- 成员内部类访问外部类的成员：直接访问
- 外部类访问成员内部类的成员：先创建对象，再访问
- **外部其它类访问成员内部类**：两种方式
  1. 先创建外部类对象，再创建成员内部类
  2. 在外部类中，编写一个方法，用于返回成员内部类对象
- 如果**外部类和成员内部类的成员重名**时，默认遵循**就近原则**；如果想访问外部类的成员，**可以使用`外部类名.this.成员名`去访问**

## 静态内部类的使用

- 静态内部类是定义在外部类的成员位置，并且有`static`修饰
- **作用域：整个内体，和外部类的其他成员一样**
- **可以添加任意访问修饰符**（因为它的地位是一个成员）
- 静态内部类访问外部类的静态成员：直接访问所有静态成员
- 外部类访问静态内部类的成员：先创建对象，再访问
- **外部其它类访问成员内部类**：两种方式
  1. 通过类名直接访问（因为是静态）
  2. 在外部类中，编写一个方法，用于返回静态内部类对象
- 如果**外部类和静态内部类的成员重名**时，默认遵循**就近原则**；如果想访问外部类的成员，**可以使用`外部类名.this.成员名`去访问**

# 枚举

## 基本介绍

- 枚举类（enumeration， 简写`enum`）：把具体的对象一个一个列举出来的类
- 枚举是一组常量的集合（只读，不修改）
- 枚举里面只包含有限的特定的对象

## 自定义类实现枚举

- 枚举对象名通常全部使用大写（常量的命名规范）
- **构造器私有化`private`，防止直接`new`**
- 本类内部直接创建一组固定对象
- 对外暴露对象（通过为对象添加`public final static`修饰符）
- 提供`get`方法，但不提供`set`方法，防止属性被修改

## 使用 enum 关键字实现枚举

- 当使用`enum`关键字开发一个枚举类时，**默认继承`Enum`类（可以使用`Enum`类的相关方法），而且是一个`final`类**
- **创建对象的语法简化为`常量名(参数列表)`**
- 若使用无参构造器创建枚举对象，则实参列表和小括号都可以省略
- 若有多个常量对象，**使用`,`号间隔即可**，最后`;`号结尾
- **枚举对象必须放在枚举类的行首**

## enum 常用方法应用实例

- `name`：返回当前对象名（常量名），子类中不能重写
- `ordinal`：返回当前对象的位置号（类似于数组的索引），默认从0开始
- `values`：返回当前枚举类中所有的常量，以数组的形式返回
- `valueOf`：将字符串转换成枚举对象，要求字符串必须为已有的常量名，否则报异常
- `compareTo`：比较两个枚举常量，比较的是位置号

## enum 实现接口

- 使用`enum`关键字后，就不能再继承其他类了（`enum`隐式继承`Enum`，java为单继承机制）
- 枚举类与普通类一样，可以实现接口

# 注解

## 基本介绍

- 注解（Annotation），也被称为元数据（Metadata），用于修饰解释**包、类、方法、属性、构造器、局部变量等数据信息**
- 和注释一样，**注解不影响程序逻辑**，但**注解可以被编译或运行**，相当于嵌入在代码中的补充信息
- JavaSE中，注解的使用目的较简单，例如标记过时的功能、忽略警告等
- JavaEE中，注解占据了更重要的角色，例如用来配置应用程序的人和切面，代替JavaEE旧版中所遗留的繁冗代码和XML配置等
- 使用 Annotation 时要在其前面增加`@`符号，并把该 Annotation 当成一个修饰符使用

## 基本 Annotation 介绍

- `@Override`：只能用于方法，表示重写父类方法
  - JDK源码中的`@interface`表示为注解类，JDK 5.0后加入的
- `@Deprecated`：用于表示某个程序元素（类、方法等）已过时，即不再推荐使用，但仍可以使用，可用于做版本升级过渡
- `@SuppressWarnings`：抑制编译器警告
  - `@SuppressWarnings`作用范围是放置的位置相关
    比如`@SuppressWarnings`放置在 `main `方法，那么抑制警告的范围就是 `main`
  - 通常可以放置具体的语句，方法，类
  - 该注解类有数组`String[] values() `设置一个数组比如 `{"rawtypes", "unchecked", "unused"}`

## JDK 的元注解

JDK 的元 Annotation 用于修饰其他 Annotation，即修饰注解的注解

- `@Retention`：指定注解的作用范围，取值在`java.lang.annotation.RetentionPolicy`定义，取值为：
  - `SOURCE`：在源文件中有效，编译过程中会被忽略
  - `CLASS`：随源文件一起编译在`.class`文件中，运行时忽略
  - `RUNTIME`：在运行时有效；**只有定义为`RetentionPolicy.RUNTIME`时，才能通过注解反射获取到注解**
- `@Target`：指定注解可以在哪些地方使用，取值在`java.lang.annotation.ElementType`定义，取值为：
  - `METHOD`：用于描述方法
  - `PACKAGE`：用于描述包
  - `PARAMETER`：用于描述方法变量
  - `TYPE`：用于描述类、接口或枚举类型
- `@Documented`：指定注解是否会在 javadoc 体现
- `@Inherited`：子类会继承父类注解
  - 被它修饰的Annotation将具有继承性，如果某个类使用了被`@Inerited`修饰的Annotation，则其子类将自动具有该注释
  - **实际应用中使用较少**

# 异常 Exception

## 基本介绍

- 异常：程序执行中发生的不正常情况（开发过程中的语法错误不是异常）
- 异常事件可分为两大类
  1. `Error`：JVM无法解决的严重问题，如JVM系统内部错误、资源耗尽等，会导致程序崩溃
     - 栈溢出`StackOverflowError`
     - OOM`out of memory`
  2. `Exception`：其它因编程错误或偶然的外在因素导致的一般性问题，可以使用针对性的代码进行处理
     - 运行时异常：程序运行时发生的异常，一般是指编程时的逻辑错误
     - 编译时异常：编程时，编译器检查出的异常

## 异常体系图

![异常体系图](pics/image-20210609111520980.png)

- `java.lang.RuntimeException`类及其子类都是运行时异常
- **对于运行时异常，可以不作处理**，因为此类异常很普遍，若全部处理可能会对程序的可读性和运行效率产生影响
- **对于编译时异常，是编译器要求必须处理的异常**

## 常见的运行时异常

- `NullPointerException` 空指针异常
- `ArithmeticException` 数学运算异常
- `ArrayIndexOutOfBoundsException` 数组下标越界异常
- `ClassCastException` 类型转换异常
- `NumberFormatException` 数字格式不正确异常

## 常见的编译时异常

- `SQLException`：操作数据库时，查询表可能发生异常
- `IOException`：操作文件时，发生异常
- `FileNotFoundException`：当操作一个不存在的文件时，发生异常
- `ClassNotFoundException`：加载类，而该类不存在时，发生异常
- `EOFException`：操作文件，到文件末尾，发生异常
- `IllegalArgumentException`：参数异常

## 异常处理

- `try-catch-finally`：程序员在代码中捕获发生的异常，自行处理

  ```java
  try {
      可能会发生异常的代码
  } catch (Exception e) {
     /*
     *捕获到异常
     *1.当异常发生时,系统将异常封装成Exception对象e,传递给catch
     *2.得到异常对象后,程序员自己处理
     *3.如果不发生异常,catch代码块不执行
     */
  } finally {
      /*
     *1.不管try代码块是否发生异常,必须要执行finally
     *2.因此通常将释放资源的代码放在finally
     */
  }
  ```

- `throws`：将发生的异常跑出，交给调用者（方法）处理，最高级的处理者就是JVM

  - 对于编译异常（必须要处理），`try-catch-finally`和`throws`二选一，默认为`throws`

# try - catch 异常处理

## 基本语法

- 快键键：选中可疑代码，`ctrl + alt + t`

```java
try {
    /*
    *可疑代码
    *将异常生成对应的异常对象,传递给catch块
    */
} catch (Exception e) {
   /*
   *对异常的处理
   */
} 
//如果没有finally,也是符合语法的
```

## try - catch 的注意事项

- 可以有多个`catch`语句，捕获不同的异常（进行不同的业务处理）
  - 要求父类异常在后，子类异常在前（比如`Exception`在后，`NullPointerException`在前）
  - 如果发生异常，只会匹配一个`catch`
- 可以进行`try-finally`配合使用，相当于没有捕获异常，因此程序会直接崩溃/退出
  - 应用场景：执行一段代码，无论是否发生异常，都必须执行某个业务逻辑

# throws 异常处理

## 基本介绍

- 如果一个方法（中的语句执行时）可能发生某种异常，但不能确定如何处理这种异常，则此方法应该显式地声明抛出异常，**表明该方法将不处理这些异常，而由该方法的调用者负责处理**
- 在方法声明中用`throws`语句可以声明抛出异常的列表，`throws`后面的异常类型可以是方法中产生的异常类型，也可以是它的父类

## 基本语法

```java
修饰符 返回类型 方法名(参数列表) throws 异常类型1,异常类型2,... {
	方法体
}
```

## throws 的注意事项

- **对于编译异常，程序中必须处理，比如`try-catch`或者`throws`**

- 对于运行时异常，程序中如果没有处理，默认`throws`方式处理

- 在`throws`过程中，如果有方法`try-catch`，就相当于处理异常，就可不必`throws`

- **子类重写父类方法时，对抛出异常的规定：**

  - 子类重写的方法，所抛出的异常类型要么**和父类抛出的异常一致**，要么**为父类抛出的异常类型的子类型**

  ![throws的注意事项](pics/image-20210609191530283.png)

## throw 和 throws 的区别

|          | 意义                     | 使用位置   | 后接内容 |
| -------- | ------------------------ | ---------- | -------- |
| `throws` | 异常处理的一种方式       | 方法声明处 | 异常类型 |
| `throw`  | 手动生成异常对象的关键字 | 方法体中   | 异常对象 |



# 自定义异常

## 基本介绍

- 当程序出现了某些“错误”，但该错误信息并没有在`Throwable`子类中描述处理，此时可以自己设计异常类，用于描述该错误信息

## 基本语法

```java
// 定义类
class 自定义异常类名 extends Exception 或 RuntimeException {}
// 通过构造器设置信息
throw new 自定义异常类名("设置信息");
```

- 如果继承`Exception`，属于编译异常
- 如果继承`RuntimeException`，属于运行异常（**一般来说，继承`RuntimeException`，好处是可以使用默认的处理机制，比较方便**）

# 包装类

## 包装类的分类

- 针对八种基本数据类型相应的引用类型 —— 包装类
- 有了类的特点，就可以调用类中的方法

| 基本数据类型 | 包装类     |
| ------------ | ---------- |
| `boolean`    | `Boolean`  |
| `char`       | `Charater` |
| `byte`       | `Byte`     |
| `short`      | `Short`    |
| `int`        | `Integer`  |
| `long`       | `Long`     |
| `float`      | `Float`    |
| `double`     | `Double`   |

![包装类的分类](pics/image-20210610085631627.png)

## 包装类和基本数据的转换

- JDK 5 之前的手动装箱和拆箱方式，装箱：基本类型 -> 包装类型，拆箱：包装类型 -> 基本类型

  ```java
  // int <--> Integer 的手动装箱和拆箱
  
  // 手动装箱 int -> Integer
  int num = 100;
  Integer integer  = new Integer(num);
  Integer integer = Integer.valueOf(num);
  
  // 手动拆箱 Integer -> int
  int i = integer.intValue();
  ```

- JDK 5 及之后的自动装箱和拆箱方式，自动装箱底层调用的是`valueOf()`方法，自动拆箱底层调用的是`xxxValue()`方法

  ```java
  // int <--> Integer 的自动装箱和拆箱
  
  // 自动装箱 int -> Integer
  int num = 100;
  Integer integer  = num; // 底层调用的是 Integer.valueOf(num)
  
  // 自动拆箱 Integer -> int
  int i = integer; // 底层调用的是 integer.intValue()
  ```

- 细节

  下列代码的输出结果？ 输出：`1.0`，因为三元运算符是一个整体，看最高精度类型

  ```java
  Object obj1 = true? new Integer(1) : new Double(2.0);
  System.out.println(obj1);
  ```

## 包装类型和 String 类型的相互转换

以`Integer`和`String`转换为例

- 包装类（`Integer`) -> `String`

  ```java
  Integer i = 100; // 自动装箱
  // 方法1
  String str1 = i + "";
  // 方法2
  String str2 = i.toString();
  // 方法3
  String str3 = String.valueOf(i);
  ```

- `String` -> 包装类（`Integer`)

  ```java
  String str = "1234";
  // 方法1
  Integer i1 = Integer.parseInt(str); // 自动装箱
  // 方法2
  Integer i2 = new Integer(str); // 构造器
  ```

## Integer 类和 Character 类的常用方法

- `Integer.MIN_VALUE`：返回值为$-2^{31}$的常量，它表示 `int` 类型能够表示的最小值
- `Integer.MAX_VALUE`：返回值为$2^{31}$的常量，它表示 `int` 类型能够表示的最大值
- `Character.isDigit('a')`：判断是不是数字
- `Character.isLetter('a')`：判断是不是字母
- `Character.isUpperCase('a')`：判断是不是大写
- `Character.isLowerCase('a')`：判断是不是小写
- `Character.isWhitespace('a')`：判断是不是空格
- `Character.toUpperCase('a')`：转成大写
- `Character.toLowerCase('A')`：转成小写

## 包装类的注意事项

- `Integer.valueOf()`方法：如果**返回的值在`-128~127`之间，则直接返回，不创建对象**；如果**返回值不在`-128~127`之间，则创建对象并返回值，即`new Integer()`**
- **只要有基本数据类型**，基本数据类型和包装类之间判断的是**值是否相同**

