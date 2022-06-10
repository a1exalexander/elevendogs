<template>
  <div class="Navigation">
    <router-link
      :style="{ opacity: logoOpacity, pointerEvents: getPointerEvents(logoOpacity) }"
      class="Navigation__logo-wrapper"
      :to="{ name: routeTypes.HOME }"
      ><logo-text class="Navigation__logo"
    /></router-link>
    <!-- <p>vue-global.d.ts</p> -->
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
  components: {
    LogoText, AppMenu, AppLink, AppContact,
  },
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
      if (this.viewportWidth.value >= 860) return 1;
      if (this.$route.name !== routeTypes.SERVICES && this.$route.name !== routeTypes.COURSES) return 1;
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
      return this.toOpacity(0, 50);
    },
    logoOpacity() {
      if (this.viewportWidth.value >= 600) return this.toOpacity(0, 40);
      return this.toOpacity(40, 120);
    },
  },
};
</script>
<style lang="scss">
$style: Navigation;
.#{$style} {
  position: relative;
  width: 100%;
  z-index: 2;
  pointer-events: none;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include media($screen-tablet-large) {
    padding: 36px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__logo-wrapper {
    @include transition(opacity);
    pointer-events: all;
  }
  &__menu {
    @include transition(opacity);
    pointer-events: all;
    @include media($screen-tablet-large) {
      margin-top: 0;
      order: 4;
    }
  }
  &__contact {
    @include media($screen-tablet-large) {
      pointer-events: all;
      order: 3;
      position: fixed;
      right: 32px;
      top: 50vh;
      transform: translateY(-50%);
    }
    &._mnone {
      display: none;
      @include media($screen-tablet-large) {
        display: flex;
      }
    }
  }
  &__location {
    pointer-events: all;
    position: relative;
    &--mnone {
      display: none;
      @include media($screen-tablet-large) {
        display: inline-flex;
        order: 2;
      }
    }
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
    align-self: flex-start;
  }
}
</style>
