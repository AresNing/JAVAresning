> [剑指 Offer 40. 最小的k个数 - LeetCode](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)

# TopK 问题的两种思路

1. 优化后的快排：快排变形，时间复杂度$O(N)$
2. 优先队列：二叉堆，时间复杂度$O(NlogK)$

# 两种方法的优劣比较

- 优化后的快排的时间、空间复杂度都优于使用堆的方法
- 但是快排有几点局限性：
  1. 快排算法需要修改原数组
    - 如果原数组不能修改的话，还需要拷贝一份数组，空间复杂度就上去了
  2. 快排算法需要保存所有的数据
    - 如果把数据看成输入流的话，使用堆的方法是来一个处理一个，不需要保存数据，只需要保存 k 个元素的最大堆
    - 快排的方法需要先保存下来所有的数据，再运行算法；当数据量非常大的时候，甚至内存都放不下的时候，就麻烦了
- 当数据量大的时候还是用基于堆的方法比较好

# 快排变形

## 算法

- 找前 K 大 / 前 K 小问题不需要对整个数组进行$O(NlogN)$的排序
- 直接通过快排切分排好第 K 小的数（下标为 K-1），那么它左边的数就是比它小的另外 K-1 个数

## 代码实现

```java
class Solution {
    public int[] getLeastNumbers(int[] arr, int k) {
        if(arr.length == 0 || k == 0)
            return new int[0];
        // 最后一个参数表示我们要找的是下标为k-1的数
        return quickSort(arr, 0, arr.length - 1, k - 1);
    }

    private int[] quickSort(int[] arr, int lo, int hi, int k) {
        // 每快排切分1次，找到排序后下标为j的元素，如果j恰好等于k就返回j以及j左边所有的数；
        int j = partition(arr, lo, hi);
        if(j == k) {
            return Arrays.copyOf(arr, j + 1);
        }
        // 否则根据下标j与k的大小关系来决定继续切分左段还是右段
        return j > k ? quickSort(arr, lo, j - 1, k) : quickSort(arr, j + 1, hi, k);
    }

    private int partition(int[] arr, int lo, int hi) {
        int i = lo, j = hi + 1;
        while(true) {
            while(++i <= hi && arr[i] < arr[lo]);
            while(--j >= lo && arr[j] > arr[lo]);
            if(i >= j) break;
            swap(arr, i, j);
        }
        swap(arr, lo, j);
        return j;
    }

    private void swap(int[] arr, int i, int j) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}
```

## 复杂度

- 时间复杂度：因为要找下标为 k 的元素，第一次切分的时候需要遍历整个数组`(0 ~ n)` 找到了下标是 j 的元素，假如 k 比 j 小的话，那么我们下次切分只要遍历数组`(0~k-1)`的元素，反之如果 k 比 j 大的话，那下次切分只要遍历数组`(k+1～n)`的元素，总之可以看作每次调用`partition`遍历的元素数目都是上一次遍历的 1/2，因此时间复杂度是$N + N/2 + N/4 + ... + N/N = 2N$, 因此时间复杂度是$O(N)$
- 空间复杂度：$O(N)$，系统调用栈

# 优先队列实现二叉堆

## 算法

- 求前 `K` 小，因此用一个容量为 `K` 的大根堆，每次 poll 出最大的数，那堆中保留的就是前 `K` 小
- 注意不是小根堆！小根堆的话需要把全部的元素都入堆，那是$O(NlogN)$，就不是$O(NlogK)$
- 这个方法比快排慢，但是因为 Java 中提供了现成的 PriorityQueue（默认小根堆），所以实现起来最简单

## 代码实现

```java
// 保持堆的大小为K，然后遍历数组中的数字，遍历的时候做如下判断：
// 1. 若目前堆的大小小于K，将当前数字放入堆中。
// 2. 否则判断当前数字与大根堆堆顶元素的大小关系，如果当前数字比大根堆堆顶还大，这个数就直接跳过；
//    反之如果当前数字比大根堆堆顶小，先poll掉堆顶，再将该数字放入堆中
class Solution {
    public int[] getLeastNumbers(int[] arr, int k) {
        if(arr.length == 0 || k == 0)
            return new int[0];
        // 默认是小根堆，实现大根堆需要重写一下比较器
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);
        for(int num : arr) {
            if(pq.size() < k) {
                pq.offer(num);
            } else if(num < pq.peek()) {
                pq.poll();
                pq.offer(num);
            }
        }
        // 返回堆中的元素
        int[] res = new int[k];
        int idx = 0;
        for(int num : pq)
            res[idx++] = num;
        return res;
    }
}
```

## 复杂度

- 时间复杂度：$O(NlogK)$
- 空间复杂度：$O(K)$，优先队列的长度