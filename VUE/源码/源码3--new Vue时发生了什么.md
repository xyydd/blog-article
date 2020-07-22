# new Vue

还是先上一段最简单的new Vue:

```html
<div id="app">
  {{ message }}
</div>
```



```javascript
import Vue from 'vue'
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```



vue最初的function：

```javascript
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

做了两件事：

1. 判断是不是生产环境并判断当前上下文是否为Vue，如果不是，就报提示：vue是个类需要new关键字实例化。
2. 执行this._init方法，并且把option传入进行初始化，opiton是一个object，里面包含了render函数，render函数是render了App.vue，当然如果有router或者vuex的话，option还会包含这两个。

## this._init

`this._init`方法是在`initMixin(Vue)`初始化中被创建的，`initMixin`在`src/core/instance/init.js`，它写在了Vue.prototype中。代码:

```javascript
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```

在 `src/core/instance/init.js`文件中前51行即`vm._self = vm`之前，做的操作主要是：标记了当前this，避免被observed；合并或初始化options；初始化代理。在52-59行中可以看到，都是在初始化，有初始化生命周期，初始化事件，初始化渲染，初始化data\props，在这些初始化过程中有`callHook`这个方法，是用来出发生命周期的钩子，从这里就可以看出，`beforeCreate`这个生命周期的钩子是在初始化渲染之后出发的，而`created`是在data和props都初始化之后再出发，即`created`能访问data和props。

然后就是规范组件名称，检查options中是否有name字段，没有就从组件的文件名拿到组件名称，然后通过一定的处理把name驼峰规则用`-`分开。

在最后检查options中是否有el属性，有的话，用$mount方法挂在这个el。

## 总结

从_init中可以看到触发了一部分的生命周期:beforeCreate,created,beforeMount,mounted。并且可以从代码层面理解生命周期的执行顺序以及生命周期钩子之前之后都做了什么才导致的组件内能否在这个时候访问data。

接下来就会说vm.$mount这个方法了。