<template>
  <router-link :event="exact" v-if="!!to" :to="to" class="AppLink"><slot /></router-link>
  <a v-else :href="href" target="_blank" class="AppLink"><slot /></a>
</template>

<script>
export default {
  name: 'AppLink',
  props: {
    to: [String, Object],
    href: [String],
    exact: Boolean
  }
};
</script>

<style lang="scss">
.AppLink {
  text-decoration: none;
  @include text(16px, 500, $mocca);
  @include transition(color);
  @include hover {
    color: lighten($mocca, 20%);
  }
  &:active {
    color: darken($mocca, 15%);
  }
}
</style>
