# [深入]js数组所有内置方法简述以及手动实现



### concat

用于连接数组，但是不会改变数组，会返回一个连接后的结果数组

参数：可以是数组也可以是非数组

#### 例子🌰

```javascript
let a = [1, 2, 3]
let b = [4,5]
let c = [6,7,8,9]
a.concat(b, c) // [1,2,3,4,5,6,7,8,9]
```

#### 简单实现

```javascript
Array.prototype.concat2 = function (...arrays) {
  let copy = this.slice(0) // 不用深度拷贝，因为原concat也没有深度拷贝
  for (let i = 0; i < arrays.length; i++) {
    const item = arrays[i]
    if (!Array.isArray(item)) { // 不是数组直接push进copy
      copy.push(item)
    } else { // 数组的话递归concat进行连接
      for (let j = 0; j < item.length; j++) {
        copy = copy.concat2(item[j])
      }
    }
  }
  return copy
}
```

时间复杂度: 大概是O(n)

### copyWithin

用于拷贝数组的元素到原数组的另一个指定位置，会改变原数组。`IE 11 及更早版本不支持 copyWithin() 方法`

| 参数          | 描述                                           |
| ------------- | ---------------------------------------------- |
| target:Number | 拷贝的目标位置(必须)                           |
| start:Number  | 需要拷贝元素的开始位置（非必须，默认是0）      |
| end:Number    | 需要拷贝元素的结束位置（非必须，默认是length） |

#### 例子🌰

```javascript
let a = [1,2,3,4,5,6]
a.copyWithin(2, 0, 1) // [1,2,1,4,5,6]
```

#### 简单实现

```javascript
Array.prototype.copyWithin2 = function (target, start, end) {
  start = start || 0
  end = end || this.length
  const copy = []
  for (let i = start; i < end; i++) {
    copy.push(this[i])
  }
  const len = this.length > copy.length ? copy.length : this.length // 判断需要遍历赋值的最长长度
  for (let i = 0, j = target; i < len; i++, j++) {
    if (j >= this.length) {
      break
    }
    this[j] = copy[i]
  }
  return this
}
```

### entries

返回数组的`可迭代对象`，不会修改源数组

`可迭代对象`：这里推荐看阮一峰老师的[Iterator 和 for...of 循环](https://es6.ruanyifeng.com/#docs/iterator)

#### 例子🌰

```javascript
let a = ['123', '456', '789']
let b = a.entries()
b.next() // {value: [0, '123'], done: false}
for (let v of b) {
  console.log(v)
}
// [1, '456']
// [2, '789']
```

#### 简单实现

```javascript
Array.prototype.entries2 = function () {
  return this[Symbol.iterator]()
}
Array.prototype[Symbol.iterator] = function () {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < this.length ?
        {value: this[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  }
}
```

### every

会遍历每个元素是否满足用户给出的回调函数，是返回true，否返回false，并且不会继续检查。

不会对空数组检查，不会改变原数组

#### 例子🌰

```javascript
var ages = [32, 33, 16, 40];

function checkAdult(age) {
    return age >= 18;
}

ages.every(checkAdult);// false
```

#### 实现

```javascript
Array.prototype.every2 = function (fn) {
  if (this.length > 0) {
    for (let i = 0; i < this.length; i++) {
      if (!fn(this[i])) {
        return false
      }
    }
  }
  return true
}
```

### fill

用一个特定的值替换指定位置的数组元素，改变原数组。

参数：

| 参数    | 描述                                       |
| :------ | :----------------------------------------- |
| *value* | 必需。填充的值。                           |
| *start* | 可选。开始填充位置。                       |
| *end*   | 可选。停止填充位置 (默认为 *array*.length) |

#### 例子🌰

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.fill("Runoob", 2, 4); // Banana,Orange,Runoob,Runoob
```

#### 实现

```javascript
Array.prototype.fill2 = function (v, start = 0, end) {
  end = end || this.length
  for (let i = start; i < end; i++) {
    this[i] = v
  }
  return this
}
```

### filter

返回满足回调函数的元素数组，不会改变原数组

#### 例子🌰

```javascript
var ages = [32, 33, 16, 40];

function checkAdult(age) {
    return age >= 18;
}
ages.filter(checkAdult);// [32, 33, 40]
```

#### 实现

```javascript
Array.prototype.filter2 = function (fn, ctx) {
  ctx = ctx || this
  const res = []
  for (let i = 0; i < this.length; i++) {
    if (fn.apply(ctx, [this[i], i, this])) {
      res.push(this[i])
    }
  }
  return res
}
```

### find

返回满足回调函数的第一个值

不改变原数组，都不满足返回undefined

#### 例子🌰

```javascript
var ages = [3, 10, 18, 20];
 
function checkAdult(age) {
    return age >= 18;
}
 
ages.find(checkAdult); // 18
```

#### 实现

```javascript
Array.prototype.find2 = function (fn, ctx) {
  ctx = ctx || this
  for (let i = 0; i < this.length; i++) {
    if (fn.apply(ctx, [this[i], i, this])) {
      return this[i]
    }
  }
  return
}
```

### findIndex

返回满足回调函数的第一个值的位置下标

不满足返回-1

不会改变原数组

#### 例子🌰

```javascript
var ages = [3, 10, 18, 20];
 
function checkAdult(age) {
    return age >= 18;
}
 
ages.find(checkAdult); // 2
```

#### 实现

```javascript
Array.prototype.findIndex = function (fn, ctx) {
  ctx = ctx || this
  for (let i = 0; i < this.length; i++) {
    if (fn.apply(ctx, [this[i], i, this])) {
      return i
    }
  }
  return -1
}
```

### forEach()

数组每个元素都执行一次回调函数。不会修改原数组。但是当元素为引用类型时，会修改。

#### 例子🌰

```javascript
const b = [{v: 65}]
b.forEach(v => v.v += 1)
//b [{v: 66}]
```

#### 实现

```javascript
Array.prototype.forEach2 = function (fn, ctx = window) {
  for (let i = 0; i < this.length; i++) {
    fn.apply(ctx, [this[i], i, this])
  }
}
```

### from()

通过拥有 length 属性的对象或可迭代的对象来返回一个数组。(他有第二个参数，是个function，和map是一样的)

#### 例子🌰

```javascript
let a = {0: 'demo', 1: 'demo2', length: 2}
let b = Array.from(a)
console.log(b) //=>['demo', 'demo2']
```

#### 实现

```javascript
Array.from2 = function (data, mapFun = function (item) {return item}) {
  let res = []
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      res[i] = mapFun(data[i]) || null
    }
  } else if (typeof data[Symbol.iterator] === 'function') {
    data.forEach((item) => {
      res.push(mapFun(item))
    })
  }
  return res
}
```

### includes()

判断一个数组是否包含一个指定的值，包括NaN也能判断出来为true。

#### 例子🌰

```javascript
const a = [1,2,3,NaN]
a.includes(NaN) // true
```

#### 实现

```javascript
Array.prototype.includes2 = function (el, fromIndex = 0) {
  if (typeof el === 'object') {
    return false
  }
  if (fromIndex < 0) {
    fromIndex = this.length + fromIndex
  }
  for (let i = fromIndex; i < this.length; i++) {
    if (el.toString() === 'NaN') {
      if (this[i].toString() === el.toString()) {
        return true
      }
    } else {
      if (this[i] === el) {
        return true
      }
    }
  }
  return false
}
```

### indexOf()

搜索数组中的元素，并返回它所在的位置。

#### 例子🌰

```javascript
let a = [1,2,3,NaN]
a.indexOf(2) // 1
```

#### 实现

```javascript
Array.prototype.indexOf2 = function (el, start = 0) {
  if (start >= this.length || start < 0) return -1
  for (let i = start; i < this.length; i++) {
    if (el === this[i]) {
      return i
    }
  }
  return -1
}
```

### isArray()

判断对象是否为数组。

#### 例子🌰

```javascript
let a = [1,2,3,NaN]
Array.isArray(a) // true
```

#### 实现

```javascript
Array.isArray2 = function (array) {
  return Object.prototype.toString.call(arg) === '[object Array]'
}
```

### join()

把数组的所有元素放入一个字符串。

#### 例子🌰

```javascript
let a = [1,2,3,NaN]
a.join(',') // '1,2,3,NaN'
```

#### 实现

```javascript
Array.prototype.join2 = function (separator = '') {
  let res
  for (let i = 0; i < this.length; i++) {
    if (!res) {
      res = this[i]
    } else {
      res += separator + this[i]
    }
  }
  return res
}
```

### keys()

返回数组的可迭代对象，包含原始数组的键(key)。

#### 例子🌰

```javascript
let a = [1,2,3,NaN]
let b = a.keys()
b.next() //{value: 0, done: false}
b.next() //{value: 1, done: false}
b.next() //{value: 2, done: false}
b.next() //{value: 3, done: false}
b.next() //{value: undefiend, done: true}
```

#### 实现

```javascript
function makeIterator(array) {
  let nextIndex = 0;
  return {
    [Symbol.iterator]: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}

Array.prototype.keys2 = function () {
  let res = []
  for (let i = 0; i < this.length; i++) {
    res.push(i)
  }
  return makeIterator(res).Symbol.iterator
}
```

迭代器详情请看阮一峰老师的[ECMAScript 6 入门](https://es6.ruanyifeng.com/)-[Iterator 和 for...of 循环](https://es6.ruanyifeng.com/#docs/iterator)

### lastIndexOf()

搜索数组中的元素，并返回它最后出现的位置。

#### 例子🌰

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.lastIndexOf("Apple"); // 2
```

#### 实现

```javascript
Array.prototype.lastIndexOf2 = function (el, start = 0) {
  start = Math.abs(start)
  let res = -1
  for (let i = start; i < this.length; i++) {
    if (el === this[i] && res < i) {
      res = i
    }
  }
  if (start > 0) {
    for (let i = 0; i < this.length - start; i++) {
      if (el === this[i] && res < i) {
        res = i
      }
    }
  }
  return res
}
```

### map()

通过指定函数处理数组的每个元素，并返回处理后的数组。

#### 例子🌰

```javascript
var numbers = [4, 9, 16, 25];

numbers.map(Math.sqrt); // [2,3,4,5]
```

#### 实现

```javascript
Array.prototype.map2 = function (fn, context = null) {
  const res = []
  if (!context) {
    context = this
  }
  for (let i = 0; i < context.length; i++) {
    res.push(fn(context[i], i, context))
  }
  return res
}
```

### pop()

删除数组的最后一个元素并返回删除的元素。

#### 例子🌰

```javascript
let a = [1,2,3]
a.pop() // 3,a:[1,2]
```

#### 实现

```javascript
Array.prototype.pop2 = function () {
  const res = this[this.length - 1]
  this.length -= 1
  return res
}
```

### push()

向数组的末尾添加一个或更多元素，并返回新的长度。

#### 例子🌰

```javascript
let a = []
a.push(1,2,3,4) // 4,a:[1,2,3,4]
```

#### 实现

```javascript
Array.prototype.push2 = function (...el) {
  for (let i = 0; i < el.length; i++) {
    this[this.length + i] = el[i]
  }
  return this.length
}
```

### reduce()

将数组元素计算为一个值（从左到右）。

#### 例子🌰

```javascript
let a = [1,2,3,4]
function getSum(total, num) {
    return total + num;
}
a.reduce(getSum) // 10
```

#### 实现

```javascript
Array.prototype.reduce2 = function (fn) {
  let res = this[0]
  for (let i = 1; i < this.length; i++) {
    res = fn(res, this[i], i, this)
  }
  return res
}
```

### reduceRight()

将数组元素计算为一个值（从右到左）。

#### 例子🌰

```javascript
let a = [1,2,3,4]
function getSum(total, num) {
    return total + num;
}
a.reduceRight(getSum) // 10
```

#### 实现

```javascript
Array.prototype.reduceRight2 = function (fn) {
  let res = this[this.length - 1]
  for (let i = this.length - 2; i >= 0; i--) {
    res = fn(res, this[i], i, this)
  }
  return res
}
```

### reverse()

反转数组的元素顺序。

#### 例子🌰

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.reverse();//["Mango", "Apple", "Orange", "Banana"]
```

#### 实现

```javascript
Array.prototype.reverse2 = function () {
  let start = 0
  let end = this.length - 1
  while (start <= Math.floor(this.length / 2)) {
    const temp = this[start]
    this[start] = this[end]
    this[end] = temp
    start++
    end--
  }
  return this
}
```

### shift()

删除并返回数组的第一个元素。

#### 例子🌰

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.shift() // "Banana"
```

#### 实现

```javascript
Array.prototype.shift2 = function () {
  const res = this[0]
  for (let i = 0; i < this.length; i++) {
    if (this[i + 1]) {
      this[i] = this[i + 1]
    }
  }
  this.length -= 1
  return res
}

```

### slice()

选取数组的一部分，并返回一个新数组。

#### 例子🌰

```javascript
let a = [1,2,3,4,5]
a.slice(1,2) // [2]
```

#### 实现

```javascript
Array.prototype.slice2 = function (start, end) {
  if (!end || end > this.length) {
    end = this.length
  }
  if (!start) {
    start = 0
  }
  let res = []
  for (let i = start; i < end; i++) {
    res.push(this[i])
  }
  return res
}
```

### some()

检测数组元素中是否有元素符合指定条件。

#### 例子🌰

```javascript
let a = [1,2,3,8]
a.some(function (item) {
    return item >= 8
}) // true
```

#### 实现

```javascript
Array.prototype.some2 = function (fn, context) {
  if (!context) {
    context = this
  }
  for (let i = 0; i < context.length; i++) {
    const res = fn(context[i], i, context)
    if (res === true) {
      return res
    }
  }
  return false
}

```

### sort()

对数组的元素进行排序。

#### 例子🌰

```javascript
var points = [40,100,1,5,25,10];
points.sort(function(a,b){return b-a}); // [100,40,25,10,5,1]
```

#### 实现

```javascript
Array.prototype.sort2 = function (fn) {
  const res = quickSort([...this], fn)
  for (let i = 0; i < res.length; i++) {
    this[i] = res[i]
  }
  return res
}

const quickSort = function(arr, fn) {
  if (arr.length <= 1) { return arr; }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++){
    if (fn(arr[i], pivot) < 0) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left, fn).concat([pivot], quickSort(right, fn));
};
```

### splice()

从数组中添加或删除元素,返回删除的元素，会改变原数组。

#### 例子🌰

```javascript
let a = [1,2,6,4,5]
a.splice(2, 1, 3) // [6] a:[1,2,3,4,5,6]
```

#### 实现

```javascript
Array.prototype.splice2 = function (targetIndex, num, ...el) {
  let k = num
  const res = []
  if (el.length <= 0) {
    for (let i = targetIndex; i < this.length; i++) {
      if (this[i + num]) {
        res.push(this[i])
        this[i] = this[i + num]
      }
    }
    this.length -= num
  } else {
    let temp = []
    for (let i = targetIndex; i < this.length; i++) {
      if (res.length < num) {
        res.push(this[i])
      } else {
        temp.push(this[i])
      }
    }
    this.length = this.length - (temp.length + num)
    let len = this.length + el.length
    let j = 0
    for (let i = targetIndex; i < len; i++) {
      this[i] = el[j]
      j++
    }
    j = 0
    len = this.length + temp.length
    for (let i = this.length; i < len; i++) {
      this[i] = temp[j]
      j++
    }
  }
  return res
}
```

### toString()

把数组转换为字符串，并返回结果(会递归转换)。

#### 例子🌰

```javascript
let a = [
    [1, {a:1}],
    [2,3]
]
a.toString() // "1,[object Object],2,3"
```

#### 实现

```javascript
Array.prototype.toString2 = function () {
  return toStrng(this)
}

function toStrng (arr) {
  if (Array.isArray(arr)) {
    let res
    for (let i = 0; i < arr.length; i++) {
      if (!res) {
        res = toStrng(arr[i])
      } else {
        res += ',' + toStrng(arr[i])
      }
    }
    return res
  } else if (typeof arr === 'number' || typeof arr === 'string') {
    return arr
  } else {
    return Object.prototype.toString.call(arr)
  }
}
```

### unshift()

向数组的开头添加一个或更多元素，并返回新的长度。

#### 例子🌰

```javascript
let a = [3,4,5]
a.unshift(1,2) //5 a:[1,2,3,4,5]
```

#### 实现

```javascript
Array.prototype.unshift2 = function (...arr) {
  const temp = []
  for (let i = 0; i < this.length; i++) {
    temp.push(this[i])
  }
  this.length = arr.length
  for (let i = 0; i < this.length; i++) {
    this[i] = arr[i]
  }
  const len = this.length + temp.length
  let j = 0
  for (let i = arr.length; i < len; i++) {
    this[i] = temp[j]
    j++
  }
  return len
}
```

