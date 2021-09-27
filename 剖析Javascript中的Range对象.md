# 剖析Javascript中的Range对象

## Range对象

Range是一个对象，表示一个包含节点与文本节点的一部分的文档片段。可以通过`document.createRange`创建`Range`或 `window.getSelection()`获取到的`Selection`对象的`getRangeAt`也能获取。

## document.createRange

用`document.createRange`选取div中的每一个文字：

```html
<div id="container" name="content">文字文字文字</div>
<script>
		let container = document.getElementById('container')
  	let ranges = []
		for (let i = 0; i < container.childNodes[0].textContent.length; i++) {
	      let range = document.createRange()
	      range.setStart(container.childNodes[0], i)
	      range.setEnd(container.childNodes[0], i)
	      ranges.push(range)
	  }
</script>
```

## window.getSelection()

该方法用来获取用户选择的文本对象或插入符号的当前位置。

### 选择文本触发

```html
<html>
	<div id="container">文字文字文字</div>
	<script>
		document.addEventListener('mouseup', function () {
			const selection = window.getSelection();
			console.log(selection)
			const range = selection.getRangeAt(0)
			console.log(range)
		})
	</script>
</html>
```

![https://i.loli.net/2021/09/27/yNUjX2oFmkLpgq4.png](https://i.loli.net/2021/09/27/yNUjX2oFmkLpgq4.png)

可以看到第二个输出的Range，startoffset是0，endoffset是2，也就是选择了两个字符

而`selection.getRangeAt(0)`这段代码中的0，表示用户选择的第几个字符串，一般浏览器中都只能选择一段字符串，但是在firefox中按住`ctrl`是可以选择多段文字的：

![https://i.loli.net/2021/09/27/IQsroETzOw4lCpa.png](https://i.loli.net/2021/09/27/IQsroETzOw4lCpa.png)

在上面`Selection`对象中，`rangeCount`就是表示选择了几段文字。

## Range对象中的方法举例：

### insertNode

`range`中一个相对重要的方法 👁️‍🗨️`insertNode`：在 Range 的起点处插入一个节点。注意一定要是节点。

`ranges`数组中就是div下每个字符，下面往每个字符中插入空格

```jsx
for (let i = 0; i < ranges.length; i++) {
	const text = document.createTextNode(' ')
	ranges[i].insertNode(text)
}
```

### detach

最后用完Range，要记得释放。

```jsx
range.detach();
```

当然Range还有很多方法，详情请看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)。

## 写在最后

希望我的文章能给你带来一部分启发和帮助，如果有什么不足或错误的地方，欢迎读者`评论`和`留言`

当然，要是本文对你有所帮助，欢迎`点赞`和`转发`，谢谢🙏

[GitHub文章集地址](https://github.com/xyydd/blog-article)
