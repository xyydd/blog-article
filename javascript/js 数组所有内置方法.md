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

