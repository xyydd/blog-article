# BFC

全称：`Block Formatting Context`(块级格式化上下文)

里面有一些概念：

### 1. Block Container

里面有BFC的盒

那么有哪些盒属于`Block Container`呢？

+ block
+ inline-block
+ table-cell
+ table-caption（表格标题）
+ flex item (父元素被设为`display:flex`，子元素如果没有其他的设置，就是`Block Container`, 下同)
+ grid cell

### 2. Block-level Box

外面有BFC

+ block
+ flex
+ table
+ grid

### 3. Block box

里外都有BFC 

`Block box = Block-level Box + Block Container`

### 4. 什么属性会产生BFC

#### 定义

> - The root element of the document (`<html>`).
> - Floats (elements where [`float`](https://developer.mozilla.org/en-US/docs/Web/CSS/float) isn't `none`).
> - Absolutely positioned elements (elements where [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/position) is `absolute` or `fixed`).
> - Inline-blocks (elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: inline-block`).
> - Table cells (elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: table-cell`, which is the default for HTML table cells).
> - Table captions (elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: table-caption`, which is the default for HTML table captions).
> - Anonymous table cells implicitly created by the elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: table`, `table-row`, `table-row-group`, `table-header-group`, `table-footer-group` (which is the default for HTML tables, table rows, table bodies, table headers, and table footers, respectively), or `inline-table`.
> - Block elements where [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) has a value other than `visible`.
> - [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: flow-root`.
> - Elements with [`contain`](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)`: layout`, `content`, or `paint`.
> - Flex items (direct children of the element with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: flex` or `inline-flex`) if they are neither [flex](https://developer.mozilla.org/en-US/docs/Glossary/Flex_Container) nor [grid](https://developer.mozilla.org/en-US/docs/Glossary/Grid_Container) nor [table](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Table) containers themselves.
> - Grid items (direct children of the element with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: grid` or `inline-grid`) if they are neither [flex](https://developer.mozilla.org/en-US/docs/Glossary/Flex_Container) nor [grid](https://developer.mozilla.org/en-US/docs/Glossary/Grid_Container) nor [table](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Table) containers themselves.
> - Multicol containers (elements where [`column-count`](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count) or [`column-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width) isn't `auto`, including elements with `column-count: 1`).
> - [`column-span`](https://developer.mozilla.org/en-US/docs/Web/CSS/column-span)`: all` should always create a new formatting context, even when the `column-span: all` element isn't contained by a multicol container ([Spec change](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51), [Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)).

#### 翻译

- 根元素（`<html>）`
- 浮动元素（元素的 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 不是 `none`）
- 绝对定位元素（元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 为 `absolute` 或 `fixed`）
- 行内块元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `inline-block`）
- 表格单元格（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-cell`，HTML表格单元格默认为该值）
- 表格标题（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-caption`，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table、``table-row`、 `table-row-group、``table-header-group、``table-footer-group`（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 `inline-table`）
- [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 值不为 `visible` 的块元素
- [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
- [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content `或 paint 的元素
- 弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `flex` 或 `inline-flex `元素的直接子元素）
- 网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-width) 不为 `auto，包括 ``column-count` 为 `1`）
- `column-span` 为 `all` 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（[标准变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)，[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)）。

#### 整理

因为不是很好记，所以可以这样定义：

> 默认这些能容纳正常流的盒，都认为会创建BFC，除一种情况之外：
>
> 里外都是BFC(Block Box)，并且overflow:visible，相当于没有BFC，会产生BFC合并

### BFC 合并

#### float 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BFC合并与float</title>
  <style>
  </style>
</head>
<body style="height: 500px;background-color: blanchedalmond">
<!--BFC-->
  <div id="id1" style="float:right;width: 100px;height: 100px;background-color: aqua"></div>
<!--overflow:visible/hidden-->
  <div id="id2" style="background-color: pink;overflow: visible;margin: 30px;">
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字
    文字文字文字文字文字文字

  </div>
</body>
</html>
```

效果：

![BFC__Float1.png](https://i.loli.net/2020/09/04/sAkTPfwRKV3buaZ.png)

当id2为`overflow: visible;`时，id1的浮动与id2内文字形成了浮动关系，直接就不管id2了。但是当改成`overflow: hidden`后，来看看效果:

![BFC__float2.png](https://i.loli.net/2020/09/04/1MHZDIKda2qrOGk.png)

id1与id2形成了浮动关系，id2围绕id1了。这就是BFC合并与float

#### 边距重叠

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
  <div id="id1" style="width: 100px;height: 100px;background-color: pink;margin: 20px"></div>
  <div id="id2" style="overflow: visible;background-color: aqua;margin: 30px;">
    <div id="id2-1" style="width: 100px;height: 100px;background-color: pink;margin: 20px;"></div>
  </div>
</body>
</html>

```

效果：

![BFC__margin1.png](https://i.loli.net/2020/09/04/bzAgKLIGOhjqvUY.png)

Id1 与id2 id2-1都发生了边距重叠，中间的`marigin`为`30px`，相当于id2不存在一样。当把id2`overflow`改为`hidden`后来看看效果：

![BFC__margin2.png](https://i.loli.net/2020/09/04/lrqpKTIYa2QcAwM.png)

id2与id1发生了正常的BFC内的边距重叠，id2-1的margin回来了。

这就是BFC合并与margin。

### 参考

[简述你对BFC规范的理解](https://github.com/haizlin/fe-interview/issues/20)

[块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

### 总结

BFC真是个令人头疼的知识点，它就相当于一个盒子，盒子内外互不影响。这是我对BFC最初的理解吧，然后到现在工作中也没有碰到很复杂的BFC，所以有什么写的不对的地方，欢迎指出更正。当然如果觉得不错并且有帮助的话，欢迎`点赞👍转发`哦，转发注明一下来源就行。

