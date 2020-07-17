# 理解ES2018中的Realms

这几天看winter的在课程中提到`Realms`，来来回回看了很多遍的标准和老师的解释，还google了很多文章，感觉对`Realms`的讲解大部分都是直接翻译标准，然后让我们在这里来实际感受一下`Realms`。

## Realms溯源
先上原版标准：

> Before it is evaluated, all ECMAScript code must be associated with a realm. Conceptually, a realm consists of a set of intrinsic objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of that global environment, and other associated state and resources.

再看组成：

1. a set of intrinsic objects(一组内置对象)
2. global environment （一个全局环境）
3. code （在上面这个全局环境中加载的所有代码）
4. state and resources （状态和资源）

## a set of intrinsic objects(一组内置对象)

包含了`所有js基本内置对象`以及`宿主环境中的的内置对象`，比如：`Object`,`Array`,`String`,`Number`,`Date`,`Error`,`Symbol`等，来看一段代码：

###### 代码1

```javascript
Array.prototype.__proto__ === Object.prototype // true
```

用`===`符号来对比两个object，是只有当两个对象为普通简单的复制关系才能为true:

###### 代码2

```javascript
const a = {}
const b = {}
const c = a
console.log(a === b) // false
console.log(a === c) // true
```
所以`Array`中的原型的隐式原型就是复制`Object`的原型的

以此得出：内置对象之间的关系是复制关系。

这是一张js基本内置对象的关系图：
![截屏2020-07-17 上午10.35.39.png](https://user-gold-cdn.xitu.io/2020/7/17/1735aa3bdbe432e3?w=1414&h=1194&f=png&s=296771)

## global environment （一个全局环境）

比如在当前页面中，全局环境就是window，但是需要注意的是，在不同全局环境中的Realms是不同的，可以看作在创建环境前，会新new一个Realms, 而里面所有的内置对象也会是全新的。

所以比如在当前页面中创建iframe，而对iframe中创建的对象和当前页面中创建的对象用intanceof比较当前页面中的Object，得到的结果是只有当前页面中的对象是true，而在iframe中创建的对象是false，即虽然两个对象的原型都是Object，但是这两个Object是分开创建的所以不同，上代码：

###### 代码3
```javascript
const iframe = document.createElement('iframe')
document.documentElement.appendChild(iframe)
iframe.src="javascript:var b = {};"
var b1 = iframe.contentWindow.b; // 这是在iframe中创建的对象，也就是在不同Realms中的对象
var b2 = {};
console.log(typeof b1, typeof b2); //object，两个都是object。
objectconsole.log(b1 instanceof Object, b2 instanceof Object); //false true iframe中创建的对象与当前的内置对象Object是不同的。
```

## code （在上面这个全局环境中加载的所有代码）

这很好理解，就是在环境内的代码，用上面的代码来解释就是：

当前页面：上面[`代码3`](#代码3)中所有的代码

iframe页面：`var b = {};`

## state and resources （状态和资源）

ummmm，这里我还没理解透彻，好像没有特别具体的例子，看到的大佬们可以点拨我一下吗？

## 总结

其实从看到`Realms`这个概念已经有一个多月，但是当时觉得这个概念离我太远只是跳过去而已，现在重新去找到源头，并且把概念拆分开来理解，并且随着自己多次尝试和翻阅查找资料，发现这个概念好像并没有多难理解。只是在以前写代码中没有很注意，其实是从刚开始接触`javascript`就在接触`Realms`这个概念了。

我只是一个虽然写了两年前端，但是一直在业务逻辑徘徊的小白，所以如果我这里有什么写错、解释错的地方，希望大家评论或者私信帮我更正，🙏感谢！