#About Javascript Optimization
####写在开头
最近在做一些项目中的代码优化，但是不知道从哪里开始下手，总希望通过一些工具来分析整个项目，然后提出一些优化方案，比如Google的PageSpeed插件，确实分析后，进行了一些优化，比如图片的压缩，代码的压缩等，但是性能没有想象中那样显著提升；然后也用过Google的performance, 看到的结果就是js代码部分加载和执行都需要占用80%的事件，想说要不用算法优化一些代码试试，但是学了一些算法却不知道该怎么用。这时候发现必须脚踏实地的从代码结构和写法开始进行优化了。
##1.确定已经进行代码压缩、图片压缩和开始Gzip.
代码压缩可以使用webpack的[optimization](https://webpack.docschina.org/configuration/optimization/)

图片压缩在[这里](https://tinypng.com/)，免费的也挺好用，失真不多。

Gzip用webpack插件[CompressionWebpackPlugin](https://webpack.docschina.org/plugins/compression-webpack-plugin/)

还有很多种方式，这里只举例一种。

##2.然后就是进行一点一点地代码结构写法的优化了
###2.1循环系列
####a. 能不用forEach就别用，不能偷懒啊。

下面是用jsperf测出来的结果
![测试结果](https://www.ydtx08.cn/wordpress/wp-content/uploads/2019/07/屏幕快照-2019-07-23-上午10.51.30.png)

    看吧，一个for循环就差那么多，那项目中那么多循环要差多少。

####.数组循环的时候，记得把length单独拉出来等于一个变量。
![测试结果2](https://www.ydtx08.cn/wordpress/wp-content/uploads/2019/07/屏幕快照-2019-07-23-上午10.59.39.png)

这个的原因和函数的作用域链有关，还有for循环的执行步骤原理有关

    for循环执行：

    1.先初始i = 0;
    2.判断i是否小于a.length;
    3.执行下面代码块;
    4.代码块执行结束，执行i++;
    5.然后循环 2 - 4 ;
    6.直到2中，i不小于a.length，退出循环。

上面的步骤中，多次访问a.length,按作用域链来说，访问a是在寻找函数作用域链的第一层中的a，a.length是a作用域链的第一层length，也就是多次进行了作用域链的查询再查询，而使用一个变量直接等于a.length，则只需要访问a作用域链的length一次，之后的每一次，都只需要访问函数作用域链中的len就行了，看起来是很简单的一步优化，但是确实也给每个循环提升了一点点。

