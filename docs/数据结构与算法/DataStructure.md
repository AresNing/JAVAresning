# 链表

## 单向链表

```java
class Node {
    private Node next;
    private Object item;
    public Node(Object item, Node next) {
        this.item = item;
        this.next = next;
    }
    public Node(Object item) {
        this.item = item;
    }
    ...
}
```

## 循环链表

- 单向链表沿着一个方向，不能反向查找，且最后一个节点指针域的值为`null`
- 将单链表的末尾节点指针域的`null`变为指向第一个节点，逻辑上形成一个环型，即单向循环链表

## 双向链表

- 在单链表的每个节点里再增加一个指向其直接前趋的指针域`prev`，即双向链表





# 背包 Bag

- 背包是一种不支持从中删除后元素的集合数据类型
- 其目的是帮助用例收集元素并迭代遍历所有收集到的元素（用例也可以检查背包是否为空或者获取背包中元素的数量）
- 迭代的顺序不确定且与用例无关

## 链表实现

```java
public class Bag<Item> implements Iterable<Item> {
    private Node first;
    private int N;
    private class Node {
        Item item;
        Node next;
    }
    public boolean isEmpty() { return first == null;}
    public int size() { return N;}
    public void add(Item item) {
        Node oldfirst = first;
        first = new Node();
        first.item = item;
        first.next = oldfirst;
    }
    public Iterator<Item> iterator() {
        return new ListIterator();
    }
    private class ListIterator implements Iterator<Item> {
        private Node current = first;
        public boolean hasNext() {
            return current != null;
        }
        public void remove() {}
      	public Item next() {
            Item item = current.item;
            current = current.next;
            return item;
        }  
    }
}
```



# 队列 Queue

- 先进先出队列（简称队列）是一种基于先进先出（FIFO）策略的集合类型

## 链表实现

```java
public class Queue<item> implements Iterable<item> {
    private Node first;
    private Node last;
    private int N;
    private class Node { // 节点的内部类
        Item item;
        Node next;
    }
    public boolean isEmpty() { return first == null;}
    public int size() { return N;}
    public void enqueue(Item item) { // 从队尾添加元素
        Node oldlast = last;
        last = new Node();
        last.item = item;
        last.last = null;
        if(isEmpty()) first = last;
        else oldlast.next = last;
        N++;
    }
    public Item dequeue() { // 从队首删除元素
        Item item = first.item;
        first = first.next;
        if(isEmpty()) last = null;
        N--;
        return item;
    }
}
```



# 优先队列

- 主要操作：**删除最大元素**和**插入元素**

# 双端队列



# 栈 Stack

- 下压栈（简称栈）是一种基于后进先出（LIFO）策略的集合类型

## 链表实现

```java
public class Stack<Item> implements Iterable<Item> {
    private Node first; // 栈顶
    private int N; // 元素数量
    private class Node { // 节点的内部类
        Item item;
        Node next;
    }
    public boolean isEmpty() { return first == null;}
    public int size() { return N;}
    public void push(Item item) { // 向栈顶添加元素
        Node oldfirst = first;
        first = new Node();
        first.next = oldfirst;
        N++;
    }
    public Item pop() { // 从栈顶删除元素
        Item item = first.item;
        first = first.next;
        N--;
        return item;
    }
}
```



# 堆 