> 题目链接：[OJ在线编程常见输入输出练习场](https://ac.nowcoder.com/acm/contest/5652#question)

# A + B

## A. 多组空格分隔的两个正整数

- **输入描述**

```tex
输入包括两个正整数a,b(1 <= a, b <= 10^9),输入数据包括多组。
```

- **输出描述**

```tex
输出a+b的结果
```

- **代码实现**

```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while(sc.hasNextInt()) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            System.out.println(a + b);
        }
    }
}
```

## B. 第一行组数接空格分隔的两个正整数

- **输入描述**

```tex
输入第一行包括一个数据组数t(1 <= t <= 100)
接下来每行包括两个正整数a,b(1 <= a, b <= 10^9)
```

- **输出描述**

```tex
输出a+b的结果
```

- **代码实现**

```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        for(int i = 0; i < num; i++) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            System.out.println(a + b);
        }
    }
}
```

## C. 空格分隔的两个正整数 00为结束

- **输入描述**

```tex
输入包括两个正整数a,b(1 <= a, b <= 10^9),输入数据有多组, 如果输入为0 0则结束输入
```

- **输出描述**

```tex
输出a+b的结果
```

- **代码实现**

```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while(sc.hasNextInt()) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            if(a == 0 && b == 0) break;
            System.out.println(a + b);
        }
    }
}
```

## D. 每行第一个为个数后带空格分割整数为0结束

- **输入描述**

```tex
输入数据包括多组。
每组数据一行,每行的第一个整数为整数的个数n(1 <= n <= 100), n为0的时候结束输入。
接下来n个正整数,即需要求和的每个正整数。
```

- **输出描述**

```tex
每组数据输出求和的结果
```

- **代码实现**

```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while(sc.hasNextInt()) {
            int num = sc.nextInt();
            if(num == 0) break;
            int sum = 0;
            for(int i = 0; i < num; i++) {
                sum += sc.nextInt();
            }
            System.out.println(sum);
        }
    }
}
```

## E. 第一行组数接第一个个数接空格分开的整数

- **输入描述**

```tex
输入的第一行包括一个正整数t(1 <= t <= 100), 表示数据组数。
接下来t行, 每行一组数据。
每行的第一个整数为整数的个数n(1 <= n <= 100)。
接下来n个正整数, 即需要求和的每个正整数。
```

- **输出描述**

```tex
每组数据输出求和的结果
```

- **代码实现**

```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        for(int i= 0; i < num; i++) {
            int n = sc.nextInt();
            int sum = 0;
            while(n > 0) {
                sum += sc.nextInt();
                n--;
            }
            System.out.println(sum);
        }
    }
}
```

## F. 每行第一个为个数后带空格分割整数

- **输入描述**

```tex
输入数据有多组, 每行表示一组输入数据。
每行的第一个整数为整数的个数n(1 <= n <= 100)。
接下来n个正整数, 即需要求和的每个正整数。
```

- **输出描述**

```tex
每组数据输出求和的结果
```

- **代码实现**

```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while(sc.hasNextInt()) {
            int num = sc.nextInt();
            int sum = 0;
            while(num > 0) {
                sum += sc.nextInt();
                num--;
            }
            System.out.println(sum);
        }
    }
}
```

## G. 多组空格分隔的正整数

- **输入描述**

```tex
输入数据有多组, 每行表示一组输入数据。
每行不定有n个整数，空格隔开。(1 <= n <= 100)。
```

- **输出描述**

```tex
每组数据输出求和的结果
```

- **代码实现**

```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while(sc.hasNextLine()) {
            String[] strArr = sc.nextLine().split(" ");
            int sum = 0;
            for(String str : strArr) {
                sum += Integer.parseInt(str);
            }
            System.out.println(sum);
        }
    }
}
```

# 字符串排序

## H. 第一行个数第二行字符串

- **输入描述**

```tex
输入有两行，第一行n
第二行是n个空格隔开的字符串
```

- **输出描述**

```tex
输出一行排序后的字符串，空格隔开，无结尾空格
```

- **代码实现**

```java
import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        sc.nextLine(); // 光标到下一行的开头
        while(sc.hasNext()) {
            String[] strArr = sc.nextLine().split(" ");
            Arrays.sort(strArr);
            for(String str : strArr)
                System.out.print(str + " ");
        }
    }
}
```

## I. 多行空格分开的字符串

- **输入描述**

```tex
多个测试用例，每个测试用例一行。
每行通过空格隔开，有n个字符，n＜100
```

- **输出描述**

```tex
对于每组测试用例，输出一行排序过的字符串，每个字符串通过空格隔开
```

- **代码实现**

```java
import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while(sc.hasNextLine()) {
            String[] strArr = sc.nextLine().split(" ");
            Arrays.sort(strArr);
            for(String str : strArr)
                System.out.print(str + " ");
            System.out.println();
        }
    }
}
```

## J. 多行逗号分开的字符串

- **输入描述**

```tex
多个测试用例，每个测试用例一行。
每行通过','隔开，有n个字符，n＜100
```

- **输出描述**

```tex
对于每组用例输出一行排序后的字符串，用','隔开，无结尾空格
```

- **代码实现**

```java
import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while(sc.hasNextLine()) {
            String[] strArr = sc.nextLine().split(",");
            Arrays.sort(strArr);
            for(int i = 0; i < strArr.length - 1; i++) {
                System.out.print(strArr[i] + ",");
            }
            System.out.println(strArr[strArr.length - 1]);
        }
    }
}
```

## K. 多组空格分隔的两个正整数

- **输入描述**

```tex
输入有多组测试用例，每组空格隔开两个整数
数据范围：0 < a, b < 2 * 10^10
```

- **输出描述**

```tex
对于每组数据输出一行两个整数的和
```

- **代码实现**

```java
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while(sc.hasNextLong()) {
           Long a = sc.nextLong();
           Long b = sc.nextLong();
           System.out.println(a + b);
        }
    }
}
```

# 总结

## Scanner 类获取键盘输入

1. `Scanner`类是获取键盘输入的一个类，首先创建`Scanner`对象

```java
Scanner sc = new Scanner(System.in);
```

2. 通过`Scanner`类的方法来获取输入，在调用方法之前一般可以采取`has…`方法判断是否有输入
   - `next`和`nextLine`：获取输入字符串的方法
     | next() 方法                       | nextLine() 方法                        |
     | --------------------------------- | -------------------------------------- |
     | 只能读取到空格之前的字符串        | 可以读取空格的字符串                   |
     | 比如"hello java"，只能读取"hello" | 比如"hello java"，可以读取"hello java" |
   - 获取输入整数和小数等：`nextInt`、`nextFloat`...
   - 读取前可以使用`hasNext`与`hasNextLine`判断是否有输入数据

## Integer.parseInt 和 Integer.valueOf 的区别

- `parseInt()`返回的是基本类型`int`
- `valueOf()`返回的是包装类`Integer`
