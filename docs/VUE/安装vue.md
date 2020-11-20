# 安装vue

vue有两种安装方式， 一种是[`直接引入`](#直接引入)，第二种是通过[`vue-cli脚手架`](#vue-cli脚手架)安装

## 直接引入

直接在head中用script标签引入

开发环境下：有调试模式和告警，也可以用来学习。

```HTML
<script src="https://cn.vuejs.org/js/vue.js"></script>
```

生产下，删除了告警，并进行了压缩

```HTML
<script src="https://cn.vuejs.org/js/vue.min.js"></script>
```

## vue-cli脚手架

#### 全局npm安装vue

现在最新的应该是`vue-cli3`

```shell
npm i -g vue
```

#### 在需要创建项目的目录下运行

```shell
vue create yourDemoProject
```

#### 接下来进入vue创建项目的选择程序

稍等一会，如果`yourDemoProject`文件夹本身存在的话，就会弹出这样的问题:

```shell
Vue CLI v3.4.0
? Target directory /Users/**/yourDemoProject already exists. Pick an
 action: (Use arrow keys)
❯ Overwrite
  Merge
  Cancel
```

问题是：这个`yourDemoProject`文件夹已存在，选择接下来要做的事情：覆盖、合并、退出。方向键上、下来选择需要的选项，回车键是`确认`，下同。

选择完或没有已存在的文件夹，就会出现让你选择预安装的内容：

```shell

Vue CLI v3.4.0
? Please pick a preset: (Use arrow keys)
❯ demo (vue-router, vuex, less, babel, eslint, unit-jest)
  config (vue-router, vuex, less, babel, eslint, unit-jest)
  singleP (vuex, babel, eslint)
  preset (babel, typescript, pwa, unit-jest)
  airbnbEslint (vue-router, vuex, less, babel, eslint, unit-jest)
  simple-components (babel, eslint, unit-mocha)
  default (babel, eslint)
  Manually select features
(Move up and down to reveal more choices)
```

这是我自己的一些预安装的集合，起初会给几个默认的，比如：`default`。

如果有原先设置好的预安装集合，选择一个后就会直接开始安装，等到之后，跳到[`运行项目`](#运行项目)

##### Manually select features 选择需要的预安装包

选择最后一项`Manually select features`，是让你自己选择需要的预安装包，会变成这样的界面：

```shell
Vue CLI v3.4.0
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to t
oggle all, <i> to invert selection)
❯◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◯ Router
 ◯ Vuex
 ◯ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```

这里除了方向键上、下，`space`空格键是选上需要的或取消已选的，`a`是选择所有，`i`是反向选择。选择完成后，按`enter`回车，会出现下面问题：

```shell
Use history mode for router? (Requires proper server setup for index fallback
in production) (Y/n)
```

路由管理是否使用`history`模式（`注：history模式就是在url的域名后面没有#号,这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面`）,路由默认是` hash `模式（`使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载`）,看自己需要，我基本上会选择`n`。

##### CSS Pre-processors

如果你在预安装选项里选择了`CSS Pre-processors`，那么就会出现这样的问题：

```shell
Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported
by default): (Use arrow keys)
❯ Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
  Less
  Stylus
```

问你需要哪个 `css pre-processor`，选一个自己平时用的就好了，比如我会选择Less。

##### Linter / Formatter

如果你在预安装选项里选择了`Linter / Formatter`，那么就会出现这样的问题：

```shell
? Pick a linter / formatter config: (Use arrow keys)
❯ ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
  ESLint + Prettier
```

选择一个`ESLint`的配置：

`ESLint with error prevention only`只会报error

`ESLint + Airbnb config`是Airbnb的ESLint

```shell
Pick additional lint features: (Press <space> to select, <a> to toggle all, <i
> to invert selection)
❯◉ Lint on save
 ◯ Lint and fix on commit
```

`Lint on save`：保存就检查代码语法

`Lint and fix on commit`：只有在`commit` 的时候检查并修复。

##### Unit Testing

如果选择了`Unit Testing`:

```shell
Pick a unit testing solution: (Use arrow keys)
❯ Mocha + Chai
  Jest
```

这是测试的框架选择。

##### 配置文件放在哪

```shell
Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arro
w keys)
❯ In dedicated config files
  In package.json
```

`In dedicated config files`：在各自的配置文件中

`In package.json`：在`package.json`文件中

##### 是否保存刚刚的预安装配置

```shell
Save this as a preset for future projects?(y/N)
```

选择`N`就结束了，然后就会自动开始安装。

选择`y`: 会继续出现这个 `Save preset as:` 填写保存预安装的名字。回车，开始安装下载依赖。过程基本上会持续1-10分钟。

##### 运行项目

所有依赖安装完成后，会出现下面提示，然后接着在命令行中以此输入下面的命令，一个`vue` demo项目就跑起来了

```shell
$ cd vue-demo
$ npm run serve
```

