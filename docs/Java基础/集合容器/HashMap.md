# HashMap 简介

- `HashMap`存储键值对，基于`Map`接口实现，线程不安全
- `HashMap`可以存储`null`的`key`和`value`，但`null`作为键只能有一个，`null`作为值可以有多个
- JDK1.8 之前`HashMap`由数组+链表组成，数组是`HashMap`的主体，链表是为了解决哈希冲突（“拉链法”）
- JDK1.8 及之后`HashMap`由数组+链表+红黑树组成，当链表长度大于阈值（默认为`8`）
  - 当前数组长度小于`64`，优先选择数组扩容
  - 当前数组长度大于等于`64`，将链表转化为红黑树，以减少搜索时间
- `HashMap`默认的初始大小为`16`，每次扩容为原来的`2`倍，`HashMap`总是使用`2`的幂作为哈希表的大小

# 底层数据结构

## JDK1.8 之前

- JDK1.8 之前`HashMap`由数组+链表组成
- `hash()`得到`hash`值，然后通过 `(n - 1) & hash` 判断当前元素存放的位置（这里的`n`指的是数组的长度），如果当前位置存在元素的话，就判断该元素与要存入的元素的`hash`值以及`key`是否相同，如果相同的话，直接覆盖，不相同就通过拉链法解决冲突
- `hash()`方法是为了防止一些实现比较差的`hashCode()`方法，即可以减少碰撞
- JDK1.8 的`hash()`方法 相比于 JDK1.7 的`hash()`方法更加简化，因为JDK1.7 的`hash()`方法扰动了4次

```java
    // JDK1.8 的hash()方法
	static final int hash(Object key) {
      int h;
      // key.hashCode()：返回散列值也就是hashcode
      // ^ ：按位异或
      // >>>:无符号右移，忽略符号位，空位都以0补齐
      return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
  }
```

```java
	// 	JDK1.7 的hash()方法
	static int hash(int h) {
    	// This function ensures that hashCodes that differ only by
    	// constant multiples at each bit position have a bounded
    	// number of collisions (approximately 8 at default load factor).

    	h ^= (h >>> 20) ^ (h >>> 12);
    	return h ^ (h >>> 7) ^ (h >>> 4);
	}
```

## JDK1.8 及之后

- 当链表长度大于阈值（默认为`8`）时，会首先调用 `treeifyBin()`方法。这个方法会根据`HashMap`数组来决定是否转换为红黑树：只有当数组长度大于或者等于`64`的情况下，才会执行转换红黑树操作，以减少搜索时间；否则，就是只是执行 `resize()` 方法对数组扩容
- `loadFactor`加载因子是控制数组存放数据的疏密程度
  - `loadFactor`太大导致查找元素效率低，太小会导致数组的利用率太低
  - `loadFactor`的默认值为`0.75f`
  - 默认容量为`16`，负载因子为`0.75`：当数量达到了`16 * 0.75 = 12`就需要将当前`16`的容量进行扩容
- `threshold`扩容阈值：`threshold = capacity * loadFactor`，当 `Size>=threshold`的时候，考虑对数组的扩增