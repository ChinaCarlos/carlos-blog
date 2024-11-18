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
  let l = 0;
  let r = 0;

  for (let i = 0; i < s.length; i++) {
    helper(i, i);
    helper(i, i + 1);
  }

  function helper(m, n) {
    while (m >= 0 && n < s.length && s[m] == s[n]) {
      m--;
      n++;
    }
    if (n - m > r - l) {
      r = n;
      l = m;
    }
  }
  return s.slice(l + 1, r);
}
```
