<!--
 * @Author: 时不待我 790002517@qq.com
 * @Date: 2023-04-12 09:24:15
 * @LastEditors: 时不待我 790002517@qq.com
 * @LastEditTime: 2023-04-14 17:34:22
-->
<template>
  <div id="app">
    <div class="contentgrid">
      <Carousel
        ref="contentgrid"
        :dataArray="datatext"
        :loading="true"
        :shouldPause="true"
        @change="change"
        :intensity="0.4"
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
      <!-- <Contentgrid
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
      </Contentgrid> -->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Carousel from "@/carousel.vue";
import Contentgrid from "@/contentgrid.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    Carousel,
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
  methods: {
    change(index) {
      console.log(index);
    },
  },
});
</script>
<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  margin: 0;
  padding: 0;
}
.contentgrid {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>


