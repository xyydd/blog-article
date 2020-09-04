# $mount

原先原型上的 `$mount` 方法在 `src/platform/web/runtime/index.js` 中定义，之所以这么设计完全是为了复用，因为它是可以被 `runtime only` 版本的 Vue 直接使用的

```javascript
// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

接受两个参数`el`、`hydrating`。`el`是挂载的元素，可以是string也可以是dom对象，如果在浏览器环境下会调用`query`将字符串转换成dom，`hydrating`与服务端渲染有关，浏览器环境下，不会传这个参数

### mountComponent

这个方法是`$mount`返回的，它在`src/core/instance/lifecycle.js`下 141行

```javascript
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```



可以看到，在前面调用了`beforeMount`这个生命周期，然后最主要的就是`new Watcher`这一段了，先不说这个实例是干嘛的，但是可以看到函数里面，有一个`updateComponent`回调函数，以及最后一个参数里面的方法调用了beforeUpdate。这样就可以联想到，`Watcher`是观察vm实例的数据变化后，触发`beforeUpdate`，调用`_render`更新试图，最后调用`_update`更新dom。

在整个`mountComponent`最后，判断了是否为根结点，然后设置 `vm._isMounted` 为 `true`，并调用`mounted`钩子

## 总结

`mountComponent`就是完成渲染工作，接下来是分析[`vm._render`](./源码6--_render.md)和[`vm._update`](./源码8--_update.md)

