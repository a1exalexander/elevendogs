<template>
  <nav class="Menu">
    <ul class="Menu__list">
      <li class="Menu__item">
        <app-link exact class="Menu__link" :to="{ name: routeTypes.HOME }">Головна</app-link>
      </li>
      <li class="Menu__item">
        <app-link class="Menu__link" :to="{ name: routeTypes.SERVICES }">Послуги</app-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { routeTypes } from '../../router';
import AppLink from './AppLink.vue';

export default {
  components: { AppLink },
  name: 'AppMenu',
  props: {
    opacity: Number,
  },
  data() {
    return {
      routeTypes,
    };
  },
};
</script>

<style lang="scss">
@keyframes dotBounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
$style: Menu;
%link-dot {
  &:before {
    @include transition(color, background-color, transform, opacity, visible);
    content: '';
    display: block;
    @include size(6px, true);
    background-color: $mocca;
    position: absolute;
    bottom: -12px;
    transform: scale(0);
    visibility: hidden;
    opacity: 0;
    @include media($screen-tablet) {
      right: -18px;
      bottom: auto;
    }
  }
}
%link-active {
  &:before {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
  }
}
.#{$style} {
  &__list {
    list-style: none;
    @include flex(center, center);
    @include media($screen-tablet) {
      @include flex-col(flex-start, flex-end);
    }
  }
  &__item {
    &:not(:last-child) {
      margin-right: 24px;
      @include media($screen-tablet) {
        margin-right: 0;
        margin-bottom: 12px;
      }
    }
  }
  &__link {
    letter-spacing: 0.5px;
    text-transform: uppercase;
    position: relative;
    @include flex(center, center);
    display: inline-flex;
    @extend %link-dot;
    will-change: transform, color;
    @include transition(color, opacity, transform);
    @include media($screen-tablet) {
      justify-content: start;
    }
    &.router-link-exact-active {
      @extend %link-active;
    }
    @include hover {
      transform: scale(1.02);
      &:before,
      &:after {
        color: lighten($mocca, 20%);
        background-color: lighten($mocca, 20%);
      }
    }
    &:active {
      transform: scale(0.98);
      &:before,
      &:after {
        color: darken($mocca, 20%);
        background-color: darken($mocca, 20%);
      }
    }
  }
}
</style>
