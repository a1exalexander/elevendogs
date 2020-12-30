<template>
  <img class="DarkImage" :src="src" :alt="alt" rel="preload" />
</template>

<script>
export default {
  name: 'DarkImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: String,
  },
};
</script>

<style lang="scss">
.DarkImage {
  filter: brightness(0.4);
  position: absolute;
  @include position();
  height: 100%;
  width: 100%;
  overflow: hidden;
  object-fit: cover;
  z-index: -1;
}
</style>
