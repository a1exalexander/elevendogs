<template>
  <the-navigation :scroll-top="scrollTop" />

  <router-view ref="routerView" @scroll="onScroll" class="App__view" v-slot="{ Component }">
    <transition @beforeEnter="beforeEnter" @enter="enter" @leave="leave" :css="false" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import gsap from 'gsap';
import TheNavigation from './components/TheNavigation.vue';
import { routeTypes } from './router';

export default {
  components: { TheNavigation },
  name: 'App',
  data() {
    return {
      scrollTop: 0,
    };
  },
  methods: {
    beforeEnter(el) {
      gsap.set(el, {
        opacity: 0.2,
      });
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 0.3,
        opacity: 1,
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.3,
        opacity: 0.2,
        onComplete: done,
      });
    },
    onScroll(e) {
      if (this.$route.name === routeTypes.SERVICES) {
        this.scrollTop = e.target.scrollTop;
      }
    },
  },
  watch: {
    $route() {
      if (this.$route.name === routeTypes.SERVICES) {
        this.scrollTop = this.$refs.routerView.scrollTop;
      }
    },
  },
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  },
};
</script>

<style lang="scss">
html {
  height: 100vh;
  overflow: hidden;
}
#app {
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.App__view {
  min-height: 100%;
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all 0.75s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
