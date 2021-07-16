# 【最全】canvas插入图片居中调试教程

前一段时间（其实是去年）有一个私活，是做门户网站，设计是：页面内容随鼠标滚轴滚动而播放动画和文字，滚轴停，动画停（参照的是Apple官网的airpods那一页）。之后经过多日研究，作者打算给一个全屏的canvas，然后按帧插入图片来做到鼠标滚轴控制动画播放，但是这就有一个问题：`如何做到一张指定长宽的图片一直能居中显示在屏幕上`。在作者潜心钻研加上翻MDN翻Google之后，就有了解决方案，如下：

## 准备环境和图片

图片长宽比`16：9`,为了防止图片放大而变模糊，所以用的是`3840px * 2160px`，如图![00计算机系统知识.jpg](https://i.loli.net/2021/07/16/wJjfSuI786yYxMn.jpg)

前端框架`Vue`，选vue是因为可以简单的控制canvas大小随页面大小改变

## 代码

还是比较喜欢一上来就开放全部代码，后面我再一点点讲解，不愿意看讲解的可以直接抄代码去跑一下看看有什么问题。

```vue
<template>
  <div>
    <canvas ref="images" :width="sequenceWidth" :height="sequenceHeight"></canvas>
  </div>
</template>

<script>
import { throttle } from 'lodash'

export default {
  name: 'nCanvas',
  data () {
    return {
      sequenceWidth: 1920,
      sequenceHeight: 1080,
      ctx: null
    }
  },
  methods: {
    handleDraw (image) {  // 主要方法
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      if (screenWidth * 9 === screenHeight * 16) {
        this.ctx.drawImage(image, 0, 0, screenWidth, screenHeight)
      } else {
        const dw = screenWidth / 3840
        const dh = screenHeight / 2160
        if (screenWidth <= 3840 && screenHeight >= 2160) {
          this.ctx.drawImage(
            image,
            (screenHeight * 16 / 9 - screenWidth) / 2 * 2160 / screenHeight,
            0,
            3840 - ((screenHeight * 16 / 9 - screenWidth) * 2160 / screenHeight),
            2160,
            0,
            0,
            screenWidth,
            screenHeight
          )
        }
        if (screenWidth < 3840 && screenHeight <= 2160 && dw < dh) {
          this.ctx.drawImage(
            image,
            (screenHeight * 16 / 9 - screenWidth) / 2 * 2160 / screenHeight,
            0,
            3840 - ((screenHeight * 16 / 9 - screenWidth) * 2160 / screenHeight),
            2160,
            0,
            0,
            screenWidth,
            screenHeight
          )
        }
        if (screenWidth > 3840 && screenHeight > 2160 && dw < dh) {
          this.ctx.drawImage(
            image,
            (screenHeight * 16 / 9 - screenWidth) / 2 * 2160 / screenHeight,
            0,
            3840 - ((screenHeight * 16 / 9 - screenWidth) * 2160 / screenHeight),
            2160,
            0,
            0,
            screenWidth,
            screenHeight
          )
        }
        if (screenWidth >= 3840 && screenHeight <= 2160) {
          this.ctx.drawImage(
            image,
            0,
            (screenWidth * 9 / 16 - screenHeight) / 2 * 3840 / screenWidth,
            3840,
            2160 - ((screenWidth * 9 / 16 - screenHeight) * 3840 / screenWidth),
            0,
            0,
            screenWidth,
            screenHeight
          )
        }
        if (screenWidth < 3840 && screenHeight < 2160 && dw > dh) {
          this.ctx.drawImage(
            image,
            0,
            (screenWidth * 9 / 16 - screenHeight) / 2 * 3840 / screenWidth,
            3840,
            2160 - ((screenWidth * 9 / 16 - screenHeight) * 3840 / screenWidth),
            0,
            0,
            screenWidth,
            screenHeight
          )
        }
        if (screenWidth > 3840 && screenHeight > 2160 && dw > dh) {
          this.ctx.drawImage(
            image,
            0,
            (screenWidth * 9 / 16 - screenHeight) / 2 * 3840 / screenWidth,
            3840,
            2160 - ((screenWidth * 9 / 16 - screenHeight) * 3840 / screenWidth),
            0,
            0,
            screenWidth,
            screenHeight
          )
        }
      }
    },
    resize: throttle(function (e) { // 使用throttle控制resize的频率
      this.sequenceWidth = window.innerWidth
      this.sequenceHeight = window.innerHeight
      this.$nextTick(() => { // 在其他操作都结束后，做图片加载和画入canvas
        const img = new Image()
        img.src = 'https://i.loli.net/2021/07/16/wJjfSuI786yYxMn.jpg'
        img.onload = () => {
          this.handleDraw(img) // 主要方法
        }
      })
    }, 350)
  },
  mounted () {
    this.ctx = this.$refs.images.getContext('2d')// 获取canvas
    this.resize()// 给canvas重置大小
    window.addEventListener('resize', this.resize)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.resize)
    })
  }
}
</script>
<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>

```

## 讲解

### drawImage

`drawImage`这个方法最多可以传9个参数，而我们就是要全部用到这9个参数，请把参数的含义仔细看清楚哦，以下为[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)摘抄：

0. 语法

```javasc
ctx.drawImage(image, dx, dy, dWidth, dHeight);
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

1. image

绘制到上下文的元素。允许任何的 canvas 图像源([`CanvasImageSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasImageSource))，例如：[`CSSImageValue` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/CSSImageValue)，[`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement)，[`SVGImageElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SVGImageElement)，[`HTMLVideoElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLVideoElement)，[`HTMLCanvasElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)，[`ImageBitmap`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap) 或者[`OffscreenCanvas`](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas)。

2. `sx`可选

需要绘制到目标上下文中的，`image`的矩形（裁剪）选择框的左上角 X 轴坐标。

3. `sy`可选

需要绘制到目标上下文中的，`image`的矩形（裁剪）选择框的左上角 Y 轴坐标。

4. `sWidth`可选

需要绘制到目标上下文中的，`image`的矩形（裁剪）选择框的宽度。如果不说明，整个矩形（裁剪）从坐标的`sx`和`sy`开始，到`image`的右下角结束。

5. `sHeight`可选

需要绘制到目标上下文中的，`image`的矩形（裁剪）选择框的高度。

6. dx

`image`的左上角在目标canvas上 X 轴坐标。

7. dy

`image`的左上角在目标canvas上 Y 轴坐标。

8. `dWidth`可选

`image`在目标canvas上绘制的宽度。 允许对绘制的`image`进行缩放。 如果不说明， 在绘制时`image`宽度不会缩放。

9. `dHeight`可选

`image`在目标canvas上绘制的高度。 允许对绘制的`image`进行缩放。 如果不说明， 在绘制时`image`高度不会缩放。

### handleDraw

`handleDraw`首先判断页面内容区域是否和图片比例相同

#### 页面内容区域和图片比例相同

```javascript
if (screenWidth * 9 === screenHeight * 16) {
    this.ctx.drawImage(image, 0, 0, screenWidth, screenHeight)
}
```

相同就只需要用到`ctx.drawImage(image, dx, dy, dWidth, dHeight);`这个用法。

`dx`和`dy`为0，表示图片在`canvas`上`(0, 0)`坐标

`dWidth`为页面内容宽度，`dHeight`为页面内容高度，这样就能对图片进行缩放，如果这个两个参数不加，则不会对图片进行缩放

#### 页面内容区域和图片比例不同

不同的话就需要分为6种情况，并且需要一个屏幕和图片长宽比的值

用于比较实际内容长宽和图片长宽的比例

```javascript
const dw = screenWidth / 3840
const dh = screenHeight / 2160
```

1. 内容宽度小于等于图片实际宽度，内容高度大于等于图片实际高度
2. 内容宽度小于图片实际宽度，内容高度小于等于图片实际高度，且宽度比小于高度比
3. 内容宽度大于图片实际宽度，内容高度大于图片实际高度，且宽度比小于高度比
4. 内容宽度大于等于图片实际宽度，内容高度小于等于图片实际高度
5. 内容宽度小于图片实际宽度，内容高度小于图片实际高度，且宽度比大于高度比
6. 内容宽度大于图片实际宽度，内容高度大于图片实际高度，且宽度比大于高度比

其中` 1、2、3`都只需要裁剪宽度，等比缩放高度。`4、5、6`需要裁剪高度，等比缩放宽度

##### 裁剪宽度，等比缩放高度

只用`1`进行举例

![image.png](https://i.loli.net/2021/07/16/h52ZgUFV68Nlqpj.png)

```javascript
this.ctx.drawImage(
    image,
    (screenHeight * 16 / 9 - screenWidth) / 2 * 2160 / screenHeight,
    0,
    3840 - ((screenHeight * 16 / 9 - screenWidth) * 2160 / screenHeight),
    2160,
    0,
    0,
    screenWidth,
    screenHeight
)
```

这种情况就需要对图片宽度进行裁剪，保证左右两边距离相同，所以使用`ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);`这种用法，`sx`和`sy`为图片上的坐标，`sWidth`和`sHeight`是需要剪裁图片的长宽，这四个参数加在一起就是图片裁剪。

先计算sx，当前屏幕高度按图片尺寸16：9的比例换算成：如果是16：9，当前屏幕高度应该对应多少屏幕宽度。计算出来的值 减去 当前实际屏幕宽度，这就是图片宽比当前屏幕宽大的值，再除2。这个时候其实就已经是sx的值了，但是这个时候的值因为图片高度没有缩放，所以还不准确，需要再按图片高度和实际内容高度换算后，才是真正图片上的x坐标。

sy为0，就是坐标为图片的顶端。

计算sWidth，与sx同理，用实际图片宽度 减 按比例计算出多余的宽度。

sHeight 为实际图片高度。

实际效果如下图，红色区域大致为剪裁后的图片，因为拉伸高度后，对宽度也会有一定的缩放，所以实际剪裁后的图片宽度应该小于页面内容宽度：![image.png](https://i.loli.net/2021/07/16/KHBMhlze9Pn2b6T.png)

##### 裁剪高度，等比缩放宽度

只用`4`进行举例

![image.png](https://i.loli.net/2021/07/16/Vna96zkcEFtrGSW.png)

```javascript
this.ctx.drawImage(
    image,
    0,
    (screenWidth * 9 / 16 - screenHeight) / 2 * 3840 / screenWidth,
    3840,
    2160 - ((screenWidth * 9 / 16 - screenHeight) * 3840 / screenWidth),
    0,
    0,
    screenWidth,
    screenHeight
)
```

其实裁剪参数的计算都与`裁剪宽度，等比缩放高度`相同，只不过宽度计算和计算高度对调一下，最终裁剪结果如图：![image.png](https://i.loli.net/2021/07/16/JQ37tojLUpdYVi8.png)

## 总结

以上就是所有内容，希望对你有所帮助

如果有什么不足或错误的地方，欢迎读者<font color="red">评论</font>和<font color="red">留言</font>

当然，要是本文对你有所帮助，欢迎<font color="red">点赞</font>和<font color="red">转发</font>，谢谢🙏

