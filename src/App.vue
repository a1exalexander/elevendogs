<template>
  <the-navigation />

  <router-view class="app-view" v-slot="{ Component }">
    <transition @beforeEnter="beforeEnter" @enter="enter" @leave="leave" :css="false" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import gsap from 'gsap';
import TheNavigation from './components/TheNavigation.vue';

export default {
  components: { TheNavigation },
  name: 'App',
  methods: {
    beforeEnter(el) {
      gsap.set(el, {
        opacity: 0.2,
        scale: 1.05
      });
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 0.3,
        opacity: 1,
        scale: 1,
        onComplete: done
      });
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.3,
        opacity: 0.2,
        scale: 1.05,
        onComplete: done
      });
    }
  }
};
</script>

<style lang="scss">
html {
  overflow: hidden;
}
#app {
  min-height: 100vh;
  position: relative;
}
.app-view {
  min-height: 100vh;
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
