# WebGL 过渡效果插件 :sparkles:

这个插件使用 WebGL 和 three.js 技术来实现令人印象深刻的过渡效果，适配移动端。它可以帮助你为你的网站或应用程序添加美观的过渡效果，以增强用户体验。

目前仅在vue2中测试

![GIF2023-4-13-10-50-25](GIF2023-4-13-10-50-25.gif)

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



## 使用 :rocket:

在您的应用程序中导入插件并初始化它：

```js
import Contentgrid from "contentgrid";
```

```vue
 <contentgrid ref="contentgrid" :dataArray="datatext" :loading="true" :wheelEvents="false">
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
```

```js
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
```

如果要为滚动插件添加触摸滑动支持

```vue
 <div
      @touchstart="touchstartEvents($event)"
      @touchend="touchendEvents($event)"
    >
      <contentgrid ref="contentgrid" :dataArray="datatext" :loading="true" :wheelEvents="false">
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



## 选项 :gear:

以下是插件的可用选项：

- **dataArray** - 渲染的数组。
- **loading** - 是否需要加载动画。默认为 `true`。
- **loading** - 是否需要加载动画。默认为 `true`。
- **pagination** - 是否显示右侧按钮。默认为 `true`。
- **wheelEvents** - 是否开启鼠标滚轮事件。默认为 `true`。