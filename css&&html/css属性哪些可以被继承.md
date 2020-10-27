# css属性哪些可以被继承

### 可以自动继承的属性

#### 字体属性

| 属性         |
| ------------ |
| font         |
| font-family  |
| font-weight  |
| font-weight  |
| font-size    |
| font-variant |
| font-stretch |

#### 文本属性

|属性|
|-----|
|text-indent|
|text-align|
|text-shadow|
|line-height|
|color|
|direction|
|word-spacing|
|letter-spacing|
|text-transform|

#### 元素可见属性

visibility

### 表格布局属性

|属性|
|-----|
|caption-side|
|border-collapse|
|empty-cells|

#### 列表属性

|属性|
|-----|
|list-style-type|
|list-style-image|
|list-style-position|
|list-style|

#### 光标属性

cursor

### 所有元素可继承的属性

[元素可见性](#元素可见属性)

[光标属性](#光标属性)

### 内联元素可继承的属性

[字体属性](#字体属性)

[除text-indent、text-align之外的文本属性](#文本属性)

### 块级元素可继承的属性

text-indent、text-align

### 不能继承的属性

1. display
2. 盒模型的属性：宽、高、内外边距、边框
3. 背景属性：背景颜色、图片、位置、大小、重复
4. 定位属性：float、clear、position
5. 内容属性：content、counter-reset、counter-increment
6. outline-style、outline-width、outline-color、outline

### 注意⚠️

`a`标签字体颜色不会继承父元素

`h1-h6`字体大小不能继承

### 参考

[CSS有哪些属性可以继承？](https://blog.csdn.net/jnshu_it/article/details/85256840)

[CSS选择器有哪些？哪些属性可以继承？优先级算法如何计算？内联和important哪个优先？](https://blog.csdn.net/sjinsa/article/details/70768483)

[CSS选择器有哪些？哪些属性可以继承？](https://github.com/haizlin/fe-interview/issues/11)

