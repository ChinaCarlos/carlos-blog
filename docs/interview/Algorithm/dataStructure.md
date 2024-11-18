---
title: 数据结构概念
tags: front interview
theme: solarized-dark
---

# 数据结构概念

## 1. 常见的数据结构有哪些？

### 1.1 数组（Array）

- 一组相同类型的数据的集合，内存中连续存储。
- 支持快速访问任意元素，但插入和删除效率较低。

#### 示例代码：

```typescript
// 数组初始化和基本操作
let arr: number[] = [1, 2, 3, 4, 5];

// 访问元素
console.log(arr[2]); // 输出 3

// 插入元素
arr.push(6); // 添加到末尾
arr.unshift(0); // 添加到开头

// 删除元素
arr.pop(); // 删除末尾
arr.shift(); // 删除开头

console.log(arr); // 输出 [0, 1, 2, 3, 4, 5]
```

### 1.2 链表（Linked List）

- 由节点构成，每个节点包含数据和指向下一个节点的指针。
- 分为单链表、双链表和循环链表，适合频繁插入和删除操作，但随机访问效率低。

#### 示例代码：

```typescript
// 定义链表节点
class ListNode {
  value: number;
  next: ListNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

// 定义链表
class LinkedList {
  head: ListNode | null = null;

  // 插入节点到头部
  insertAtHead(value: number): void {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  // 打印链表
  printList(): void {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

const list = new LinkedList();
list.insertAtHead(3);
list.insertAtHead(2);
list.insertAtHead(1);
list.printList(); // 输出 1, 2, 3
```

### 1.3 栈（Stack）

- 先进后出的线性结构，只允许在一端进行插入和删除操作。
- 常用于递归、表达式求值等场景。

#### 示例代码：

```typescript
class Stack {
  items: number[] = [];

  // 入栈
  push(item: number): void {
    this.items.push(item);
  }

  // 出栈
  pop(): number | undefined {
    return this.items.pop();
  }

  // 获取栈顶元素
  peek(): number | undefined {
    return this.items[this.items.length - 1];
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 输出 2
console.log(stack.peek()); // 输出 1
```

### 1.4 队列（Queue）

- 先进先出的线性结构，只允许在一端插入，在另一端删除。
- 常用于任务调度、消息队列等。

#### 示例代码：

```typescript
class Queue {
  items: number[] = [];

  // 入队
  enqueue(item: number): void {
    this.items.push(item);
  }

  // 出队
  dequeue(): number | undefined {
    return this.items.shift();
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); // 输出 1
console.log(queue.dequeue()); // 输出 2
```

### 1.5 哈希表（Hash Table）

- 通过哈希函数将数据映射到数组的特定位置。
- 支持高效的插入、删除和查找操作。哈希冲突的解决通常有开放寻址法和链地址法等。

#### 示例代码：

```typescript
class HashTable {
  table: { [key: string]: any } = {};

  // 添加键值对
  set(key: string, value: any): void {
    this.table[key] = value;
  }

  // 获取值
  get(key: string): any {
    return this.table[key];
  }

  // 删除键值对
  delete(key: string): void {
    delete this.table[key];
  }
}

const hashTable = new HashTable();
hashTable.set("name", "Alice");
console.log(hashTable.get("name")); // 输出 "Alice"
hashTable.delete("name");
```

### 1.6 树（Tree）

- 一种层次结构的数据结构，由节点和边组成。
- 常见的有二叉树、二叉搜索树、AVL 树、红黑树、B 树等，广泛用于数据库和文件系统。

#### 示例代码：

```typescript
class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

class BinarySearchTree {
  root: TreeNode | null = null;

  // 插入节点
  insert(value: number): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: TreeNode, newNode: TreeNode): void {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
}

const bst = new BinarySearchTree();
bst.insert(5);
bst.insert(3);
bst.insert(8);
```

### 1.7 堆（Heap）

- 一种特殊的完全二叉树，分为最大堆和最小堆。
- 主要用于实现优先队列和排序算法（如堆排序）。

#### 示例代码：

```typescript
class MinHeap {
  heap: number[] = [];

  insert(value: number): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break;
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }
}

const minHeap = new MinHeap();
minHeap.insert(3);
minHeap.insert(1);
minHeap.insert(2);
console.log(minHeap.heap); // 输出 [1, 3, 2]
```

### 1.8 图（Graph）

- 由顶点和边构成，分为有向图和无向图。
- 常用于描述网络结构，如社交网络、地图导航等。常见的图算法有深度优先搜索、广度优先搜索、最短路径算法等。

#### 示例代码：

```typescript
class Graph {
  adjacencyList: Map<number, number[]> = new Map();

  addVertex(vertex: number): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1: number, vertex2: number): void {
    this.adjacencyList.get(vertex1)?.push(vertex2);
    this.adjacencyList.get(vertex2)?.push(vertex1);
  }
}

const graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addEdge(1, 2);
console.log(graph.adjacencyList); // 输出 Map { 1 => [2], 2 => [1] }
```

### 1.9 字典树（Trie）

#### 示例代码：

```typescript
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
}

class Trie {
  root: TrieNode = new TrieNode();

  insert(word: string): void {
    let current = this.root;
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }
    current.isEndOfWord = true;
  }
}

const trie = new Trie();
trie.insert("apple");
```

- 一种树形结构，主要用于字符串存储与查找。
- 常见于实现自动补全和拼写检查等。

### 1.10 并查集（Union-Find）

#### 示例代码：

```typescript
class UnionFind {
  parent: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
  }

  find(x: number): number {
    if (this.parent[x] === x) return x;
    return (this.parent[x] = this.find(this.parent[x])); // 路径压缩
  }

  union(x: number, y: number): void {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      this.parent[rootX] = rootY;
    }
  }
}

const uf = new UnionFind(5);
uf.union(0, 1);
console.log(uf.find(1)); // 输出 1
```

- 用于处理不相交集合的数据结构。
- 常用于连通性问题，比如社交网络中的好友关系判断等。

### 1.11 布隆过滤器（Bloom Filter）

- 一种基于位数组和哈希函数的概率型数据结构。
- 用于快速判断某元素是否在集合中，但存在误判。

布隆过滤器的代码较复杂，一般需要使用多个哈希函数，可以使用现成的库来实现。
