<template>
  <img class="DarkImage" :src="src" alt="" rel="preload" />
</template>

<script>
export default {
  name: 'DarkImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'Eleven Dogs',
    },
  },
};
</script>

<style lang="scss">
.DarkImage {
  filter: brightness(0.4);
  position: fixed;
  @include position();
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  object-fit: cover;
  z-index: -1;
}
</style>
