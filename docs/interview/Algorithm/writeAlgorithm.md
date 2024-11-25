---
title: 手写算法题合集
tags: front interview
theme: solarized-dark
---

# LeetCode 经典算法题目整理

## 1. 两数之和

```javascript
function twoSum(nums, target) {
  // 如果数组长度小于等于 1，则无法找到两数之和，直接返回空数组
  if (nums.length <= 1) return [];
  // 创建一个 Map 用来存储数组中的值及其对应的索引
  const map = new Map();
  // 遍历数组，查找是否存在符合条件的两个数
  for (let i = 0; i < nums.length; i++) {
    // 计算目标值与当前值的差
    const complement = target - nums[i];
    // 检查 Map 中是否存在这个差值
    if (map.has(complement)) {
      // 如果存在，返回该差值对应的索引和当前索引
      return [map.get(complement), i];
    } else {
      // 如果不存在，将当前值和索引存入 Map
      map.set(nums[i], i);
    }
  }
  // 如果遍历结束仍未找到符合条件的两个数，返回空数组
  return [];
}
```

## 2. 最大子序和

```javascript
function maxSubArray(nums) {
  // 初始化 prev 为 0，表示当前子数组的最大和
  let prev = 0;
  // 初始化 max 为数组的第一个元素，表示全局最大子数组的和
  let max = nums[0];
  // 遍历数组的每个元素，逐步更新最大子数组的和
  nums.forEach((value) => {
    // 更新当前子数组的最大和，选择加上当前值或从当前值重新开始
    prev = Math.max(prev + value, value);
    // 更新全局最大子数组的和
    max = Math.max(prev, max);
  });
  // 返回全局最大子数组的和
  return max;
}
```

## 3. 反转链表

```javascript
function reverseList(head) {
  // 初始化 prev 为 null，表示反转后的链表的初始节点
  let prev = null;
  // 初始化 current 为 head，表示当前处理的节点
  let current = head;
  // 遍历链表，直到所有节点被反转
  while (current) {
    // 保存当前节点的下一个节点，防止后续操作导致链表断裂
    const next = current.next;
    // 将当前节点的 next 指向前一个节点，实现反转
    current.next = prev;
    // 更新 prev 为当前节点，用于下一次迭代
    prev = current;
    // 更新 current 为下一个节点，继续迭代
    current = next;
  }
  // 返回反转后的链表头节点
  return prev;
}
```

## 4. 比较版本号

```javascript
function compareVersion(version1, version2) {
  // 将版本号通过 '.' 分隔为数组
  const arr1 = version1.split(".");
  const arr2 = version2.split(".");
  // 计算两个版本号数组的最大长度，确保比较过程中不会漏掉任何部分
  let maxLength = Math.max(arr1.length, arr2.length);
  // 遍历版本号数组的每一部分进行比较
  for (let i = 0; i < maxLength; i++) {
    // 取出当前版本号的第 i 部分，若超出长度则视为 0
    const num1 = Number(arr1[i] || 0);
    const num2 = Number(arr2[i] || 0);
    // 如果第 i 部分的数字 num1 大于 num2，返回 1，表示 version1 大
    if (num1 > num2) {
      return 1;
    }
    // 如果第 i 部分的数字 num1 小于 num2，返回 -1，表示 version2 大
    if (num1 < num2) {
      return -1;
    }
    // 如果两个数字相等，继续比较下一部分
    // 在循环结束后，如果所有部分相等，返回 0 表示两个版本号相同
  }
  // 如果遍历完所有部分未提前返回，说明两个版本号完全相等
  return 0;
}
```

## 5. 合并两个有序数组

```javascript
function mergeSortArray(nums1, m, nums2, n) {
  // 初始化三个指针
  let i = m - 1; // 指向 nums1 有效数字的最后一个位置
  let j = n - 1; // 指向 nums2 的最后一个位置
  let k = m + n - 1; // 指向 nums1 最后一个位置（包括预留的空位）

  // 主循环：将 nums2 和 nums1 中的数字从大到小依次放到 nums1 的末尾
  while (i >= 0 || j >= 0) {
    if (i < 0) {
      // 如果 nums1 用完了，只需将 nums2 的剩余部分填入 nums1
      nums1[k--] = nums2[j--];
    } else if (j < 0) {
      // 如果 nums2 用完了，只需将 nums1 的剩余部分保持原位
      nums1[k--] = nums1[i--];
    } else if (nums1[i] < nums2[j]) {
      // 如果 nums1 当前数字小于 nums2 当前数字，将 nums2 的数字填入
      nums1[k--] = nums2[j--];
    } else {
      // 如果 nums1 当前数字大于等于 nums2 当前数字，将 nums1 的数字填入
      nums1[k--] = nums1[i--];
    }
  }
}
```

## 6. 无重复字符的最长子串

```javascript
function lengthOfLongestSubstring(s) {
  // 初始化 max，用来记录最长无重复子串的长度
  let max = 0;
  // 初始化 startIndex，用来记录当前无重复子串的起始索引
  let startIndex = 0;
  // 初始化 map，用来存储字符及其最近出现的位置
  let map = new Map();

  // 遍历字符串的每一个字符
  for (let i = 0; i < s.length; i++) {
    // 如果当前字符已经在 map 中存在，说明出现重复
    if (map.has(s[i])) {
      // 更新起始索引为重复字符上次出现位置的下一位
      startIndex = Math.max(map.get(s[i]) + 1, startIndex);
    }
    // 更新最长无重复子串的长度
    max = Math.max(i - startIndex + 1, max);
    // 将当前字符及其索引存入 map
    map.set(s[i], i);
  }
  // 返回最长无重复子串的长度
  return max;
}
```

## 7. 有效的括号

```javascript
function validParenthesis(s) {
  // 创建一个映射，用于匹配右括号对应的左括号
  const map = {
    "}": "{",
    "]": "[",
    ")": "(",
  };
  // 用栈来存储遇到的左括号
  const stack = [];

  // 遍历字符串的每个字符
  for (let i = 0; i < s.length; i++) {
    // 如果栈不为空，并且栈顶元素是与当前字符对应的左括号
    if (stack.length && stack[stack.length - 1] === map[s[i]]) {
      // 如果匹配成功，弹出栈顶元素
      stack.pop();
    } else {
      // 如果不匹配，当前字符是一个左括号，将其入栈
      stack.push(s[i]);
    }
  }
  // 如果栈为空，说明所有括号都有匹配，返回 true；否则返回 false
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
  // 初始化最小价格为第一个价格，最大利润为 0
  let minPrice = prices[0];
  let maxProfit = 0;

  // 从第二个价格开始遍历
  for (let i = 1; i < prices.length; i++) {
    // 更新最小价格为当前价格和已有的最小价格之间的较小者
    minPrice = Math.min(prices[i], minPrice);
    // 计算当前利润并更新最大利润
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);
  }

  // 返回最大利润
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
  // 如果根节点为空，直接返回 false，因为没有路径
  if (!root) return false;

  // 如果当前节点是叶子节点，并且路径和等于目标和，返回 true
  if (!root.left && !root.right && root.val === targetSum) return true;

  // 更新目标和，减去当前节点的值
  const nextTargetSum = targetSum - root.val;

  // 递归调用，分别检查左子树和右子树
  return (
    hasPathSum(root.left, nextTargetSum) || // 检查左子树
    hasPathSum(root.right, nextTargetSum)   // 检查右子树
  );
}
```

#### 2. 通过 `BFS`

```javascript
function hasPathSum(root, targetSum) {
  // 如果根节点为空，直接返回 false，因为没有路径
  if (!root) return false;
  // 初始化队列，队列中的元素为 [节点, 当前路径和]
  let queue = [[root, root.val]];
  // 遍历队列，直到队列为空
  while (queue.length) {
    // 从队列中取出当前节点和当前路径和
    const [node, currentSum] = queue.shift();
    // 如果当前节点是叶子节点，并且路径和等于目标和，返回 true
    if (!node.left && !node.right && currentSum === targetSum) return true;
    // 如果左子节点存在，将左子节点和更新后的路径和加入队列
    if (node.left) queue.push([node.left, node.left.val + currentSum]);
    // 如果右子节点存在，将右子节点和更新后的路径和加入队列
    if (node.right) queue.push([node.right, node.right.val + currentSum]);
  }
  // 如果队列遍历完成，仍未找到符合条件的路径，返回 false
  return false;
}
```

## 16. 全排列

```javascript
function permute(nums) {
  // 用来存储所有的排列结果
  const result = [];
  // 用来记录已访问的元素，防止重复选择
  const visited = new Set();

  // 深度优先搜索递归函数
  function dfs(paths) {
    // 当路径长度等于输入数组的长度时，说明找到了一个排列
    if (paths.length === nums.length) {
      result.push([...paths]); // 将当前路径加入结果
      return;
    }

    // 遍历 nums 中的每个元素
    for (let i = 0; i < nums.length; i++) {
      // 如果当前元素已经被访问过，则跳过
      if (visited.has(nums[i])) continue;

      // 标记当前元素为已访问
      visited.add(nums[i]);
      // 将当前元素添加到路径中
      paths.push(nums[i]);
      // 递归调用，继续生成下一个元素
      dfs(paths);
      // 回溯：撤销选择
      visited.delete(nums[i]);
      paths.pop(); // 移除最后一个元素
    }
  }

  // 从空路径开始进行深度优先搜索
  dfs([]);
  // 返回所有的排列结果
  return result;
}
```

## 17. 搜索二维矩阵 II

```javascript
function searchMatrix(matrix, target) {
  // 获取矩阵的行数和列数
  let m = matrix.length;
  let n = matrix[0].length;

  // 从矩阵的右上角开始搜索，初始化行索引和列索引
  let i = 0; // 行索引，从第一行开始
  let j = n - 1; // 列索引，从最后一列开始

  // 循环条件：行索引不越界且列索引不越界
  while (i < m && j >= 0) {
    // 如果当前元素等于目标值，返回 true
    if (matrix[i][j] === target) {
      return true;
    } 
    // 如果当前元素小于目标值，说明目标值在当前元素的下方，移动到下一行
    else if (matrix[i][j] < target) {
      i++;
    } 
    // 如果当前元素大于目标值，说明目标值在当前元素的左边，移动到前一列
    else {
      j--;
    }
  }

  // 如果循环结束仍未找到目标值，返回 false
  return false;
}
```
## 18. 旋转图像

#### 1. 先水平翻转，在沿对角线翻转
```javascript
function rotate(matrix) {
  const n = matrix.length; // 矩阵的大小（n x n）
  
  // 第一步：上下翻转矩阵
  for (let i = 0; i < Math.floor(n / 2); i++) { // 遍历矩阵的前一半行（上下对称行）
    for (let j = 0; j < n; j++) { // 遍历每一行中的所有列
      // 交换当前行 `i` 和对称行 `n - i - 1` 的元素
      [matrix[i][j], matrix[n - i - 1][j]] = [
        matrix[n - i - 1][j],
        matrix[i][j],
      ];
    }
  }

  // 第二步：沿主对角线（左上到右下）翻转矩阵
  for (let i = 0; i < n; i++) { // 遍历矩阵的每一行
    for (let j = 0; j < i; j++) { // 遍历主对角线左下方的元素
      // 交换对称位置的元素，使矩阵沿主对角线翻转
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  return matrix; // 返回翻转后的矩阵
}
```

#### 2. 原地旋转

```javascript
function rotate(matrix) {
  const n = matrix.length; // 矩阵的边长（n x n）
  
  // 遍历矩阵的每个"块"并进行旋转
  // 外层循环：控制行的遍历范围（只需遍历前一半的行）
  for (let i = 0; i < Math.floor(n / 2); ++i) { 
    // 内层循环：控制列的遍历范围（每行只需遍历左半部分或包含中轴）
    for (let j = 0; j < Math.floor((n + 1) / 2); ++j) { 
      const temp = matrix[i][j]; // 暂存当前元素（左上角）
      
      // 四元素旋转，依次将对应位置的值赋到目标位置
      matrix[i][j] = matrix[n - j - 1][i]; // 左下角 -> 左上角
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1]; // 右下角 -> 左下角
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1]; // 右上角 -> 右下角
      matrix[j][n - i - 1] = temp; // 左上角（暂存值） -> 右上角
    }
  }

  return matrix; // 返回旋转后的矩阵
}
```

## 19.螺旋矩阵

```javascript
function spiralOrder(matrix) {
  if (matrix.length == 0) return []; // 如果矩阵为空，直接返回空数组
  let result = []; // 用于存储按螺旋顺序的结果
  let left = 0; // 左边界的初始值
  let bottom = matrix.length - 1; // 底边界的初始值
  let top = 0; // 上边界的初始值
  let right = matrix[0].length - 1; // 右边界的初始值

  // 开始遍历，条件是边界范围有效
  while (left <= right && top <= bottom) {
    // 从左到右遍历当前顶边
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++; // 顶边向下收缩

    // 从上到下遍历当前右边
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--; // 右边向左收缩

    // 如果边界越界，跳出循环
    if (left > right || top > bottom) break;

    // 从右到左遍历当前底边
    for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
    bottom--; // 底边向上收缩

    // 从下到上遍历当前左边
    for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
    left++; // 左边向右收缩
  }

  return result; // 返回结果数组
}
```