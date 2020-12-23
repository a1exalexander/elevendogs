<template>
  <the-navigation />
  <transition name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
import TheNavigation from './components/TheNavigation.vue';

export default {
  components: { TheNavigation },
  name: 'App'
};
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
