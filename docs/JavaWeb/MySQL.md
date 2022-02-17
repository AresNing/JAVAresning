# 窗口函数

## 简介

- MySQL 8.0以上版本提供窗口函数（MySQL 8.0以下版本参考[在MySQL中实现Rank高级排名函数](https://www.jianshu.com/p/bb1b72a1623e)）
- 窗口函数通过制定字段将数据分为多份，即多个窗口，对每个窗口的每一行执行函数，每个窗口返回等行数的结果
- 窗口函数是对`where`或者`group by`子句处理后的结果进行操作，因此窗口函数原则上只能写在`select`子句中
- 窗口函数分为两类
  1. 专用窗口函数，如`rank`，`dense_rank`，`row_number`等
  2. 聚合函数，如`sum`，`avg`，`count`，`max`，`min`等

## 语法

```sql
函数名([参数]) over(patition by [分组字段] order by [排序字段] asc/desc rows/range between 起始位置 and 结束位置)
```

- 第一部分是**函数名称**，开窗函数的数量较少，只有11个窗口函数+聚合函数（所有聚合函数都可以用作开窗函数），根据函数性质，有的要写参数，有的不需要写参数
- 第二部分是**over语句**，**over()是必须要写的**，里面有三个参数，都是非必须参数，根据需求选写：
  1. 第一个参数是`partition by + 分组字段`，将数据根据此字段分成多份，如果不加`partition by`参数，那会把整个数据当做一个窗口
  2. 第二个参数是`order by + 排序字段`，每个窗口的数据要不要进行排序
  3. 第三个参数`rows/range between 起始位置 and 结束位置`，这个参数仅针对滑动窗口函数有用，是在当前窗口下分出更小的子窗口

## 作用与功能

1. 同时具有分组和排序的功能
2. 不减少原表的行数
   - `partition by`分组汇总行数不变
   - `group by`分组汇总改变行数

## 不同排序函数的区别

![不同排序函数的区别](pics/image-20220210151217673.png)

### rank函数

- 如果有并列名次的行，会占用下一名次的位置，**名次之间有“间隔”**
- 比如正常排名是1，2，3，4，但是现在前3名是并列的名次，结果是：**1，1，1**，4

### dense_rank函数

- 如果有并列名次的行，不占用下一名次的位置，**名次之间没有“间隔”**
- 比如正常排名是1，2，3，4，但是现在前3名是并列的名次，结果是：**1，1，1**，2

### row_number函数

- 不考虑并列名次的情况
- 比如前3名是并列的名次，排名是正常的**1，2，3**，4

## 示例

### 排名问题

> 编写一个 SQL 查询来实现分数排名。如果两个分数相同，则两个分数排名（Rank）相同。请注意，平分后的下一个名次应该是下一个连续的整数值

```sql
select
	Grade, dense_rank() over(order by Grade desc) as `rank`
from
	Class;
```

### topN问题

> 查询每组最大的N条记录
>
> 这类问题涉及到“既要分组，又要排序”的情况，需要用窗口函数来实现

```sql
select * from
	(select *,
    		row_number() over(partition by 要分组的列 order by 要排序的列 desc)) as ranking
     from 表名) as a
where ranking <= N;
```

## 聚合函数作为窗口函数

- 聚合函数和上面提到的专用窗口函数用法完全相同，只需要把聚合函数写在窗口函数的位置即可，但是函数后面括号里面不能为空，需要指定聚合的列名
- 聚合函数作为窗口函数，可以在每一行的数据里直观的看到，截止到本行数据，统计数据是多少（最大值、最小值等）；同时可以看出每一行数据，对整体统计数据的影响

## 窗口函数的移动

- 用`rows`和`preceding`这两个关键字是之前多少行的意思

> 自身结果的之前两行的平均，一共三行做聚合函数

```sql
select
	*, avg(grade) over(order by id rows 2 preceding) as current_avg
from
	class;
```

> 自身加上前两行求和，一共三行做聚合函数

```sql
select
	*， sum(grade) over(order by id rows 2 preceding) as current_sum
from
	class;
```

