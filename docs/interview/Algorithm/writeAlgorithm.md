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
    hasPathSum(root.right, nextTargetSum) // 检查右子树
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
  for (let i = 0; i < Math.floor(n / 2); i++) {
    // 遍历矩阵的前一半行（上下对称行）
    for (let j = 0; j < n; j++) {
      // 遍历每一行中的所有列
      // 交换当前行 `i` 和对称行 `n - i - 1` 的元素
      [matrix[i][j], matrix[n - i - 1][j]] = [
        matrix[n - i - 1][j],
        matrix[i][j],
      ];
    }
  }

  // 第二步：沿主对角线（左上到右下）翻转矩阵
  for (let i = 0; i < n; i++) {
    // 遍历矩阵的每一行
    for (let j = 0; j < i; j++) {
      // 遍历主对角线左下方的元素
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

## 20. 颜色转化

```javascript
const HexToRgb = (hex) => {
  const hexRegExp = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i; // 定义正则表达式，匹配3位或6位的十六进制颜色值
  if (!hexRegExp.test(hex)) return null; // 如果输入的hex格式不正确，返回null

  let hexChar = hex.slice(1); // 去掉颜色字符串中的‘#’符号

  if (hexChar.length === 3) {
    // 如果是3位的简写形式，扩展成6位
    hexChar = hexChar
      .split("") // 将字符串分割为单字符数组
      .map((char) => char + char) // 每个字符重复一次
      .join(""); // 重新拼接成字符串
  }

  const r = parseInt(hexChar.slice(0, 2), 16); // 提取并将前两位转换为红色分量
  const g = parseInt(hexChar.slice(2, 4), 16); // 提取并将中间两位转换为绿色分量
  const b = parseInt(hexChar.slice(4, 6), 16); // 提取并将后两位转换为蓝色分量

  return `rgb(${r},${g},${b})`; // 返回RGB颜色格式的字符串
};

console.log(HexToRgb("#fff")); // 测试短格式十六进制颜色
console.log(HexToRgb("#eeeeee")); // 测试长格式十六进制颜色
console.log(HexToRgb("#ff5733")); // 测试标准长格式十六进制颜色

const rgbToHex = (r, g, b) => {
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    // 检查RGB每个分量是否在有效范围内
    throw Error("Invalid RGB values"); // 如果超出范围，抛出错误
  }

  const toHex = (num) => {
    return num.toString(16).padStart(2, "0"); // 将数字转换为两位的十六进制字符串
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`; // 拼接并返回十六进制颜色字符串
};

console.log(rgbToHex(0, 0, 0)); // 测试黑色RGB转十六进制
```

## 21. 二叉树的右视图

```javascript
function rightSideView(root) {
  let result = []; // 存储右视图的节点值
  const queue = [root]; // 初始化队列，用于层序遍历
  while (queue.length && root) { // 当队列不为空且根节点存在时，继续遍历
    const size = queue.length; // 当前层的节点数量
    for (let i = 0; i < size; i++) { // 遍历当前层的所有节点
      const node = queue.shift(); // 从队列中取出当前节点
      if (node.left) { // 如果当前节点有左子节点，将其加入队列
        queue.push(node.left);
      }
      if (node.right) { // 如果当前节点有右子节点，将其加入队列
        queue.push(node.right);
      }
      if (i === size - 1) { // 如果是当前层的最后一个节点
        result.push(node.val); // 将该节点的值加入结果数组
      }
    }
  }
  return result; // 返回右视图的节点值数组
}
// 递归解法
function rightSideView(root) {
  const result = []; // 存储右视图的节点值
  function dfs(node, deepPath) {
    if (!node) return null; // 如果当前节点为空，直接返回
    if (deepPath === result.length) { // 如果当前深度尚未有值，则记录该节点的值
      result.push(node.val);
    }
    dfs(node.right, deepPath + 1); // 优先递归遍历右子树
    dfs(node.left, deepPath + 1); // 然后递归遍历左子树
  }
  dfs(root, 0); // 从根节点开始深度优先遍

```

## 22. 二叉树的最近公共祖先

```javascript
function lowestCommonAncestor(root, p, q) {
  if (!root || p === root || q === root) return root; // 如果当前节点为空，或等于p或q，则直接返回当前节点

  const left = lowestCommonAncestor(root.left, p, q); // 在左子树中查找p和q的最近公共祖先
  const right = lowestCommonAncestor(root.right, p, q); // 在右子树中查找p和q的最近公共祖先

  if (left && right) return root; // 如果p和q分别位于当前节点的左右子树，则当前节点为最近公共祖先

  return left || right; // 如果仅在某一侧找到p或q，则返回该侧的节点；否则返回null
}
```

## 23. 二叉树最大宽度

```javascript
function widthOfBinaryTree(root) {
  if (!root) return 0; // 如果根节点为空，宽度为0

  let maxWidth = 0; // 用于存储二叉树的最大宽度
  let queue = [[root, 0]]; // 初始化队列，存储节点和其对应的索引，根节点索引为0

  while (queue.length) {
    // 当队列不为空时，继续遍历
    const size = queue.length; // 当前层的节点数量
    let startIndex = queue[0][1]; // 当前层的起始索引
    let endIndex = startIndex; // 当前层的终止索引，初始为起始索引
    for (let i = 0; i < size; i++) {
      // 遍历当前层的所有节点
      const [node, index] = queue.shift(); // 从队列中取出当前节点和其索引
      endIndex = index; // 更新终止索引为当前节点的索引

      if (node.left) queue.push([node.left, 2 * index]); // 左子节点的索引为2 * index
      if (node.right) queue.push([node.right, 2 * index + 1]); // 右子节点的索引为2 * index + 1
    }
    const currentWidth = endIndex - startIndex + 1; // 计算当前层的宽度
    maxWidth = Math.max(currentWidth, maxWidth); // 更新最大宽度
  }

  return maxWidth; // 返回二叉树的最大宽度
}
```

## 24. 翻转二叉树

```javascript
// 1. 递归实现
function invertTree(root) {
  if (!root) return null; // 如果节点为空，返回null

  const temp = root.left; // 暂存左子树
  root.left = root.right; // 将右子树赋值给左子树
  root.right = temp; // 将原来的左子树赋值给右子树

  invertTree(root.left); // 递归翻转左子树
  invertTree(root.right); // 递归翻转右子树

  return root; // 返回翻转后的根节点
}
// 2. 迭代队列实现
function invertTree(root) {
  if (!root) return null; // 如果节点为空，返回null

  let queue = [root]; // 初始化队列，存储待处理节点

  while (queue.length) {
    // 当队列不为空时，继续处理
    const node = queue.shift(); // 从队列中取出当前节点

    const temp = node.left; // 暂存左子树
    node.left = node.right; // 将右子树赋值给左子树
    node.right = temp; // 将原来的左子树赋值给右子树

    if (node.left) queue.push(node.left); // 如果左子树存在，加入队列
    if (node.right) queue.push(node.right); // 如果右子树存在，加入队列
  }

  return root; // 返回翻转后的根节点
}
```

## 25. 合并两个有序链表

```javascript
// 方法 1：递归实现
function mergeTwoLists(list1, list2) {
  if (!list1) return list2; // 如果 list1 为空，返回 list2
  if (!list2) return list1; // 如果 list2 为空，返回 list1

  if (list1.val < list2.val) {
    // 如果 list1 的节点值小于 list2 的节点值
    list1.next = mergeTwoLists(list1.next, list2); // 递归合并 list1 的下一个节点和 list2
    return list1; // 返回当前的 list1 节点
  } else {
    // 如果 list2 的节点值小于或等于 list1 的节点值
    list2.next = mergeTwoLists(list1, list2.next); // 递归合并 list1 和 list2 的下一个节点
    return list2; // 返回当前的 list2 节点
  }
}

// 方法 2：迭代实现
function mergeTwoLists2(list1, list2) {
  let link = { val: -1, next: null }; // 创建一个虚拟头节点，用于简化操作
  let current = link; // 指针指向当前处理的节点位置

  while (list1 && list2) {
    // 当 list1 和 list2 都不为空时，继续比较
    if (list1.val < list2.val) {
      // 如果 list1 的节点值小于 list2 的节点值
      current.next = list1; // 将 list1 的当前节点接到结果链表中
      list1 = list1.next; // 移动 list1 的指针到下一个节点
    } else {
      // 如果 list2 的节点值小于或等于 list1 的节点值
      current.next = list2; // 将 list2 的当前节点接到结果链表中
      list2 = list2.next; // 移动 list2 的指针到下一个节点
    }
    current = current.next; // 移动结果链表的指针到最新的节点
  }

  current.next = list1 ?? list2; // 将剩余的 list1 或 list2 接到结果链表的末尾
  return link.next; // 返回结果链表的头节点（跳过虚拟头节点）
}
```

## 26. 合并 K 个升序链表

```javascript
function mergeKLists(lists) {
  if (!lists.length) return null; // 如果链表数组为空，返回 null

  // 合并两个有序链表的递归函数
  const mergeTowList = (list1, list2) => {
    if (!list1) return list2; // 如果第一个链表为空，返回第二个链表
    if (!list2) return list1; // 如果第二个链表为空，返回第一个链表

    if (list1.val < list2.val) {
      // 如果 list1 的当前值小于 list2
      list1.next = mergeTowList(list1.next, list2); // 递归合并 list1 的下一个节点和 list2
      return list1; // 返回 list1 作为结果链表的当前节点
    } else {
      // 如果 list2 的当前值小于或等于 list1
      list2.next = mergeTowList(list1, list2.next); // 递归合并 list1 和 list2 的下一个节点
      return list2; // 返回 list2 作为结果链表的当前节点
    }
  };

  // 分治法合并链表的函数
  const merge = (lists, left, right) => {
    if (left === right) return lists[left]; // 如果左右边界相等，直接返回对应链表
    const mid = Math.floor((left + right) / 2); // 找到中点
    const l1 = merge(lists, left, mid); // 递归合并左半部分
    const l2 = merge(lists, mid + 1, right); // 递归合并右半部分

    return mergeTowList(l1, l2); // 合并左右两部分
  };

  return merge(lists, 0, lists.length - 1); // 调用分治合并函数，范围从 0 到链表数组的长度减 1
}
```

## 26. 和为 K 的子数组

```javascript
function subarraySum(nums, k) {
  let count = 0; // 用于记录满足条件的子数组数量
  let prefixSums = new Map(); // 用于存储前缀和及其出现的次数
  let prefixSum = 0; // 当前的前缀和

  prefixSums.set(0, 1); // 初始化，前缀和为0出现一次，用于处理子数组本身等于k的情况

  for (const num of nums) {
    // 遍历数组
    prefixSum += num; // 更新当前前缀和

    if (prefixSums.has(prefixSum - k)) {
      // 检查是否存在满足条件的前缀和
      count += prefixSums.get(prefixSum - k); // 累加满足条件的前缀和出现次数
    }

    prefixSums.set(prefixSum, (prefixSums.get(prefixSum) || 0) + 1); // 更新当前前缀和的出现次数
  }

  return count; // 返回满足条件的子数组数量
}
```

## 27. 缺失的第一个正数

```javascript
// 方法 1：标记法实现

var firstMissingPositive = function (nums) {
  if (nums.indexOf(1) === -1) return 1; // 如果数组中没有1，则返回1

  // 将所有小于等于0或大于数组长度的值替换为1
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= 0 || nums[i] > nums.length) {
      nums[i] = 1;
    }
  }

  // 使用负数标记数组中的数是否出现过
  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1; // 获取对应的索引
    nums[index] = -Math.abs(nums[index]); // 将对应索引的值设为负数，表示出现过
  }

  // 找到第一个值为正数的位置，其索引+1即为结果
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      return i + 1;
    }
  }

  // 如果所有位置都被标记为负数，返回数组长度+1
  return nums.length + 1;
};

//  2：原地哈希实现

function firstMissingPositive(nums) {
  const n = nums.length; // 数组长度

  if (!nums.includes(1)) return 1; // 如果数组中没有1，直接返回1

  // 将所有不合法的数（小于等于0或大于数组长度）替换为1
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[nums[i] - 1]) {
      const temp = nums[i]; // 暂存当前值
      nums[i] = nums[temp - 1]; // 将值交换到正确位置
      nums[temp - 1] = temp; // 完成交换
    }
  }

  // 遍历数组，找到第一个不匹配的值，其索引+1即为结果
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  // 如果所有位置都匹配，返回数组长度+1
  return nums.length + 1;
}
```

## 28. 删除有序数组中的重复项

```javascript
function removeDuplicates(nums) {
  let slow = 0; // 慢指针，用于标记当前没有重复的元素的最后位置
  let fast = 1; // 快指针，用于遍历数组

  // 遍历数组，快指针逐步向前移动
  while (fast <= nums.length - 1) {
    if (nums[slow] !== nums[fast]) {
      // 如果慢指针和快指针指向的值不同
      nums[slow + 1] = nums[fast]; // 将快指针指向的元素移动到慢指针后面
      slow++; // 慢指针向前移动一位
    }
    fast++; // 快指针向前移动一位
  }

  return nums.slice(0, slow + 1); // 返回去重后的数组
}
```

## 29. Z 字形变换

```javascript
function convert(s, numRows) {
  if (numRows <= 1) return s; // 如果行数小于等于1，返回原字符串

  let row = 0; // 当前所在行
  let down = true; // 方向标志，true 表示向下，false 表示向上

  let result = new Array(numRows).fill(""); // 创建一个包含 numRows 个空字符串的数组，用于存储每行的字符

  for (let i = 0; i < s.length; i++) {
    // 遍历输入字符串
    result[row] += s[i]; // 将当前字符添加到当前行的对应位置

    if (down) {
      // 如果是向下遍历
      row++; // 向下移动到下一行
    } else {
      // 如果是向上遍历
      row--; // 向上移动到上一行
    }

    if (row === 0) {
      // 如果到达第一行
      down = true; // 切换为向下遍历
    }
    if (row === numRows - 1) {
      // 如果到达最后一行
      down = false; // 切换为向上遍历
    }
  }

  return result.join(""); // 将所有行的字符串合并成一个结果并返回
}
```

## 30. 最长公共前缀

```javascript
function longestCommonPrefix(strs) {
  if (!strs.length || !strs) return ""; // 如果输入数组为空或为 null，返回空字符串

  let prefix = strs[0]; // 以第一个字符串作为初始前缀

  for (let i = 1; i < strs.length; i++) {
    // 遍历剩余的字符串
    // 当当前字符串不以当前前缀开始时，缩短前缀
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1); // 删除前缀的最后一个字符
      if (!prefix) return ""; // 如果前缀为空，则返回空字符串
    }
  }

  return prefix; // 返回最长公共前缀
}
```

## 31. 删除字符串中的所有相邻重复项

```javascript
function removeDuplicates(s) {
  let stack = []; // 创建一个栈，用于存储不重复的字符

  for (let i = 0; i < s.length; i++) {
    // 遍历字符串中的每个字符
    if (s[i] === stack[stack.length - 1]) {
      // 如果当前字符与栈顶字符相同，表示找到了一对相邻的重复字符
      stack.pop(); // 弹出栈顶元素（删除这对重复字符）
    } else {
      stack.push(s[i]); // 如果当前字符不重复，推入栈中
    }
  }

  return stack.join(""); // 将栈中的字符连接成一个新的字符串并返回
}

console.log(removeDuplicates("abbaca")); // 输出 "ca"
```

## 32. 删除字符串中的所有相邻重复项 II

```javascript
function removeDuplicates(s, k) {
  const stack = []; // 用于存储字符
  const countStack = []; // 用于存储字符的计数
  let i = 0;

  while (i < s.length) {
    // 遍历字符串的每个字符
    if (stack[stack.length - 1] === s[i]) {
      // 如果栈顶字符与当前字符相同
      stack.push(s[i]); // 将当前字符压入栈
      countStack[countStack.length - 1] = countStack[countStack.length - 1] + 1; // 更新栈顶字符的计数
      if (countStack[countStack.length - 1] === k) {
        // 如果栈顶字符的计数达到k
        for (let j = 0; j < k; j++) {
          // 移除栈顶k个字符
          stack.pop();
        }
        countStack.pop(); // 同时也移除计数栈的计数
      }
    } else {
      // 如果栈顶字符与当前字符不同
      stack.push(s[i]); // 将当前字符压入栈
      countStack.push(1); // 计数栈中该字符的计数为1
    }
    i++; // 移动到下一个字符
  }

  return stack.join(""); // 返回去除重复字符后的结果字符串
}
```

## 33. 盛最多水的容器

```javascript
function maxArea(height) {
  let left = 0; // 初始化左指针，指向数组的起始位置
  let right = height.length - 1; // 初始化右指针，指向数组的末尾位置
  let currentMaxArea = 0; // 用于存储当前的最大水量

  while (left < right) {
    // 当左指针小于右指针时，继续计算
    // 计算当前容器的水量，更新最大水量
    currentMaxArea = Math.max(
      currentMaxArea,
      (right - left) * Math.min(height[left], height[right])
    );

    // 如果左边的高度小于右边的高度，则移动左指针，试图找到更大的高度
    if (height[left] < height[right]) {
      left++;
    } else {
      // 否则，移动右指针，试图找到更大的高度
      right--;
    }
  }

  return currentMaxArea; // 返回最终计算得到的最大水量
}
```

## 34. 最大子序和

```javascript
function maxSubArray(nums) {
  let maxSum = nums[0]; // 初始化最大和为数组的第一个元素
  let currentSum = nums[0]; // 当前子数组的和初始化为第一个元素

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]); // 计算当前子数组的最大和
    maxSum = Math.max(maxSum, currentSum); // 更新全局最大和
  }

  return maxSum; // 返回最大子序和
}
```

## 35. 接雨水

```javascript
function trap(height) {
  if (!height || height.length < 3) return 0; // 如果数组为空或长度小于3，无法接水

  let left = 0; // 左指针
  let right = height.length - 1; // 右指针
  let leftMax = height[left]; // 左侧最大高度
  let rightMax = height[right]; // 右侧最大高度
  let waterTrapped = 0; // 初始化接水量

  while (left < right) {
    if (height[left] < height[right]) {
      // 如果左边的柱子较低
      if (height[left] >= leftMax) {
        // 更新左侧最大高度
        leftMax = height[left];
      } else {
        // 否则，计算接水量
        waterTrapped += leftMax - height[left];
      }
      left++; // 移动左指针
    } else {
      // 如果右边的柱子较低
      if (height[right] >= rightMax) {
        // 更新右侧最大高度
        rightMax = height[right];
      } else {
        // 否则，计算接水量
        waterTrapped += rightMax - height[right];
      }
      right--; // 移动右指针
    }
  }

  return waterTrapped; // 返回接到的水量
}
```

## 36. N 皇后

```javascript
function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill(".")); // 初始化棋盘
  const cols = new Set(); // 存储列冲突
  const diag1 = new Set(); // 存储主对角线冲突
  const diag2 = new Set(); // 存储副对角线冲突

  function backtrack(row) {
    if (row === n) {
      // 如果所有行都已填充皇后，找到一个解
      result.push(board.map((row) => row.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      // 检查当前列和两个对角线是否有冲突
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue;
      }

      // 放置皇后
      board[row][col] = "Q";
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      // 递归尝试在下一行放置皇后
      backtrack(row + 1);

      // 回溯，撤销当前选择
      board[row][col] = ".";
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  backtrack(0); // 从第0行开始
  return result; // 返回所有解
}
```

## 37. 二叉树的最大深度

```javascript
function maxDepth(root) {
  if (!root) return 0; // 如果根节点为空，深度为0

  // 递归计算左子树和右子树的深度，取较大的值
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  // 当前树的最大深度是左子树和右子树深度的最大值加1
  return Math.max(leftDepth, rightDepth) + 1;
}
```

## 38. 最长连续序列

```javascript
function longestConsecutive(nums) {
  if (nums.length === 0) return 0;

  const numSet = new Set(nums); // 使用集合来存储数组元素，查找复杂度为 O(1)

  let longest = 0;

  for (let num of numSet) {
    // 只有当 `num - 1` 不在集合中时，才是可能的序列的起始元素
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      // 尝试扩展序列
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }

      // 更新最长连续序列的长度
      longest = Math.max(longest, currentLength);
    }
  }

  return longest;
}
```

## 39. 只出现一次的数字

```javascript
function singleNumber(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num; // 将所有元素进行异或
  }
  return result;
}
```

## 40. 复原 IP 地址

```javascript
function restoreIpAddresses(s) {
  const result = [];

  // 判断某个子字符串是否是有效的 IP 地址段
  const isValid = (str) => {
    if (str.length > 1 && str[0] === "0") return false; // 不能有前导零
    const num = Number(str);
    return num >= 0 && num <= 255; // 必须在 0 到 255 之间
  };

  // 回溯函数
  const backtrack = (start, path) => {
    // 如果已经分割成 4 段且遍历完所有字符，则是一个有效的 IP 地址
    if (path.length === 4 && start === s.length) {
      result.push(path.join("."));
      return;
    }

    // 如果已经分割成 4 段但还没遍历完字符，说明无效
    if (path.length === 4) return;

    // 尝试每一段长度为 1 到 3 的子串
    for (let len = 1; len <= 3; len++) {
      const segment = s.substring(start, start + len);
      if (start + len > s.length) break;

      if (isValid(segment)) {
        path.push(segment); // 选择当前段
        backtrack(start + len, path); // 继续递归分割剩余部分
        path.pop(); // 撤销选择
      }
    }
  };

  // 如果输入字符串长度不在 4 到 12 之间，直接返回空数组
  if (s.length < 4 || s.length > 12) return result;

  backtrack(0, []); // 从第 0 个字符开始回溯
  return result;
}
```

## 41. 二叉树的直径

```javascript
function diameterOfBinaryTree(root) {
  let maxDiameter = 0; // 用于保存最大直径

  // 递归计算树的深度并更新最大直径
  function depth(node) {
    if (!node) return 0; // 空节点深度为0

    const leftDepth = depth(node.left); // 左子树的深度
    const rightDepth = depth(node.right); // 右子树的深度

    // 更新最大直径：当前节点的直径为左子树深度 + 右子树深度
    maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth);

    // 当前节点的深度是左子树和右子树深度的最大值加1
    return Math.max(leftDepth, rightDepth) + 1;
  }

  depth(root); // 从根节点开始递归计算
  return maxDiameter; // 返回最终的最大直径
}
```
