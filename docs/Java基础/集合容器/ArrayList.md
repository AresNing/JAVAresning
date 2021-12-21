# ArrayList 和 Vector 的区别

- `ArrayList`是`List`的主要实现类，其底层是可变数组，底层使用`Obejct[]`存储，适用于频繁的查找工作，线程不安全
- `Vector`是`List`的古老实现类，底层使用`Obejct[]`存储，线程安全

# ArrayList 和 LinkedList 的区别

1. 线程安全
   - `ArrayList`和`LinkedList`都是不同步的，线程不安全的
2. 底层数据结构
   - `ArrayList`底层使用的是`Obejct[]`可变数组
   - `LinkedList`底层使用的是双向链表
3. 插入与删除
   - `ArrayList`采用数组存储，插入与删除元素的时间复杂度受元素位置的影响（如果要在指定位置`i`插入和删除元素的话（`add(int index, E element)`）时间复杂度就为$O(n-i)$，因为在进行上述操作的时候集合中第`i` 和第`i`个元素之后的`(n-i)`个元素都要执行向后位/向前移一位的操作）
   - `LinkedList`采用链表存储，插入与删除元素时间复杂度不受元素位置的影响（如果是要在指定位置`i`插入和删除元素的话（`(add(int index, E element)`） 时间复杂度近似为$O(n)$，因为需要先移动到指定位置再插入）
4. 快速随机访问
   - `ArrayList`支持快速随机访问，通过元素的序号快速获取元素对象（对应于`get(int index)`方法）
   - `LinkedList` 不支持高效的随机元素访问
5. 内存空间占用
   - `ArrayList` 的空间浪费主要体现在在`list`列表的结尾会预留一定的容量空间
   - `LinkedList` 的空间花费则体现在它的每一个元素都需要消耗比`ArrayList` 更多的空间（因为要存放直接后继和直接前驱以及数据）

# ArrayList 扩容机制

## 初始化的三种方式

1. 无参构造：实际上初始化赋值的是一个空数组，当真正对数组进行添加元素操作时，才会对数组分配容量（将数组容量扩为`10`）

```java
	/**
     * Default initial capacity.
     */
    private static final int DEFAULT_CAPACITY = 10;

    /**
     * Shared empty array instance used for empty instances.
     */
    private static final Object[] EMPTY_ELEMENTDATA = {};

    /**
     * Shared empty array instance used for default sized empty instances. We
     * distinguish this from EMPTY_ELEMENTDATA to know how much to inflate when
     * first element is added.
     */
    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

	/**
     * Constructs an empty list with an initial capacity of ten.
     */
    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }
```

2. 带初始容量参数的构造函数
3. 构造包含指定`collection`元素的列表\

## add()

- `add()`添加第一个元素之前，`elementData.length`为`0`；当执行了`ensureCapacityInternal()`之后，`minCapacity`为`10`，`minCapacity - elementData.length > 0`成立，所以进入 `grow(minCapacity)` 方法进行扩容，使得`elementData.length`为`10`
- 添加第2、3、4···到第 10 个元素时，依然不会执行 grow 方法，数组容量都为`10`
- 直到添加第 11 个元素，`minCapacity`（为`11`）比`elementData.length`（为 10）要大，进入`grow`方法进行扩容

## grow()

- `int newCapacity = oldCapacity + (oldCapacity >> 1)`，所以`ArrayList`每次扩容之后容量都会变为原来的`1.5`倍（`oldCapacity`为偶数就是 1.5 倍，否则是 1.5 倍左右）

```java
	/**
     * Increases the capacity to ensure that it can hold at least the
     * number of elements specified by the minimum capacity argument.
     *
     * @param minCapacity the desired minimum capacity
     */
    private void grow(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        // minCapacity is usually close to size, so this is a win:
        elementData = Arrays.copyOf(elementData, newCapacity);
    }
```

## hugeCapacity()

- 如果新数组容量大于`MAX_ARRAY_SIZE`，执行`hugeCapacity()`来比较`minCapacity`和`MAX_ARRAY_SIZE`
- 如果`minCapacity`大于最大容量，则新容量则为`Integer.MAX_VALUE`，否则，新容量大小则为`MAX_ARRAY_SIZE`即为 `Integer.MAX_VALUE - 8`

```java
	private static int hugeCapacity(int minCapacity) {
        if (minCapacity < 0) // overflow
            throw new OutOfMemoryError();
        return (minCapacity > MAX_ARRAY_SIZE) ?
            Integer.MAX_VALUE :
            MAX_ARRAY_SIZE;
    }
```

## ensureCapacity()

- 在`add`大量元素之前用 `ensureCapacity` 方法，以减少增量重新分配的次数

```java
	/**
     * Increases the capacity of this <tt>ArrayList</tt> instance, if
     * necessary, to ensure that it can hold at least the number of elements
     * specified by the minimum capacity argument.
     *
     * @param   minCapacity   the desired minimum capacity
     */
    public void ensureCapacity(int minCapacity) {
        int minExpand = (elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA)
            // any size if not default element table
            ? 0
            // larger than default for default empty table. It's already
            // supposed to be at default size.
            : DEFAULT_CAPACITY;

        if (minCapacity > minExpand) {
            ensureExplicitCapacity(minCapacity);
        }
    }
```