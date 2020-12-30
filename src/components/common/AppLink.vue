<template>
  <router-link :event="exact" v-if="!!to" :to="to" :class="['AppLink', { _line: line }]"
    ><slot
  /></router-link>
  <a v-else :href="href" target="_blank" :class="['AppLink', { _line: line }]"><slot /></a>
</template>

<script>
export default {
  name: 'AppLink',
  props: {
    to: [String, Object],
    href: [String],
    exact: Boolean,
    line: Boolean,
  },
};
</script>

<style lang="scss">
.AppLink {
  cursor: pointer;
  text-decoration: none;
  background-color: transparent;
  border: none;
  position: relative;
  outline: none;
  @include text(16px, 500, $mocca);
  @include transition(color);
  @include hover {
    color: lighten($mocca, 20%);
    &:after,
    &:before {
      background-color: lighten($mocca, 20%);
    }
  }
  &:active {
    color: darken($mocca, 15%);
    &:after,
    &:before {
      background-color: darken($mocca, 15%);
    }
  }
  &._line {
    &:after,
    &:before {
      content: '';
      display: block;
      height: 1px;
      width: 0;
      position: absolute;
      bottom: -6px;
      background-color: $mocca;
      @include transition(width);
    }
    &:after {
      left: 50%;
      transform: rotate(180deg);
      transform-origin: left center;
    }
    &:before {
      left: 50%;
      transform-origin: center left;
    }
    @include hover {
      &:after,
      &:before {
        width: 50%;
      }
    }
    &:active {
      &:after,
      &:before {
        width: 50%;
      }
    }
  }
}
</style>
