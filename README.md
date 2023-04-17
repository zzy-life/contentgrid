# WebGL 过渡效果插件 :sparkles:

<div align="center">
<h3>
  Translation
</h3>
<p align="center">
  <a href="./docs/README-en.md">English</a>
</p>
</div>



这个插件使用 WebGL 和 three.js 技术来实现令人印象深刻的过渡效果，适配移动端。它可以帮助你为你的网站或应用程序添加美观的过渡效果，以增强用户体验。

目前仅在vue2中测试



[Demo](https://zzy-life.github.io/contentgrid/)



![GIF2023-4-13-10-50-25](docs/GIF2023-4-13-10-50-25.gif)

然而，需要注意的是，由于该插件使用了 three.js 技术，因此它将增加您应用程序的包大小。如果您的应用程序非常注重文件大小，请谨慎使用此插件。 :warning:



## 安装:inbox_tray:

您可以使用 npm 或 yarn 进行安装。

使用 npm：

```
npm i contentgrid --save
```

使用 yarn：

```
yarn add contentgrid
```



## 依赖:heavy_check_mark:

推荐使用指定版本，其他版本未做测试

gsap动画库

```shell
npm i gsap@1.20.4  
```

imagesloaded图片加载完成库

```shell
npm i imagesloaded@5.0.0
```

three前端3D库

```shell
npm i three@0.105.0
```



## 使用 :rocket:

在您的应用程序中导入插件并初始化它：

### 滚动内容网格

```vue
 <div id="app">
    <div
      class="contentgrid"
    >
      <Contentgrid
        ref="contentgrid"
        :dataArray="datatext"
        :loading="true"
        :shouldPause="true"
        @change="change"
      >
        <div slot="slidetitle" slot-scope="{ htmlText }">
          <div class="meta">物种</div>
          <h2 id="slide-title" ref="slidetitle">{{ htmlText.TitleName }}</h2>
        </div>
        <div slot="slidestatus" slot-scope="{ htmlText }">
          <div class="meta">保护现状</div>
          <div id="slide-status" ref="slidestatus">
            {{ htmlText.StatusName }}
          </div>
        </div>
      </Contentgrid>
    </div>
  </div>
```

```vue
import {Contentgrid} from "contentgrid"; 

components: {
    Contentgrid,
  },
data() {
    return {
      datatext: [
        {
          id: 0,
          TitleName: "远东豹",
          StatusName: "极度濒危",
          image: require("../images/leopard2.jpg"),
        },
        {
          id: 1,
          TitleName: "亚洲狮",
          StatusName: "濒危",
          image: require("../images/lion2.jpg"),
        },
        {
          id: 2,
          TitleName: "西伯利亚虎",
          StatusName: "濒危",
          image: require("../images/tiger2.jpg"),
        },
        {
          id: 3,
          TitleName: "棕熊",
          StatusName: "无危",
          image: require("../images/bear2.jpg"),
        },
      ],
    };
  },
});
```

```css
body{
  margin: 0;
  padding: 0;
}
#app{
  margin: 0;
  padding: 0;
}
.contentgrid {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
```



### 轮播图

```vue
 <div id="app">
    <div
      class="contentgrid"
    >
     <Carousel
        ref="contentgrid"
        :dataArray="datatext"
        :loading="true"
        :shouldPause="true"
        @change="change"
      >
        <div slot="slidetitle" slot-scope="{ htmlText }">
          <div class="meta">物种</div>
          <h2 id="slide-title" ref="slidetitle">{{ htmlText.TitleName }}</h2>
        </div>
        <div slot="slidestatus" slot-scope="{ htmlText }">
          <div class="meta">保护现状</div>
          <div id="slide-status" ref="slidestatus">
            {{ htmlText.StatusName }}
          </div>
        </div>
      </Carousel>
    </div>
  </div>
```

```vue
import {Carousel} from "contentgrid"; 

components: {
    Carousel,
  },
data() {
    return {
      datatext: [
        {
          id: 0,
          TitleName: "远东豹",
          StatusName: "极度濒危",
          image: require("../images/leopard2.jpg"),
        },
        {
          id: 1,
          TitleName: "亚洲狮",
          StatusName: "濒危",
          image: require("../images/lion2.jpg"),
        },
        {
          id: 2,
          TitleName: "西伯利亚虎",
          StatusName: "濒危",
          image: require("../images/tiger2.jpg"),
        },
        {
          id: 3,
          TitleName: "棕熊",
          StatusName: "无危",
          image: require("../images/bear2.jpg"),
        },
      ],
    };
  },
});
```

```css
body{
  margin: 0;
  padding: 0;
}
#app{
  margin: 0;
  padding: 0;
}
.contentgrid {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
```



## 选项 :gear:

以下是插件的可用选项：

| 参数        | 说明                 | 类型    | 可选值 | 默认值 |
| :---------- | :------------------- | :------ | :----- | :----- |
| dataArray   | 渲染的数组           | array   | —      | —      |
| loading     | 是否需要加载动画     | boolean | —      | true   |
| pagination  | 是否显示切换按钮   | boolean | —      | true   |
| intensity   | 动画强度                 | Number  | 0.1-0.9         | 0.4     |

Contentgrid组件的额外属性

| 参数        | 说明                          | 类型    | 可选值 | 默认值 |
| :---------- | :---------------------------- | :------ | :----- | :----- |
| wheelEvents | 是否开启鼠标滚轮/触摸滑动事件 | boolean | —      | true   |


Carousel组件的额外属性

| 参数        | 说明               | 类型    | 可选值 | 默认值 |
| :---------- | :----------------- | :------ | :----- | :----- |
| autoplay    | 是否自动切换       | Boolean | —      | true   |
| shouldPause | 是否鼠标移上去暂停 | Boolean | —      | false  |
| interval    | 自动切换时间间隔   | Number  | —      | 3000   |


## 事件

| 事件名称 | 说明             | 回调参数               |
| :------- | :--------------- | :--------------------- |
| change   | 幻灯片切换时触发 | 目前激活的幻灯片的索引 |



## 其他

### 不使用插槽

slidetitle和slidestatus插槽自定义内容有限

可自行定义文字，案例：

```vue
<div >
    <div class="meta">物种</div>
    <h2 id="slide-title" ref="slidetitle">{{text}}</h2>
</div>
```

引入依赖然后在change回调函数中使用：

```vue
import { TweenLite } from "gsap";
methods: {
    change(index) {
      //给按钮生成动画
      let slideTitleEl = this.$refs.slidetitle;
      if (slideTitleEl) {
        TweenLite.fromTo(
          slideTitleEl,
          0.5,
          {
            autoAlpha: 1,
            y: 0,
          },
          {
            autoAlpha: 0,
            y: 20,
            ease: "Expo.easeIn",
            onComplete: () => {
              this.text = "美洲豹";

              TweenLite.to(slideTitleEl, 0.5, {
                autoAlpha: 1,
                y: 0,
              });
            },
          }
        );
      }
    },
  },
```

