---
title: 手写算法题合集
tags: front interview
theme: solarized-dark
---

# LeetCode 经典算法题目整理

## 1. 两数之和

```javascript
function twoSum(nums, target) {
  if (nums.length <= 1) return [];
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [];
}
```

## 2. 最大子序和

```javascript
function maxSubArray(nums) {
  let prev = 0;
  let max = nums[0];
  nums.forEach((value) => {
    prev = Math.max(prev + value, value);
    max = Math.max(prev, max);
  });
  return max;
}
```

## 3. 反转链表

```javascript
function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}
```

## 4. 比较版本号

```javascript
function compareVersion(version1, version2) {
  const arr1 = version1.split(".");
  const arr2 = version2.split(".");
  let maxLength = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < maxLength; i++) {
    if (Number(arr1[i]) > Number(arr2[i])) {
      return 1;
    }
    if (Number(arr1[i]) < Number(arr2[i])) {
      return -1;
    }
    if (i === maxLength - 1) {
      return 0;
    }
  }
}
```

## 5. 合并两个有序数组

```javascript
function mergeSortArray(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  while (i >= 0 || j >= 0) {
    if (i < 0) nums1[k--] = nums2[j--];
    if (j < 0) nums1[k--] = nums1[i--];
    if (nums1[i] < nums2[j]) nums1[k--] = nums2[j--];
    else nums1[k--] = nums1[i--];
  }
}
```

## 6. 无重复字符的最长子串

```javascript
function lengthOfLongestSubstring(s) {
  let max = 0;
  let startIndex = 0;
  let map = new Map();

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      startIndex = map.get(s[i]) + 1;
    }
    max = Math.max(i - startIndex + 1, max);
    map.set(s[i], i);
  }
  return max;
}
```

## 7. 有效的括号

```javascript
function validParenthesis(s) {
  const map = {
    "}": "{",
    "]": "[",
    ")": "(",
  };
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (stack.length && stack[stack.length - 1] === map[s[i]]) {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }
  return !stack.length;
}
```

## 8. LRU 缓存机制

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity; // 缓存的最大容量
    this.cache = new Map(); // 使用 Map 存储缓存数据
  }

  // 获取缓存数据
  get(key) {
    if (!this.cache.has(key)) {
      return -1; // 如果缓存中没有该数据，则返回 -1
    }
    // 如果数据存在，先删除再重新插入（表示该数据被访问过，更新为最近使用）
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  // 设置缓存数据
  put(key, value) {
    // 如果缓存已满，删除最旧的数据
    if (this.cache.size >= this.capacity) {
      // Map 的 keys() 返回插入顺序，删除第一个元素
      this.cache.delete(this.cache.keys().next().value);
    }
    // 如果已经存在这个 key，删除旧值并插入新值
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // 插入新数据到缓存
    this.cache.set(key, value);
  }
}

// 测试代码
const lru = new LRUCache(2);
lru.put(1, 1); // 缓存 {1=1}
lru.put(2, 2); // 缓存 {1=1, 2=2}
console.log(lru.get(1)); // 返回 1，缓存 {2=2, 1=1}
lru.put(3, 3); // 缓存已满，删除最久未使用的 2，缓存 {1=1, 3=3}
console.log(lru.get(1)); // 返回 -1 (未找到)
lru.put(4, 4); // 缓存 {3=3, 4=4}
console.log(lru.get(2)); // 返回 -1 (未找到)
console.log(lru.get(3)); // 返回 3
console.log(lru.get(4)); // 返回 4
```

## 9. 买卖股票的最佳时机

```javascript
function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    minPrice = Math.min(prices[i], minPrice);
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);
  }
  return maxProfit;
}
```

## 10. 最长回文子串

```javascript
function longestPalindrome(s) {
  // 初始化左右边界，表示当前找到的最长回文子串的起始和结束位置
  let l = 0;
  let r = 0;
  // 遍历字符串，以每个字符为中心尝试扩展回文
  for (let i = 0; i < s.length; i++) {
    helper(i, i); // 情况 1：回文子串长度为奇数（以 i 为中心）
    helper(i, i + 1); // 情况 2：回文子串长度为偶数（以 i 和 i+1 为中心）
  }
  // 辅助函数，用于扩展回文子串的左右边界
  function helper(m, n) {
    // 当左右指针范围内的字符相等时，继续向外扩展
    while (m >= 0 && n < s.length && s[m] === s[n]) {
      m--; // 左指针向左移动
      n++; // 右指针向右移动
    }
    // 如果当前回文子串的长度大于之前记录的最长回文子串长度
    if (n - m > r - l) {
      r = n; // 更新右边界
      l = m; // 更新左边界
    }
  }
  // 返回最长回文子串，通过 slice 提取范围 [l+1, r)
  return s.slice(l + 1, r);
}
```

## 11. 爬楼梯

#### 1. 正常递归求解，但是时间空间复杂度很差

```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  return climbStairs(n - 1) + climbStairs(n - 2);
}
```

#### 2. 利用数组缓存值

```javascript
function climbStairs(n) {
  let result = [1, 2];
  for (let i = 2; i < n; i++) {
    result[i] = result[i - 1] + result[i - 2];
  }
  return result.pop();
}
```

#### 3. 动态规划求解

```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1;
  let b = 2;
  let sum = 0;
  for (let i = 2; i < n; i++) {
    sum = a + b;
    a = b;
    b = sum;
  }
  return sum;
}
```

## 12. 三数之和

```javascript
function threeSum(nums) {
  // 如果数组为空或长度小于等于2，不可能组成三元组，直接返回
  if (!nums || nums.length <= 2) return nums;
  // 将数组排序，便于后续双指针查找
  nums.sort((a, b) => a - b);
  // 定义结果数组，用于存放满足条件的三元组
  let result = [];
  // 遍历数组，固定第一个数 nums[i]
  for (let i = 0; i < nums.length; i++) {
    // 如果 nums[i] > 0，后面的数都大于 0，三数之和不可能为 0，直接退出循环
    if (nums[i] > 0) break;
    // 如果当前数和前一个数相同，跳过，避免重复三元组
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    // 定义左右指针
    let L = i + 1; // 左指针初始化为当前数之后的第一个数
    let R = nums.length - 1; // 右指针初始化为数组最后一个数
    // 开始双指针查找
    while (L < R) {
      // 计算三数之和
      const sum = nums[i] + nums[L] + nums[R];
      if (sum === 0) {
        // 如果三数之和为 0，将三元组加入结果数组
        result.push([nums[i], nums[L], nums[R]]);
        // 跳过重复的右指针值，避免重复三元组
        while (L < R && nums[R] === nums[R - 1]) {
          R--;
        }
        // 跳过重复的左指针值，避免重复三元组
        while (L < R && nums[L] === nums[L + 1]) {
          L++;
        }
        // 左指针右移，右指针左移，继续检查其他可能的三元组
        L++;
        R--;
      } else if (sum > 0) {
        // 如果三数之和大于 0，说明右指针的值过大，右指针左移
        R--;
      } else {
        // 如果三数之和小于 0，说明左指针的值过小，左指针右移
        L++;
      }
    }
  }
  // 返回结果数组
  return result;
}
```

## 13. 环形链表

```javascript
function hasCycle(head) {
  // 定义两个指针，slow 和 fast，均初始化为链表的头节点
  let slow = head;
  let fast = head;
  // 当快指针和快指针的下一个节点不为空时，继续循环
  while (fast && fast.next) {
    // 慢指针每次移动一步
    slow = slow.next;
    // 快指针每次移动两步
    fast = fast.next.next;
    // 如果快慢指针相遇，说明链表中存在环
    if (slow === fast) return true;
  }
  // 如果循环结束，说明快指针到达链表末尾，没有环
  return false;
}
```

## 14. 二叉树的层序遍历

```javascript
function levelOrder(root) {
  // 如果根节点为空，返回空数组，表示没有任何层级
  if (!root) return [];
  // 初始化结果数组，用于存储每一层的节点值
  let result = [];
  // 使用队列实现层序遍历，初始队列包含根节点
  let queue = [root];
  // 当队列不为空时，持续处理队列中的节点
  while (queue.length) {
    // 用于存储当前层的节点值
    let levelNodes = [];
    // 获取当前层的节点数量
    let levelNodeSize = queue.length;
    // 遍历当前层的所有节点
    for (let i = 0; i < levelNodeSize; i++) {
      // 从队列中取出一个节点
      const node = queue.shift();
      // 将该节点的值加入当前层的结果中
      levelNodes.push(node.val);
      // 如果左子节点存在，将其加入队列
      if (node.left) queue.push(node.left);
      // 如果右子节点存在，将其加入队列
      if (node.right) queue.push(node.right);
    }
    // 将当前层的节点值加入最终结果中
    result.push(levelNodes);
  }
  // 返回结果数组，包含所有层的节点值
  return result;
}
```

## 15. 路径总和

#### 1. 通过递归

```javascript
function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right && root.val === targetSum) return true;
  const nextTargetSum = targetSum - root.val;
  return (
    hasPathSum(root.left, nextTargetSum) ||
    hasPathSum(root.right, nextTargetSum)
  );
}
```

#### 2. 通过 `BFS`

```javascript
function hasPathSum(root, targetSum) {
  if (!root) return false;
  let queue = [[root, root.val]];
  while (queue.length) {
    const [node, currentSum] = queue.shift();
    if (!node.left && !node.right && currentSum === targetSum) return true;
    if (node.left) queue.push([node.left, node.left.val + currentSum]);
    if (node.right) queue.push([node.right, node.right.val + currentSum]);
  }
  return false;
}
```
