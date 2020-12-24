<template>
  <img :src="src" :alt="alt" />
</template>

<script>
export default {
  name: 'DarkImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: String
  }
};
</script>

<style lang="scss" scoped>
  img {
    filter: brightness(0.4);
    position: absolute;
    @include position();
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>
