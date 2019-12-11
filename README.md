# zj-chrome-ext

## 写在前面

找了不少如何开发谷歌插件的文章，结果发现都是些很基础的内容，并没有写到如何快速编译打包插件。我就在想为什么不能通过webpack来打包插件呢？如果通过webpack编译的话，就能使开发过程变得更舒服，使文件结构趋向模块化，并且打包的时候直接编译压缩代码。后来发现了 vue-cli-plugin-chrome-ext 插件，通过这个插件能很方便地用 vue-cli3 来开发谷歌插件，并能直接引用各种UI框架跟npm插件。

tip：如果你没接触过谷歌插件开发的话建议先看看基础文档：

[Chrome插件开发全攻略](https://github.com/sxei/chrome-plugin-demo/).

## 搭建环境

1. 创建一个vue-cli3项目： `vue create vue-extension`，对话流程选择默认就行;
2. 进入项目 `cd vue-extension`;
3. 安装 `vue-cli-plugin-chrome-ext` 插件：`vue add chrome-ext`,根据安装对话选项设置好；
4. 删除vue-cli3无用文件跟文件夹：`src/main.js`，`public`、`src/components`；

## 运行项目

`npm run build-watch` 运行开发环境，对修改文件进行实时编译并自动在根目录下生成 `dist` 文件夹，然后在浏览器上加载 `dist` 文件夹完成插件安装。(注意：修改 `background` 文件跟 `manifest.json` 文件并不能实时刷新代码，需要重新加载插件才行)`npm run build`运行生产环境编译打包，将所有文件进行整合打包。

## 引入element UI

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
