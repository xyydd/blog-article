# proxy怎么单独使用在简单的项目中



## 写在前面

vue3的教程大家肯定已经看到很多了，今天我！来说说vue3中的重中之重`Proxy`，它到底怎么用，如果只是想在很简单的项目页面中使用该怎么用

本文章是我上完winter老师的前端训练营之后，写的总结，大家感兴趣的可以去[极客时间](https://u.geekbang.org/subject/fe)自己看，广告就不做了。

为了2级，冲呀！

## Proxy用法

```javascript
// MDN: Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
const proxy = new Proxy(obj, {set, get})
```

### 参数

#### target

需要代理的对象

#### handler

代理对象的处理方法，有get，set等，具体请看[MDN -proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy#handler_%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%96%B9%E6%B3%95)

## 使用

ok，前面都不重要，重要的是接下里的

### Demo

```javascript
let obj = {
    a: 1,
    b: 2
  }
let po = new Proxy(obj, {
    set (obj, key, val) {
        console.log(obj, key, val)
        obj[key] = val
        return obj
    }
})
let arr = [1,2]
let arrpo = new Proxy(arr, {
    set (obj, key, val) {
        console.log(obj, key, val)
        obj[key] = val
        return obj
    }
})
```

上面是obj和数组的使用简单demo，可以看到，我们对`obj`和`arr`这两个变量进行了代理，然后之后我们修改`po`和`arrpo`都会在控制台打印出对应的参数。

### 实例

我们这里打算做个简单的调色盘

大致思路是三个滑块分别表示rgb(r,g,b);这里的三个参数，范围是0-255，然后改变`#color`盒子的`background-color`

#### 1. 先上html部分：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>reactive</title>
  <style>
    #color {
      width: 20px;
      height: 20px;
    }
    .select-color {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 129px;
    }
  </style>
</head>
<body>
    <div class="select-color">
      R: <input id="r" type="range" min="0" max="255"/>
      G: <input id="g" type="range" min="0" max="255"/>
      B: <input id="b" type="range" min="0" max="255"/>
    </div>
    <div id="color"></div>
</body>
</html>
```

#### 2. 对一个对象进行简单的代理监听

之后创建一个object对象，对应这三个input，把这个对象用proxy进行简单的代理处理

```javascript
let object = {
    r: 0,
    g: 0,
    b: 0
};
let proxy = reactive(object);
function reactive (object) {
    let proxy = new Proxy(object, {
        set (obj, key, val) {
            obj[key] = val;
        },
        get (obj, key) {
            return obj[key];
        }
    });
    return proxy
}
```

#### 3.再去对三个input标签的input事件进行监听

监听后，把target的value赋值给对应的对象值

```javascript
let object = {
    r: 0,
    g: 0,
    b: 0
};
let proxy = reactive(object);

// add
document.getElementById('r').value = proxy.r
document.getElementById('g').value = proxy.g
document.getElementById('b').value = proxy.b

document.getElementById('r').addEventListener('input', event => {
    return proxy.r = event.target.value
})
document.getElementById('g').addEventListener('input', event => {
    return proxy.g = event.target.value
})
document.getElementById('b').addEventListener('input', event => {
    return proxy.b = event.target.value
})

function reactive (object) {
    let proxy = new Proxy(object, {
        set (obj, key, val) {
            obj[key] = val;
        },
        get (obj, key) {
            return obj[key];
        }
    });
    return proxy
}

```

#### 4.把这个对象对应到`#color`盒子的`background-color`中

```javascript
let object = {
    r: 0,
    g: 0,
    b: 0
};
let proxy = reactive(object);

document.getElementById('r').addEventListener('input', event => {
    return proxy.r = event.target.value
})
document.getElementById('g').addEventListener('input', event => {
    return proxy.g = event.target.value
})
document.getElementById('b').addEventListener('input', event => {
    return proxy.b = event.target.value
})

function reactive (object) {
    let proxy = new Proxy(object, {
        set (obj, key, val) {
            obj[key] = val;
        },
        get (obj, key) {
            return obj[key];
        }
    });
    return proxy
}
// add
changeColor()
function changeColor () {
    document.getElementById('color').style.backgroundColor = `rgb(${po.r}, ${po.g}, ${po.b})`
}
```

#### 5. 触发changeColor

当proxy改变时，也就是在set中去触发changeColor

```javascript
let object = {
    r: 0,
    g: 0,
    b: 0
};
let proxy = reactive(object);

document.getElementById('r').addEventListener('input', event => {
    return proxy.r = event.target.value
})
document.getElementById('g').addEventListener('input', event => {
    return proxy.g = event.target.value
})
document.getElementById('b').addEventListener('input', event => {
    return proxy.b = event.target.value
})

function reactive (object) {
    let proxy = new Proxy(object, {
        set (obj, key, val) {
            obj[key] = val;
            changeColor()
        },
        get (obj, key) {
            return obj[key];
        }
    });
    return proxy
}
// add
changeColor()
function changeColor () {
    document.getElementById('color').style.backgroundColor = `rgb(${proxy.r}, ${proxy.g}, ${proxy.b})`
}
```

到这里，很简单的调色盘已经差不多实现了，放完整代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>reactive</title>
    <style>
        #color {
            width: 20px;
            height: 20px;
        }
        .select-color {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 129px;
        }
    </style>
</head>
<body>
<div class="select-color">
    R: <input id="r" type="range" min="0" max="255"/>
    G: <input id="g" type="range" min="0" max="255"/>
    B: <input id="b" type="range" min="0" max="255"/>
</div>
<div id="color"></div>
<script>
  let object = {
    r: 0,
    g: 0,
    b: 0
  };
  let proxy = reactive(object);

  document.getElementById('r').addEventListener('input', event => {
    return proxy.r = event.target.value
  })
  document.getElementById('g').addEventListener('input', event => {
    return proxy.g = event.target.value
  })
  document.getElementById('b').addEventListener('input', event => {
    return proxy.b = event.target.value
  })

  function reactive (object) {
    let proxy = new Proxy(object, {
      set (obj, key, val) {
        obj[key] = val;
        changeColor()
      },
      get (obj, key) {
        return obj[key];
      }
    });
    return proxy
  }
  // add
  changeColor()
  function changeColor () {
    document.getElementById('color').style.backgroundColor = `rgb(${proxy.r}, ${proxy.g}, ${proxy.b})`
  }
</script>
</body>
</html>
```

### 补充

因为很多时候不可能只针对一个对象做特定的proxy，这样的代码耦合性太强，那么！该怎么做呢！上全部代码！

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>reactive</title>
  <style>
    #color {
      width: 20px;
      height: 20px;
    }
    .select-color {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 129px;
    }
  </style>
</head>
<body>
<div class="select-color">
  R: <input id="r" type="range" min="0" max="255"/>
  G: <input id="g" type="range" min="0" max="255"/>
  B: <input id="b" type="range" min="0" max="255"/>
</div>
<div id="color"></div>
<script>
  let callbacks = new Map()

  let reactivites = new Map()

  let usedReactiveies = []
  let object = {
    r: 1,
    g: 1,
    b: 1
  }

  let po = reactive(object)

  effect(() => {
    document.getElementById('r').value = po.r
  })
  effect(() => {
    document.getElementById('g').value = po.g
  })
  effect(() => {
    document.getElementById('b').value = po.b
  })

  document.getElementById('r').addEventListener('input', event => {
    return po.r = event.target.value
  })
  document.getElementById('g').addEventListener('input', event => {
    return po.g = event.target.value
  })
  document.getElementById('b').addEventListener('input', event => {
    return po.b = event.target.value
  })
  function changeColor () {
    document.getElementById('color').style.backgroundColor = `rgb(${po.r}, ${po.g}, ${po.b})`
  }
  effect(changeColor)

  function effect (callback) {
    usedReactiveies = []
    callback()
    console.log(usedReactiveies)
    for (let reactivity of usedReactiveies) {
      if (!callbacks.has(reactivity[0])) {
        callbacks.set(reactivity[0], new Map())
      }
      if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
        callbacks.get(reactivity[0]).set(reactivity[1], [])
      }
      callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
    }
  }

  function reactive (object) {
    if (reactivites.has(object)) {
      return reactivites.get(object)
    }
    let proxy =  new Proxy(object, {
      set (obj, key, val) {
        obj[key] = val
        if (callbacks.get(obj)) {
          if (callbacks.get(obj).get(key)) {
            for (let callback of callbacks.get(obj).get(key)) {
              callback()
            }
          }
        }
        return obj
      },
      get (obj, key) {
        usedReactiveies.push([obj, key])
        if (typeof obj[key] === 'object') {
          return reactive(obj[key])
        }
        return obj[key]
      }
    })
    reactivites.set(object, proxy)
    return proxy
  }
</script>
</body>
</html>
```

可以看到，比刚才多了一个`effect`函数和`callbacks、reactivites、usedReactiveies`三个变量。

`effect`和`callbacks`主要是来收集修改对象之后需要触发的函数

`usedReactiveies`是用来收集哪个对象中的key被使用了（依赖收集），在`effect`函数中遍历，结合`callbacks`，可以直接判断出代理对象key值对应的需要触发的函数

`reactivites`是收集所有已经被代理的对象，为了防止多次代理，在·`reactive`函数头部加了对象的判断，如果是已经代理过的，直接返回已经代理的对象。

`set`在修改后的set中，对对应key值得callback进行触发（派发更新）

## 总结

虽然这样比不上直接使用`vue3`来得方便，但是他代码少哇，而且可以更直观得感受到vue3``reactive`的实现机制。

之前我也只是在看源码和源码讲解，并没有自己实际实现过，毕竟源码很复杂，然后对于很多人来说直接剥离其他代码，单独拿`reactive`部分出来是相对不太可实现的。

希望我的文章能给你带来一部分启发和帮助，如果有什么不足或错误的地方，欢迎读者`评论`和`留言`

当然，要是本文对你有所帮助，欢迎`点赞`和`转发`，谢谢🙏

[GitHub文章集地址](https://github.com/xyydd/blog-article)

[GitHub源码地址](https://github.com/xyydd/Frontend-01-Template/blob/master/week11/proxy/reactive.html)