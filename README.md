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



```vue
 <div id="app">
    <div
      class="contentgrid"
      @touchstart="touchstartEvents($event)"
      @touchend="touchendEvents($event)"
    >
      <contentgrid
        ref="contentgrid"
        :dataArray="datatext"
        :loading="true"
        :wheelEvents="true"
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
      </contentgrid>
    </div>
  </div>
```

```vue
import Contentgrid from "contentgrid"; 

components: {
    Contentgrid,
  },
data() {
    return {
      datatext: [
        {
          id: 0,
          TitleName: "Far Eastern leopard",
          StatusName: "Critically endangered",
          image: require("../images/leopard2.jpg"),
        },
        {
          id: 1,
          TitleName: "Asian lion",
          StatusName: "Endangered",
          image: require("../images/lion2.jpg"),
        },
        {
          id: 2,
          TitleName: "Siberian tiger",
          StatusName: "Endangered",
          image: require("../images/tiger2.jpg"),
        },
        {
          id: 3,
          TitleName: "Brown bear",
          StatusName: "Least concern",
          image: require("../images/bear2.jpg"),
        },
      ],
    };
  },
methods: {
    touchstartEvents(event) {
      this.$refs.contentgrid.touchstartEvents(event);
    },
    touchendEvents(event) {
      this.$refs.contentgrid.touchendEvents(event);
    },
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

- **dataArray** - The array to be rendered.
- **loading** - Whether to display a loading animation. Default is `true`.
- **pagination** - Whether to display the right-side pagination buttons. Default is `true`.
- **wheelEvents** - Whether to enable mouse wheel events. Default is `true`.