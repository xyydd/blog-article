# 解析浏览器展示HTML

## 写在前面

前端面试的时候经常碰到问浏览器: `从输入url到输出网页的过程`，当然这个过程还涉及到寻址等问题，本文不对网络问题做详细解答，只针对浏览器拿到HTML字符串之后，进行了什么操作：

+ 拿到HTML文本进行解析（parse），变成DOM树
+ CSS计算 变成带样式的DOM树
+ 把DOM树上产生的所有盒位置进行计算
+ 渲染

最后一步`渲染`是通过操作系统和硬件驱动api接口进行的。下面来详细拆解第一步、第二步和第三步，并写一个`toy browser`（并不代表实际浏览器代码），在这之前，还有一个知识点是会贯穿`解析`：`状态机`，简单看个例子你们大概就知道了：`问题 用状态机实现找到'abcabx'`

```javascript
function findMoreX (input) {
  let state = findA
  for (let i of input) {
    state = state(i)
  }
  return state === end
}
function findA (i) {
  if (i === 'a') {
    return findB
  } else {
    return findA(i) // reComsume
  }
}
function findB (i) {
  if (i === 'b') {
    return findC
  } else {
    return findA(i) // reComsume
  }
}
function findC (i) {
  if (i === 'c') {
    return findA2
  } else {
    return findA(i) // reComsume
  }
}
function findA2 (i) {
  if (i === 'a') {
    return findB2
  } else {
    return findA(i)
  }
}
function findB2 (i) {
  if (i === 'b') {
    return findX
  } else {
    return findA(i)
  }
}
function findX (i) {
  if (i === 'x') {
    return end
  } else {
    return findC(i)
  }
}

findMoreX('abcabcabx')
```

这里面`findA、findB、findC、findA2、findB2、findX`都是状态机，这样处理一个字符串又清晰又解耦，想换哪个换哪个。

## 状态机解析HTML（不包含css）

由于篇幅有限（其实为了蹭篇数），暂时不把css解析到DOM树中。

HTML例子：

```html
<html>
    <body>
        <div class="box" draggable>
            hello world
            <input placeholder="请输入" autofocus/>
        </div>
    </body>
</html>
```

由此可得出html标签分为以下几种：

+ 单纯的开始标签`<html>`
+ 带属性后面是等于一个值的开始标签：`<div class="box">`
+ 带属性后面没有值的开始标签：`<div draggable>`
+ 文本节点：`hello world`
+ 自封闭标签： `<input/>`
+ 带属性后面是等于一个值的自封闭标签: `<input placeholder="请输入"/>`
+ 带属性后面没有值的自封闭标签: `<input autofocus/>`
+ 结束标签：`</html>`

下面开始实际的解析

### 1.准备工作，全局DOM，字符串遍历

初始状态为data，用来解析判断'<'和`EOF`

```javascript
const EOF = Symbol('EOF'); //  文件字符串结束
/**
* 当前标签
* 当前属性
* 当前text节点
*/
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

let stack = [{type: 'document', children: []}]; // 全局的dom
function parseHTML (html) {
  let state = data; // 默认初始状态为data，用来解析判断'<'和EOF
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
}
```

### 2.初始状态data

当遇到‘<’，就进入`tagOpen`状态；如果在初始状态下就遇到除'<'和EOF以外的字符串就直接提交text节点（容错）

```javascript
function data (c) {
  if (c === '<') {
    return tagOpen;
  } else if (c === EOF) { // 遇到EOF，直接提交EOF
    emit({
      type: 'EOF'
    })
    return
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data;
  }
}
```

### 3. 开始标签状态

在开始标签状态遇到'/'，就进入`endTagOpen`

如果是字母或数字，则当前标签`currentToken`为`startTag`

进入到`tagName`状态，同时当前输入的‘c’再一次输入到`tagName`状态

```javascript
function tagOpen (c) {
  if (c === '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z0-9]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c);
  } else {
    return 
  }
}
```

### 4. 标签名tagName状态

如果遇到换行符或空格，就进入`beforeAttributeName`状态处理属性名

在开始标签状态之后遇到'/'就进入`selfClosingSatrtTag`自闭合标签

遇到是字母或数字，则当前标签`currentToken`中的tagName记录标签名

遇到'>'，就是当前开始标签结束，提交当前标签

```javascript
function tagName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingSatrtTag
  } else if (c.match(/^[a-zA-Z0-9]$/)) {
    currentToken.tagName += c
    return tagName
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else {
    return tagName
  }
}
```

### 5.  处理属性名和属性值

属性名和属性值也与标签一样处理

判断空格或换行符来进行属性名识别

判断等于号来进行属性值识别

属性值分为单引号和双引号，以及属性值结束状态

还有属性后有'/'，判断为`自封闭标签`

如果是'>'，则这个开始标签结束

```javascript
function beforeAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '>' || c === '/' || c === EOF) {
    return afterAttributeName(c)
  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}
function attributeName (c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '\u0000') { // 为空
	return attributeName
  } else if (c === '"' || c === "'" || c === '<') {
	throw new Error('attribute name error')
  } else {
    currentAttribute.name += c
    return attributeName
  }
}

function beforeAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c)
  } else if (c === '"') {
    return doubleQuoteAttributeValue
  } else if (c === "'") {
    return singleQuoteAttributeValue
  } else if (c === '>') {

  }else {
    return UnquoteAttributeValue(c)
  }
}
function afterAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (c === '/') {
    return selfClosingSatrtTag
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {
	return
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}
function doubleQuoteAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuoteAttributeValue
  } else if (c === '\u0000') {
	...
  } else if (c === EOF) {
	...
  } else {
    currentAttribute.value += c
    return doubleQuoteAttributeValue
  }
}

function singleQuoteAttributeValue (c) {
  if ("'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuoteAttributeValue
  } else if (c === '\u0000') {
	...
  } else if (c === EOF) {
	...
  } else {
    currentAttribute.value += c
    return singleQuoteAttributeValue
  }
}

function afterQuoteAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingSatrtTag
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {
	...
  } else {
    currentAttribute += c
    return doubleQuoteAttributeValue
  }
}

function UnquoteAttributeValue (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  } else if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return selfClosingSatrtTag
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === '\u0000') {
	...
  } else if (c === '"' || c === "'" || c === '<' || c === '=' || c === '`') {
	...
  } else if (c === EOF) {
	...
  } else {
    currentAttribute.value += c
    return UnquoteAttributeValue
  }
}
```

### 6.自封闭标签

```javascript
function selfClosingSatrtTag (c) {
  if (c === '>') {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
  } else if (c === 'EOF') {

  } else {

  }
}
```

### 7. 提交到全局DOM

这里全局`stack`，是树形结构，所以每次提交节点过来，每次都要遍历，这其实就很浪费性能，所以这里做的处理是利用`对象地址拷贝`，下面给出详细说明：

1. 第一次提交，`top`是顶层`document`对象，处理完属性后，`top.children.push(element)`把节点push到顶层`document`对象
2. 再把节点push到整个全局DOM`(stack)`中，方便之后提交节点访问
3. 第二次提交是上次节点的子节点时，top为上一次提交是push到最后的节点，后续子节点也依次类推。因为`对象地址拷贝`的问题，每次`top.children.push(element)`都会给顶层`document`对象的子节点下对应相同的对象的`children`push。
4. 文本节点也是一样。
5. 自闭合标签就不需要往全局DOM`(stack)`中push。
6. 直到碰到`endTag`，与这一次提交的top（也就是上一次提交的节点）相同时，pop掉stack最后一个节点，表示这个节点的结束。

```javascript
function emit (token) {
  // console.log(token);
  let top = stack[stack.length - 1]
  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName = token.tagName

    for (let p in token) {
      if (p !== 'type' && p !== 'tagname') {
        element.attributes.push({
          name: p,
          value: token[p]
        });
      }
    }

    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing) {
      stack.push(element)
    }

    currentTextNode = null

  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error(`Tag ${token.tagName} start end doesn\'t match`)
    } else {
      stack.pop()
    }

    currentTextNode = null

  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
  console.log(stack)
}
function endTagOpen (c) {
  if (c.match(/^[a-zA-Z0-9]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if (c === ">") {

  }else if (c === 'EOF') {
    return 
  } else {

  }
}
```

### 8. 最后

全部html字符串遍历完成之后，由于`state = state(EOF);`的执行，全部文本解析结束。

## 写在最后

希望我的文章能给你带来一部分启发和帮助，如果有什么不足或错误的地方，欢迎读者`评论`和`留言`

当然，要是本文对你有所帮助，欢迎`点赞`和`转发`，谢谢🙏

[GitHub文章集地址](https://github.com/xyydd/blog-article)

[GitHub源码地址](https://github.com/xyydd/Frontend-01-Template/blob/master/week04/toyBrowser/parser.js)

