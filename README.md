# WebGL Transition Effect Plugin :sparkles:

<div align="center">
<h3>
  Translation
</h3>
<p align="center">
  <a href="./docs/README-zh.md">中文</a>
</p>
</div>


This plugin utilizes WebGL and three.js technology to achieve impressive transition effects, optimized for mobile devices. It helps to add visually appealing transition effects to your website or application, enhancing the user experience.

Only tested in vue2 for now

![GIF2023-4-13-10-50-25](docs/GIF2023-4-13-10-50-25.gif)

However, it should be noted that since this plugin utilizes three.js technology, it will increase the size of your application. If your application is very sensitive to file size, use this plugin with caution. :warning:

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

## Usage :rocket:

Import and initialize the plugin in your application:

```js
import Contentgrid from "contentgrid";
```

```vue
<contentgrid ref="contentgrid" :dataArray="datatext" :loading="true" :wheelEvents="false">
        <div slot="slidetitle" slot-scope="{ htmlText }">
          <div class="meta">Species</div>
          <h2 id="slide-title" ref="slidetitle">{{ htmlText.TitleName }}</h2>
        </div>
        <div slot="slidestatus" slot-scope="{ htmlText }">
          <div class="meta">Conservation Status</div>
          <div id="slide-status" ref="slidestatus">
            {{ htmlText.StatusName }}
          </div>
        </div>
      </contentgrid>

```

```vue
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
```

To add touch swipe support to the scrolling plugin:

```vue
 <div
      @touchstart="touchstartEvents($event)"
      @touchend="touchendEvents($event)"
    >
      <contentgrid ref="contentgrid" :dataArray="datatext" :loading="true" :wheelEvents="false">
        <div slot="slidetitle" slot-scope="{ htmlText }">
          <div class="meta">Species</div>
          <h2 id="slide-title" ref="slidetitle">{{ htmlText.TitleName }}</h2>
        </div>
        <div slot="slidestatus" slot-scope="{ htmlText }">
          <div class="meta">Conservation Status</div>
          <div id="slide-status" ref="slidestatus">
            {{ htmlText.StatusName }}
          </div>
        </div>
      </contentgrid>
    </div>
```

```vue
 methods: {
    touchstartEvents(event) {
      this.$refs.contentgrid.touchstartEvents(event);
    },
    touchendEvents(event) {
      this.$refs.contentgrid.touchendEvents(event);
    },
  },
```

## Options :gear:

Here are the available options for the plugin:

- **dataArray** - The array to be rendered.
- **loading** - Whether to display a loading animation. Default is `true`.
- **pagination** - Whether to display the right-side pagination buttons. Default is `true`.
- **wheelEvents** - Whether to enable mouse wheel events. Default is `true`.