# Promise源码实现

照着[刘小夕](https://github.com/YvetteLau)姐姐的[Promise的源码实现（完美符合Promise/A+规范）](https://github.com/YvetteLau/Blog/issues/2)写的，其实就是照搬，记下自己每次实现的心路历程

#### MDN

> **Promise** 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值

> `**Promise**` 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象

Promise有三种状态：

- *pending*: 初始状态，既不是成功，也不是失败状态。
- *fulfilled*: 意味着操作成功完成。
- *rejected*: 意味着操作失败。


## 先照抄一遍

