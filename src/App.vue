<template>
  <the-navigation />
  <transition @beforeEnter="beforeEnter" @enter="enter" @leave="leave" :css="false" mode="out-in">
    <router-view />
  </transition>
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
        opacity: 0
      });
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 2,
        opacity: 1,
        onComplete: done
      });
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 2,
        opacity: 0,
        onComplete: done
      });
    }
  }
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  position: relative;
}
</style>
