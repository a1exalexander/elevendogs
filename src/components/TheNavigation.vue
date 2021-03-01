<template>
  <div class="Navigation">
    <router-link
      :style="{ opacity: logoOpacity, pointerEvents: getPointerEvents(logoOpacity) }"
      class="Navigation__logo-wrapper"
      :to="{ name: routeTypes.HOME }"
      ><logo-text class="Navigation__logo"
    /></router-link>
    <app-menu
      :style="{ opacity: menuOpacity, pointerEvents: getPointerEvents(menuOpacity) }"
      :opacity="menuOpacity"
      class="Navigation__menu"
    />
    <app-contact class="Navigation__contact _mnone" />
    <app-link
      line
      class="Navigation__location Navigation__location--mnone"
      href="https://goo.gl/maps/wEtkFJMWqqpxhxMVA"
      >{{ $seo.location }}</app-link
    >
  </div>
</template>
<script>
import AppLink from './common/AppLink.vue';
import AppMenu from './common/AppMenu.vue';
import AppContact from './common/AppContact.vue';
import LogoText from './common/icons/LogoText.vue';
import { routeTypes } from '../router';

export default {
  name: 'TheNavigation',
  components: { LogoText, AppMenu, AppLink, AppContact },
  props: {
    scrollTop: Number,
  },
  inject: ['viewportWidth'],
  data() {
    return {
      routeTypes,
    };
  },
  methods: {
    getPointerEvents(opacity) {
      return Math.ceil(opacity) ? 'visible' : 'hidden';
    },
    toOpacity(min, max) {
      if (this.viewportWidth.value >= 768) return 1;
      if (this.$route.name !== routeTypes.SERVICES) return 1;
      const offset = max - min;
      if (this.scrollTop > max) return 0;
      if (this.scrollTop >= min) {
        return (max - this.scrollTop) / offset;
      }
      return 1;
    },
  },
  computed: {
    menuOpacity() {
      return this.toOpacity(0, 60);
    },
    logoOpacity() {
      if (this.viewportWidth.value >= 600) return this.toOpacity(0, 60);
      return this.toOpacity(60, 120);
    },
  },
};
</script>
<style lang="scss">
$style: Navigation;
.#{$style} {
  width: 100%;
  position: absolute;
  z-index: 2;
  pointer-events: none;
  padding: 36px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  @include media($screen-tablet-large) {
    position: fixed;
    height: 100vh;
  }
  &__logo-wrapper {
    @include transition(opacity);
    pointer-events: all;
    grid-row: 1 / 2;
    grid-column: 1 / 3;
    justify-self: center;
    align-self: start;
    @include media($screen-tablet-large) {
      grid-column: 1 / 2;
      justify-self: start;
    }
  }
  &__menu {
    @include transition(opacity);
    pointer-events: all;
    grid-row: 1 / 2;
    grid-column: 1 / 3;
    justify-self: center;
    align-self: start;
    margin-top: 88px;
    @include media($screen-tablet-large) {
      margin-top: 0;
      grid-column: 2 / 3;
      justify-self: end;
    }
  }
  &__contact {
    &._mnone {
      display: none;
      @include media($screen-tablet-large) {
        display: flex;
      }
    }
    @include media($screen-tablet-large) {
      pointer-events: all;
      grid-row: 1 / 3;
      grid-column: 2 / 3;
      justify-self: end;
      align-self: center;
    }
  }
  &__location {
    &--mnone {
      display: none;
      @include media($screen-tablet-large) {
        display: inline-flex;
      }
    }
    pointer-events: all;
    grid-row: 2 / 3;
    grid-column: 1 / 3;
    justify-self: start;
    align-self: end;
    position: relative;
  }
  &__link {
    &.router-link-exact-active {
      &:before {
        content: '';
        display: block;
        @include size(6px);
        background-color: $mocca;
      }
    }
  }
  &__contact-list {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
    justify-self: end;
    align-self: center;
  }
}
</style>
