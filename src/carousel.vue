
<!--
 * @Author: 时不待我 790002517@qq.com
 * @Date: 2023-04-12 09:24:15
 * @LastEditors: 时不待我 790002517@qq.com
 * @LastEditTime: 2023-04-17 16:26:38
-->
<template>
  <div
    :class="loading && loadingLook ? 'loading body' : 'body'"
    ref="contentgrid"
    @touchstart="touchstartEvents($event)"
    @touchend="touchendEvents($event)"
    @mouseover="pauseSlideshow"
    @mouseleave="startSlideshowAgain"
  >
    <main>
      <div class="slider" ref="slider">
        <div class="slider-inner">
          <div class="slider-content">
            <slot name="slidetitle" :htmlText="htmlText"></slot>
            <slot name="slidestatus" :htmlText="htmlText"></slot>
          </div>
        </div>
        <img v-for="item in datatext" :key="item.id" :src="item.image" />
        <div class="pagination" v-if="pagination">
          <button
            :class="curIdx == index ? 'active' : ''"
            v-for="(item, index) in datatext.length"
            :key="index"
            @click="buttonEvents(index)"
          ></button>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { TweenLite } from "gsap";
import * as THREE from "three";
import imagesLoaded from "imagesloaded";
export default /*#__PURE__*/ {
  name: "Carousel", // vue component name
  props: {
    //接受的数据
    dataArray: {
      type: Array,
    },
    //是否显示loading
    loading: {
      type: Boolean,
      default: true,
    },
    //是否显示右侧按钮
    pagination: {
      type: Boolean,
      default: true,
    },
    //是否自动切换
    autoplay: {
      type: Boolean,
      default: true,
    },
    //是否鼠标移上去暂停
    shouldPause: {
      type: Boolean,
      default: false,
    },
    //自动切换时间间隔
    interval: {
      type: Number,
      default: 3000,
    },
    //动画强度
    intensity: {
      type: Number,
      default: 0.4,
    },
  },
  // 使用watch监听
  watch: {
    dataArray: {
      immediate: true,
      deep: true,
      handler(newvalue, oldvalue) {
        //this.headobj =newvalue;不做拷贝不行接受的是地址值
        this.datatext = JSON.parse(JSON.stringify(newvalue));
      },
    },
  },

  data() {
    return {
      render: {
        renderW: 0,
        renderH: 0,
      },
      canvasProperty: {
        canvasWidth: 0,
        canvasHeight: 0,
      },
      //滚动位移参数
      startX: 0,
      //three属性
      renderer: null,
      scene: null,
      camera: null,
      mat: null,
      //指示当前展示的索引
      curIdx: 0,
      //loading锁
      loadingLook: true,
      //渲染锁
      AnimatingLook: false,
      //渲染的图片组
      sliderImages: [],
      //定时器
      slideshowInterval: null,
      htmlText: {
        TitleName: "远东豹",
        StatusName: "极度濒危",
      },
    };
  },
  created() {
    this.$emit("myEvent");
  },
  methods: {
    init() {
      imagesLoaded(document.querySelectorAll("img"), () => {
        this.loadingLook = false;
        const el = this.$refs.slider;
        const imgs = Array.from(el.querySelectorAll("img"));
        this.displacementSlider({
          parent: el,
          images: imgs,
        });

        this.animate();
        this.resize();
      });
    },
    /**
     * @description: 动画渲染
     * @return {*}
     */
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    /**
     * @description: 主方法
     * @param {*} opts
     * @return {*}
     */
    displacementSlider(opts) {
      // 顶点着色器代码
      let vertex = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;
      // 片段着色器代码
      let fragment = `
      varying vec2 vUv;

    uniform sampler2D currentImage;
    uniform sampler2D nextImage;
    uniform float dispFactor;
    void main() {

        vec2 uv = vUv;
        vec4 _currentImage;
        vec4 _nextImage;
        float intensity = ${this.$props.intensity};

        vec4 orig1 = texture2D(currentImage, uv);
        vec4 orig2 = texture2D(nextImage, uv);
        //计算图片x轴位移
        float origPos1 =float(uv.x+(dispFactor * (orig2 * intensity)));
        float origPos2 = float(uv.x -(1.0 - dispFactor) * (orig1 * intensity));
         // 当前图片的偏移
        _currentImage = texture2D(currentImage,vec2(origPos1,uv.y));
        // 下一张图片的偏移
        _nextImage = texture2D(nextImage,vec2(origPos2,uv.y));
    
        // 混合两张图片
        vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);
      
        gl_FragColor = finalTexture;

    }
`;

      let images = opts.images,
        image;
      this.canvasProperty.canvasWidth = images[0].clientWidth;
      this.canvasProperty.canvasHeight = images[0].clientHeight;
      let parent = opts.parent;
      let renderWidth = parent.offsetWidth;
      let renderHeight = parent.offsetHeight;

      // 按照1:1.2的比例计算宽高
      let aspectRatio = 1.2;
      let minDimension = Math.min(renderWidth, renderHeight);
      let maxDimension = Math.max(renderWidth, renderHeight);
      if (maxDimension === renderWidth) {
        this.render.renderW = minDimension * aspectRatio;
        this.render.renderH = minDimension;
      } else {
        this.render.renderH = minDimension * aspectRatio;
        this.render.renderW = minDimension;
      }

      // 创建 WebGL 渲染器
      let renderer = new THREE.WebGLRenderer({
        antialias: false,
      });
      // 设置像素比率

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x23272a, 1.0);
      renderer.setSize(this.render.renderW, this.render.renderH);
      parent.appendChild(renderer.domElement);
      // 创建纹理加载器
      let loader = new THREE.TextureLoader();
      loader.crossOrigin = "anonymous";
      //遍历图片列表，将其添加到sliderImages数组中
      images.forEach((img) => {
        image = loader.load(img.getAttribute("src") + "?v=" + Date.now());
        image.magFilter = image.minFilter = THREE.LinearFilter;
        image.anisotropy = renderer.capabilities.getMaxAnisotropy();
        this.sliderImages.push(image);
      });
      // 创建场景、相机、材质和几何体，并添加到场景中
      let scene = new THREE.Scene();
      scene.background = new THREE.Color(0x23272a);
      let camera = new THREE.OrthographicCamera(
        renderWidth / -2,
        renderWidth / 2,
        renderHeight / 2,
        renderHeight / -2,
        1,
        1000
      );

      camera.position.z = 1;

      let mat = new THREE.ShaderMaterial({
        uniforms: {
          dispFactor: { type: "f", value: 0.0 },
          currentImage: { type: "t", value: this.sliderImages[0] },
          nextImage: { type: "t", value: this.sliderImages[1] },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0,
      });

      let geometry = new THREE.PlaneBufferGeometry(
        parent.offsetWidth,
        parent.offsetHeight,
        1
      );
      let object = new THREE.Mesh(geometry, mat);
      object.position.set(0, 0, 0);
      scene.add(object);
      this.camera = camera;
      this.renderer = renderer;
      this.mat = mat;
      this.scene = scene;
    },
    /**
     * @description: 视窗大小改变时，重新设置渲染器的大小
     * @return {*}
     */
    resize() {
      window.addEventListener("resize", (e) => {
        let parent = this.$refs.slider;
        let renderWidth = parent.offsetWidth;
        let renderHeight = parent.offsetHeight;

        // 按照1:1.2的比例计算宽高
        let aspectRatio = 1.2;
        let minDimension = Math.min(renderWidth, renderHeight);
        let maxDimension = Math.max(renderWidth, renderHeight);
        if (maxDimension === renderWidth) {
          this.render.renderW = minDimension * aspectRatio;
          this.render.renderH = minDimension;
        } else {
          this.render.renderH = minDimension * aspectRatio;
          this.render.renderW = minDimension;
        }

        this.renderer.setSize(this.render.renderW, this.render.renderH);
      });
    },
    TweenLiteAnimation() {
      //动画切换时执行的回调函数
      this.$emit("change", this.curIdx);
      this.AnimatingLook = true;
      this.mat.uniforms.nextImage.value = this.sliderImages[this.curIdx];
      this.mat.uniforms.nextImage.needsUpdate = true;
      TweenLite.to(this.mat.uniforms.dispFactor, 1, {
        value: 1,
        ease: "Expo.easeInOut",
        onComplete: () => {
          this.mat.uniforms.currentImage.value = this.sliderImages[this.curIdx];
          this.mat.uniforms.currentImage.needsUpdate = true;
          this.mat.uniforms.dispFactor.value = 0.0;
          this.AnimatingLook = false;
        },
      });
      //给按钮生成动画
      let slideTitleEl = this.$parent.$refs.slidetitle;
      let slideStatusEl = this.$parent.$refs.slidestatus;
      const nextItem = this.datatext[this.curIdx];
      if (slideTitleEl) {
        let nextSlideTitle = nextItem.TitleName;
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
              this.htmlText.TitleName = nextSlideTitle;

              TweenLite.to(slideTitleEl, 0.5, {
                autoAlpha: 1,
                y: 0,
              });
            },
          }
        );
      }
      if (slideStatusEl) {
        let nextSlideStatus = nextItem.StatusName;

        TweenLite.fromTo(
          slideStatusEl,
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
              this.htmlText.StatusName = nextSlideStatus;

              TweenLite.to(slideStatusEl, 0.5, {
                autoAlpha: 1,
                y: 0,
                delay: 0.1,
              });
            },
          }
        );
      }

      //如果自动播放是开启的，定时器也被暂停了，就开启循环播放
      this.$props.autoplay && !this.slideshowInterval
        ? this.startSlideshow(this.$props.interval)
        : "";
    },
    /**
     * @description: 暂停循环播放
     * @return {*}
     */
    pauseSlideshow() {
      this.$props.shouldPause ? this.stopSlideshow() : "";
    },
    /**
     * @description: 开启循环播放
     * @return {*}
     */
    startSlideshowAgain() {
      this.$props.shouldPause ? this.startSlideshow(this.$props.interval) : "";
    },
    /**
     * @description: 定时切换函数
     * @param {*} interval 时间毫秒
     * @return {*}
     */
    startSlideshow(interval) {
      this.slideshowInterval = setInterval(() => {
        const nextIdx = (this.curIdx + 1) % this.sliderImages.length;
        if (!this.AnimatingLook) {
          this.curIdx = nextIdx;

          this.TweenLiteAnimation();
        }
      }, interval);
    },
    /**
     * @description: 暂停定时切换
     * @return {*}
     */
    stopSlideshow() {
      clearInterval(this.slideshowInterval);
      this.slideshowInterval = null;
    },
    /**
     * @description: 鼠标点击按钮切换图片
     * @param {*} index
     * @return {*}
     */
    buttonEvents(index) {
      if (!this.AnimatingLook) {
        this.stopSlideshow();
        this.curIdx = index;

        this.TweenLiteAnimation();
      }
    },
    /**
     * @description: 移动端触摸事件
     * @param {*} event
     * @return {*}
     */
    touchstartEvents(event) {
      this.startX = event.touches[0].clientX;
    },

    touchendEvents(event) {
      //点击事件直接返回
      if (this.startX == event.changedTouches[0].clientX) {
        return;
      }
      let currentSlideIndex = 0;
      if (!this.AnimatingLook) {
        this.stopSlideshow();

        let endX = event.changedTouches[0].clientX;
        let direction = endX < this.startX ? -1 : 1;
        currentSlideIndex = this.curIdx;
        currentSlideIndex += direction;
        if (currentSlideIndex < 0) {
          currentSlideIndex = this.datatext.length - 1;
        } else if (currentSlideIndex >= this.datatext.length) {
          currentSlideIndex = 0;
        }
        this.curIdx = currentSlideIndex;

        this.TweenLiteAnimation();
      }
    },
  },
  mounted() {
    this.init();
    this.$props.autoplay ? this.startSlideshow(this.$props.interval) : "";
  },
  beforeDestroy() {
    this.stopSlideshow();
  },
};
</script>



<style scoped>
@import url("https://use.typekit.net/euz1eqv.css");

a:focus {
  outline: thin dotted;
}

a:active,
a:hover {
  outline: 0;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

hr {
  box-sizing: content-box;
  height: 0;
}

q {
  quotes: "“" "”" "‘" "’";
}

img {
  border: 0;
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  margin: 0;
}

button,
input {
  line-height: normal;
}

button,
select {
  text-transform: none;
}

button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}

button[disabled],
html input[disabled] {
  cursor: default;
}

button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

*,
*::after,
*::before {
  box-sizing: border-box;
}

.body {
  width: 100%;
  height: 100%;
  background-color: #23272a;
  overflow: hidden;
  margin: 0;
  position: relative;
}

main {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider {
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
::v-deep .slider canvas {
  width: 150%;
  height: 150%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.slider img {
  width: 100%;
  max-width: 100%;
  position: relative;
  z-index: 0;
}

.slider-inner {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1060px;
  height: 100%;
  margin: 0 auto;
  z-index: 5;
}

.slider-content {
  padding: 0 10px;
}
.slider-content h2 {
  font-family: "acta-display", serif;
  font-weight: 400;
  font-size: 30px;
  letter-spacing: -1px;
  color: white;
  line-height: 30px;
  margin: 20px 0 60px;
}
@media screen and (min-width: 800px) {
  .slider-content h2 {
    font-size: 110px;
    line-height: 100px;
  }
}
.slider-content span {
  display: none;
}
.slider-content .meta {
  display: inline-block;
  font-family: "Arial", sans-serif;
  font-size: 11px;
  letter-spacing: 5px;
  color: #88888a;
  text-transform: uppercase;
  position: relative;
}
@media screen and (min-width: 800px) {
  .slider-content .meta {
    font-size: 13px;
  }
}
.slider-content .meta:after {
  content: "";
  display: block;
  position: absolute;
  top: 5px;
  right: -55px;
  width: 45px;
  height: 2px;
  background-color: #393d40;
}
.slider-content #slide-status {
  margin-top: 10px;
  font-family: "acta-display", serif;
  font-weight: 400;
  font-size: 18px;
  color: white;
}
@media screen and (min-width: 800px) {
  .slider-content #slide-status {
    font-size: 34px;
  }
}

.pagination {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 40px;
  z-index: 6;
  display: flex;
}
.pagination button {
  display: block;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border-radius: 100%;
  padding: 0;
  margin: 0px 30px;
  cursor: pointer;
  position: relative;
  opacity: 0.2;
  transition: opacity 0.2s ease-in-out;
  outline: none;
}
.pagination button:hover {
  opacity: 0.5;
}
.pagination button.active {
  opacity: 1;
}
.pagination button.active:before {
  width: 300%;
  height: 300%;
  opacity: 1;
}
.pagination button:before {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0;
  transition: opacity 0.4s ease-in-out, width 0.4s ease-in-out,
    height 0.4s ease-in-out;
}

/* Page Loader */
.loading:before {
  content: "";
  position: absolute;
  z-index: 100000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
}
.loading:after {
  content: "";
  position: absolute;
  z-index: 100000;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  margin: -30px 0 0 -30px;
  pointer-events: none;
  border-radius: 50%;
  opacity: 0.4;
  background: white;
  -webkit-animation: loaderAnim 0.7s linear infinite alternate forwards;
  animation: loaderAnim 0.7s linear infinite alternate forwards;
}

@-webkit-keyframes loaderAnim {
  to {
    opacity: 1;
    transform: scale3d(0.5, 0.5, 1);
  }
}

@keyframes loaderAnim {
  to {
    opacity: 1;
    transform: scale3d(0.5, 0.5, 1);
  }
}
</style>
