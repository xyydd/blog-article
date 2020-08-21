# Object.defineProperty

MDN上的语法：

> Object.defineProperty(obj, prop, descriptor)

> obj 要定义属性的对象。

> prop 要定义或修改的属性的名称或 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 。

> descriptor 要定义或修改的属性描述符。

> 返回 被传递给函数的对象。

而在`descriptor`中，vue中最重要的就是使用了`set`、`get`。当我们修改该属性`prop`时，会触发`set`；当我们访问了该属性，就会触发`get`。

在vue中，当你在data中定义了数据，`new Vue`时做的事就是把`vm._data.xxx`或`vm._prop.xxx`才能访问到的数据，都定义到`vm.xxx`上，然后对`vm._data.xxx`中的数据进行`observe`，而`observe`中最重要的就是`defineReactive`，`defineReactive`的功能就是定义一个响应式对象，给这个对象动态添加getter和setter。在getter中做的事依赖收集，setter中则是派发更新。

### 依赖收集 Dep

在上面提到的getter方法：

```javascript
get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    }
```

