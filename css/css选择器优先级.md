# css选择器优先级

例子🌰

```css
UL OL LI.red {
  ...
}
```

这是[选择器标准](https://www.w3.org/TR/selectors/#specificity)里的例子，他由三个标签选择器和一个class选择器构成，标准中给出的优先级是`/ * a = 0 b = 1 c = 3 * /`，下面来详细了解优先级的计算

## 选择器优先级定义

### 普通选择器

追本溯源

> A selector’s specificity is calculated for a given element as follows:
>
> - count the number of ID selectors in the selector (= A)
> - count the number of class selectors, attributes selectors, and pseudo-classes in the selector (= B)
> - count the number of type selectors and pseudo-elements in the selector (= C)
> - ignore the universal selector
>
> Specificities are compared by comparing the three components in order: the specificity with a larger A value is more specific; if the two A values are tied, then the specificity with a larger B value is more specific; if the two B values are also tied, then the specificity with a larger C value is more specific; if all the values are tied, the two specificities are equal.
>
> Due to storage limitations, implementations may have limitations on the size of A, B, or C. If so, values higher than the limit must be clamped to that limit, and not overflow.

这是[选择器标准](https://www.w3.org/TR/selectors/#specificity)里的定义。大致的意思是：

> 把选择器分为下面几类
>
> + id选择器数量 = A
> + class选择器、属性选择器和伪类的数量 = B
> + 伪元素选择器和标签选择器数量 = C
> + 忽略通用选择器（注：还有关系选择器: +,>,~,' ',||等）
>
> 通过按顺序比较这三个成分来比较特异性：A值越大的特异性越具体；如果两个A值并列，则B值越大的特异性越具体；如果两个B值也绑定在一起，则C值越大的特异性越具体。如果所有值都绑定在一起，则这两个特异性相等。
>
> 由于存储限制，实现可能会限制A，B或C的大小。如果是这样，则必须将高于限制的值限制在该限制内，并且不要溢出。

#### 计算方法

在实现上面优先级的过程是取一个尽量大的值`N`，对ABC做乘法加法：`S = A * N^2 + B * N^1 + C`。

#### 有趣历史

历史上IE有这么一个bug，IE为了节省内存把N取值为255，那么就会导致256个`class`相当于一个`id`。但是现代的浏览器中应该已经不存在这样的错误。

### 伪类选择器

> - The specificity of an [:is()](https://www.w3.org/TR/selectors/#matches-pseudo), [:not()](https://www.w3.org/TR/selectors/#negation-pseudo), or [:has()](https://www.w3.org/TR/selectors/#has-pseudo) pseudo-class is replaced by the specificity of the most specific [complex selector](https://www.w3.org/TR/selectors/#complex) in its [selector list](https://www.w3.org/TR/selectors/#selector-list) argument.
> - Analogously, the specificity of an [:nth-child()](https://www.w3.org/TR/selectors/#nth-child-pseudo) or [:nth-last-child()](https://www.w3.org/TR/selectors/#nth-last-child-pseudo) selector is the specificity of the pseudo class itself (counting as one pseudo-class selector) plus the specificity of the most specific [complex selector](https://www.w3.org/TR/selectors/#complex) in its [selector list](https://www.w3.org/TR/selectors/#selector-list) argument (if any).
> - The specificity of a [:where()](https://www.w3.org/TR/selectors/#where-pseudo) pseudo-class is replaced by zero.

+ :is()、:not()或:has()  除了外面的选择器，如果`()`里面也有选择器，那么按照基础选择器优先级最大的计算

+ :nth-child()或:nth-last-child() 计算里面选择器的同时加1，伪类属于B需要加1.

+ :where() 完全不计算里面的优先级，只计算`:` 前面的选择器优先级

## 例子

为了更直观的感受优先级，下面是一些例子：

```css
*                                  /* a=0 b=0 c=0 */
LI                                 /* a=0 b=0 c=1 */
UL LI                              /* a=0 b=0 c=2 */
UL OL+LI                           /* a=0 b=0 c=3 */
H1 + *[REL=up]                     /* a=0 b=1 c=1 */
UL OL LI.red                       /* a=0 b=1 c=3 */
LI.red.level                       /* a=0 b=2 c=1 */
#x34y                              /* a=1 b=0 c=0 */
#s12:not(FOO)                      /* a=1 b=0 c=1 */
.foo :is(.bar, #baz)               /* a=1 b=1 c=0 */
:is(em,#foo)                       /* a=1 b=0 c=0 */
.qux:where(em,#foo#bar#baz)        /* a=0 b=1 c=0 */
:nth-child(even of li, .item)      /* a=0 b=2 c=0 */
:not(em, strong#foo)               /* a=1 b=0 c=1 */
```

注意上面的优先级只是在style标签中，没有计算内联样式和`!important`，而`!important`的优先级是最高的，紧接着是内联样式。例子：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>内联样式和!important</title>
  <style>
    div {
        width: 100px;
        height: 100px;
        background-color: red!important;
    }
  </style>
</head>
<body>
  <div style="background-color: green;"></div> <!-- 最终div是红色的 -->
</body>
</html>
```

## 总结

个人觉得如果一个网站大部分样式要靠优先级来决定，那我觉得这个网站可能需要重构了，不适合再修改下去。选择器的优先级在我看来只是在一些细节方面调整的时候会需要用到，我只理解到了这里，再深入理解的话那可能是写浏览器的的人或者高级工程师架构师等人的范围了。

如果有什么不足或错误的地方，欢迎读者<font color="red">评论</font>和<font color="red">留言</font>

当然，要是本文对你有所帮助，欢迎<font color="red">点赞</font>和<font color="red">转发</font>，谢谢🙏

## 参考

[Calculating a selector’s specificity](https://www.w3.org/TR/selectors/#specificity)

