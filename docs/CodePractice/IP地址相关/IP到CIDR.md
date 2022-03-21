> [LeetCode - 751 IP到CIDR](https://blog.csdn.net/qq_29051413/article/details/108575329)

# 代码实现

```java
import java.util.*;

public class Main {
    // ACM 模式，处理输入输出
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String ip = sc.nextLine();
        int n = sc.nextInt();
        List<String> res = solution(ip, n);
        for(String s : res)
            System.out.print(s + " ");
    }
    
    private static List<String> solution(String ip, int n) {
        long start = ipToLong(ip);
        List<String> res = new ArrayList<>();
        while(n > 0) {
            int mask = Math.max(
                    33 - bitLength(Long.lowestOneBit(start)),
                    33 - bitLength(n));
            res.add(longToIP(start) + "/" + mask);
            // 1 << (32 - mask) 表示上面已经用 CIDR 块表示掉了的 IP 数量
            start += 1 << (32 - mask);
            n -= 1 << (32 - mask);
        }
        return res;
    }
    
    private static long ipToLong(String ip) {
        long ans = 0L;
        for(String segment : ip.split("\\.")) {
            ans = ans * 256 + Integer.parseInt(segment);
        }
        return ans;
    }
    
    private static String longToIP(long x) {
        return String.format("%s.%s.%s.%s",
                x >> 24, (x >> 16) % 256, (x >> 8) % 256, x % 256);
    }
    // bitLength(long x) 表示 x 的二进制有效位数
    // 如 x = 1010 0100，输出 8；
    // x = 0010 0100，输出 6；
    // x = 0000 0000，输出 1，即最后一个 0 是有效的
    private static int bitLength(long x) {
        if(x == 0) return 1;
        int ans = 0;
        while(x > 0) {
            x >>= 1;
            ans++;
        }
        return ans;
    }
}
```

