> [整数与IP地址间的转换__nowcoder.com](https://www.nowcoder.com/questionTerminal/66ca0e28f90c42a196afd78cc9c496ea)
>
> [IP地址与整数的转换](https://mp.weixin.qq.com/s/UWCuEtNS2kuAuDY-eIbghg)

# 算法

- ip -> 整数：ip 地址分段，最高段到最低段依次左移24位、16位、8位、0位，4个段做**或运算**
- 整数 -> ip：
  - 将整数和255（`0xff`）做**与运算**，得到ip地址的第4段；
  - 整数右移8位，和255（`0xff`）做**与运算**，得到ip地址的第3段；
  - 整数右移16位，和255（`0xff`）做**与运算**，得到ip地址的第2段；
  - 整数右移24位，和255（`0xff`）做**与运算**，得到ip地址的第1段；
  - 每轮与运算的结果拼接成 ip 地址
- 注意`int`溢出越界问题，应使用`long`

# 代码实现

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while(sc.hasNext()) {
            String input = sc.nextLine();
            if(input.lastIndexOf('.') != -1) {
                long num = ipToNum(input);
                System.out.println(num);
            } else {
                String ip = numToIP(input);
                System.out.println(ip);
            }
        }
    }
    
    private static long ipToNum(String ip) {
        String[] segments = ip.split("\\.");
        long res = 0L;
        int n = 0;
        for(int i = segments.length - 1; i >= 0; i++) {
            res |= Long.parseLong(segments[i]) << n;
            n += 8;
        }
        return res;
    }
    
    private static String numToIP(String num) {
        long x = Long.parseLong(num);
        String res = String.format("%d.%d.%d.%d",
                                   (x >> 24) & 0xff,
                                   (x >> 16) & 0xff,
                                   (x >> 8) & 0xff,
                                   x & 0xff
                                  );
        return res;
    }
}
```
