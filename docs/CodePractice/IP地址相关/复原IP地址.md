> [93. 复原 IP 地址 - LeetCode](https://leetcode-cn.com/problems/restore-ip-addresses/)

# 算法

- 回溯
- 时间复杂度：$O(3^4+s)$，在每一层递归，最多只会深入到下一层的3种情况，递归的层数为4，$s$为字符串的长度
- 空间复杂度：$O(4)$，即$O(1)$，递归的层数和额外的数组空间为4

# 代码实现

```java
class Solution {
    private static final int SEGMENT_COUNT = 4;
    private List<String> res = new ArrayList<>();
    private int[] segments = new int[SEGMENT_COUNT];
    
    public List<String> restoreIpAddresses(String s) {
        dfs(s, 0, 0);
        return res;
    }
    
    private void dfs(String s, int segmentId, int start) {
        if(segmentId == SEGMENT_COUNT) {
            if(start == s.length()) {
                StringBuilder ipAddr = new StringBuilder();
                for(int i = 0; i < SEGMENT_COUNT; i++) {
                    ipAddr.append(segment);
                    if(i != SEGMENT_COUNT - 1) {
                        ipAddr.append(".");
                    }
                }
                res.add(ipAddr.toString());
            }
            return;
        }
        
        if(start == s.length())
            return;
        
        if(s.charAt(start) == '0') {
            segments[segmentId] = 0;
            dfs(s, segmentId + 1, start + 1);
        }
        
        int addr = 0;
        for(int end = start; end < s.length(); end++) {
            addr = addr * 10 + (s.charAt(end) - '0');
            if(addr > 0 && addr <= 255) {
                segments[segmentId] = addr;
                dfs(s, segmentId + 1, end + 1);
            } else {
                break;
            }
        }
    }
}
```

