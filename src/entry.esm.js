
// Import vue component
import Contentgrid from '@/contentgrid.vue';
import Carousel from '@/carousel.vue';

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
export default /*#__PURE__*/(() => {
  // Get component instance
  const installable = {
    Contentgrid,
    Carousel
  };

  // Attach install function executed by Vue.use()
  installable.install = (Vue) => {
    Vue.component('Contentgrid', Contentgrid);
    Vue.component('Carousel', Carousel);
  };
  return installable;
})();
// Named exports for the individual components
export { Contentgrid, Carousel };
// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
