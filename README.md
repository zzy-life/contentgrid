# WebGL Transition Effect Plugin :sparkles:

<div align="center">
<h3>
  Translation
</h3>
<p align="center">
  <a href="./docs/README-zh.md">中文</a>
</p>
</div>


This plugin uses WebGL and three.js technology to achieve impressive transition effects that are mobile-friendly. It can help you add beautiful transition effects to your website or application to enhance the user experience.

Currently only tested in vue2.

![GIF2023-4-13-10-50-25](docs/GIF2023-4-13-10-50-25.gif)

However, it should be noted that since the plugin uses three.js technology, it will increase the size of your application. If your application is very focused on file size, use this plugin with caution. :warning:

## Installation :inbox_tray:

You can install this plugin using npm or yarn.

Using npm:

```shell
npm i contentgrid --save
```

Using yarn:

```shell
yarn add contentgrid
```



## Dependencies :heavy_check_mark:

It is recommended to use the specified version, and other versions have not been tested.

gsap animation library

```shell
npm i gsap@1.20.4  
```

imagesloaded image loading library

```shell
npm i imagesloaded@5.0.0
```

three front-end 3D library

```shell
npm i three@0.105.0
```



## Usage :rocket:

Import and initialize the plugin in your application:



### Contentgrid

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



### Carousel

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


## Options :gear:

Here are the available options for the plugin:

| Parameter   | Description                           | Type    | Optional Values | Default |
| :---------- | :------------------------------------ | :------ | :-------------- | :------ |
| dataArray   | Array to be rendered                  | array   | —               | —       |
| loading     | Whether to display loading animation  | boolean | —               | true    |
| pagination  | Whether to display right side buttons | boolean | —               | true    |
| wheelEvents | Whether to enable mouse wheel events  | boolean | —               | true    |
| intensity   | animation intensity                   | Number  | 0.1-0.9         | 0.4     |

## Events

| Event Name | Description                     | Callback Parameters                 |
| :--------- | :------------------------------ | :---------------------------------- |
| change     | Triggered when switching slides | Index of the currently active slide |

## Other

### Not using slots

The slidetitle and slidestatus slots have limited customization options.

You can define your own text, for example:

```vue
<div>
    <div class="meta">Species</div>
    <h2 id="slide-title" ref="slidetitle">{{text}}</h2>
</div>
```

Import the dependency and use it in the change callback function:

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