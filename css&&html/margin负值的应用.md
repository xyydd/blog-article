# margin负值的应用

### 原理

显示来看看margin负值的原理。

margin的负值和四条参考线有关，这四条分为两类：

+ 一类是top和left，他们的负值以`内容边`即`border`或`上面/左边`兄弟元素的margin下边作为参考

+ 一类是bottom和right，他们的负值是以元素本身的border的`下面/右边`作为参考。

下面来看一些例子

### 例子🌰

原本的html和css，以及输出时的样子

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>margin负值</title>
  <style>
    * {
      margin: 0px;
      padding: 0px;
    }
    .box {
      width: 400px;
      height: 400px;
      padding: 20px;
      border: 1px solid gray;
    }
    .box div {
      width: 100px;
      height: 100px;
      /*float: left;*/
    }
    p {
      word-break: break-word;
    }
    .one {
      background-color: gray;
      margin-right: 50px;
      margin-bottom: 50px;
    }
    .two {
      background-color: aqua;
    }
  </style>
</head>
<body>
<div class="box">
  <div class="one"><p>11111111111111111111111111111111</p></div>
  <div class="two"></div>
</div>
</body>
</html>

```

![normal-margin.png](https://i.loli.net/2020/08/29/m2zRUJlr9ZWhkVf.png)

#### top负值

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>margin负值</title>
  <style>
    * {
      margin: 0px;
      padding: 0px;
    }
    .box {
      width: 400px;
      height: 400px;
      padding: 20px;
      border: 1px solid gray;
    }
    .box div {
      width: 100px;
      height: 100px;
      /*float: left;*/
    }
    p {
      word-break: break-word;
    }
    .one {
      background-color: gray;
      margin-right: 50px;
      margin-bottom: 50px;
    }
    .two {
      margin-top: -100px;
      background-color: aqua;
    }
  </style>
</head>
<body>
<div class="box">
  <div class="one"><p>11111111111111111111111111111111</p></div>
  <div class="two"></div>
</div>
</body>
</html>

```

结果如下：

![margin-top.png](https://i.loli.net/2020/08/29/MsUEKCANpYBH8nh.png)

#### left负值

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>margin负值</title>
  <style>
    * {
      margin: 0px;
      padding: 0px;
    }
    .box {
      width: 400px;
      height: 400px;
      padding: 20px;
      border: 1px solid gray;
    }
    .box div {
      width: 100px;
      height: 100px;
      float: left;
    }
    p {
      word-break: break-word;
    }
    .one {
      background-color: gray;
      margin-right: 50px;
      margin-bottom: 50px;
    }
    .two {
      margin-left: -100px;
      background-color: aqua;
    }
  </style>
</head>
<body>
<div class="box">
  <div class="one"><p>11111111111111111111111111111111</p></div>
  <div class="two"></div>
</div>
</body>
</html>

```

效果如下：

![margin-left.png](https://i.loli.net/2020/08/29/RUcqEgGB9QiKxXJ.png)

top和left总结：可以看到，给`two`设置`margin-left/margin-top`时，基线都是兄弟元素`one`的外边距。但是有一个细节的点，就是在浮动之前，`one`中的内容会在超出内容时，覆盖到`two`的上方，而在浮动之后，内容就被隐藏了。

#### right负值

给`one`设置负值

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>margin负值</title>
  <style>
    * {
      margin: 0px;
      padding: 0px;
    }
    .box {
      width: 400px;
      height: 400px;
      padding: 20px;
      border: 1px solid gray;
    }
    .box div {
      width: 100px;
      height: 100px;
      float: left;
    }
    p {
      word-break: break-word;
    }
    .one {
      background-color: gray;
      margin-right: -50px;
    }
    .two {
      background-color: aqua;
    }
  </style>
</head>
<body>
<div class="box">
  <div class="one"><p>11111111111111111111111111111111</p></div>
  <div class="two"></div>
</div>
</body>
</html>
```

 效果如下：

![margin-left.png](https://i.loli.net/2020/08/29/RUcqEgGB9QiKxXJ.png)

#### bottom负值

给`one`设置bottom负值：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>margin负值</title>
  <style>
    * {
      margin: 0px;
      padding: 0px;
    }
    .box {
      width: 400px;
      height: 400px;
      padding: 20px;
      border: 1px solid gray;
    }
    .box div {
      width: 100px;
      height: 100px;
    }
    p {
      word-break: break-word;
    }
    .one {
      background-color: gray;
      margin-bottom: -50px;
    }
    .two {
      background-color: aqua;
    }
  </style>
</head>
<body>
<div class="box">
  <div class="one"><p>11111111111111111111111111111111</p></div>
  <div class="two"></div>
</div>
</body>
</html>
```

效果如下：

![margin-top.png](https://i.loli.net/2020/08/29/MsUEKCANpYBH8nh.png)

right和bottom总结：虽然看起来效果和上面left和top的一样，但是从css中可以看到，设置的属性完全不一样。

### 应用

#### 边框去叠加

在给相邻元素设置1px边框时，会发生靠近的两个边叠加一起，效果变成了2px的边框，这个时候，就可以给元素加一个负值margin为1px的样式。

#### 布局

圣杯布局和双飞翼布局都是通过margin的负值来排版左右两栏的。

`注`：`margin-left:-100%`这里的100%是指父元素内容的宽度，不包含`border`和`padding`，就算是`box-sizing:border-box`也不包含

### 总结

就上面布局来说，是比较老的布局方案，现在还有更好的比如flex、grid。但是对于一些需要兼容老版本浏览器还是很有用的，可以做一些渐进增强和优雅降级。

### 参考

+ [浅谈margin负值](https://zhuanlan.zhihu.com/p/25892372)
+ [圣杯布局中对left盒子设置负内边距-100%的一点解释](https://segmentfault.com/a/1190000014546205)