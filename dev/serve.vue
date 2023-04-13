<template>
  <div id="app">
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
  </div>
</template>
<script>
import Vue from "vue";
import Contentgrid from "@/contentgrid.vue";

export default Vue.extend({
  name: "ServeDev",
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
  methods: {
    touchstartEvents(event) {
      this.$refs.contentgrid.touchstartEvents(event);
    },
    touchendEvents(event) {
      this.$refs.contentgrid.touchendEvents(event);
    },
  },
});
</script>


