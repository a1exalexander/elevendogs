<template>
  <a
    @mouseleave="visible = false"
    :class="['ContactLink', { _visible: visible }]"
    :href="href"
    target="_blank"
  >
    <transition @beforeEnter="beforeEnter" @enter="enter" @leave="leave" :css="false">
      <div v-show="visible" class="ContactLink__expand ContactLink__expand--mnone">{{ text }}</div>
    </transition>
    <icon
      @mouseenter="visible = true"
      @click="visible = true"
      class="ContactLink__icon"
      :name="icon"
    />
    <div class="ContactLink__expand ContactLink__expand--dnone">{{ text }}</div>
  </a>
</template>
<script>
import gsap from 'gsap';
import Icon from './Icon.vue';

export default {
  components: { Icon },
  name: 'ContactLink',
  props: {
    href: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    text: String,
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    beforeEnter(el) {
      gsap.set(el, {
        opacity: 0,
        translateX: -25,
      });
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 0.3,
        opacity: 1,
        translateX: 0,
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.3,
        opacity: 0,
        translateX: -25,
        onComplete: done,
      });
    },
  },
};
</script>

<style lang="scss">
$style: ContactLink;
.#{$style} {
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  &:after {
    content: '';
    display: block;
    position: absolute;
    background-color: black;
    @include position(-6px, -12px, -6px, -12px);
    z-index: -1;
    width: 0;
    opacity: 0;
    @include transition(width, opacity);
    transition-duration: 1;
  }
  @include media($screen-tablet) {
    &._visible {
      &:after {
        width: calc(100% + 24px);
        opacity: 1;
      }
    }
  }

  @include hover {
    .#{$style}__icon {
      transform: scale(1.1);
    }
  }
  &__icon {
    @include svg($H24, $mocca);
    @include transition(transform);
    margin-right: 14px;
    @include media($screen-tablet) {
      margin-right: 0;
      margin-left: 14px;
    }
  }
  &__expand {
    // -webkit-user-select: all; /* Chrome all / Safari all */
    // -moz-user-select: all; /* Firefox all */
    // -ms-user-select: all; /* IE 10+ */
    // user-select: all;
    text-decoration: none;
    @include text($H16, 500, $mocca);
    display: inline-flex;
    align-items: center;
    right: calc(100% + 12px);
    &--mnone {
      right: calc(100% + 12px);
      @media screen and (max-width: $screen-tablet) {
        display: none;
      }
    }
    &--dnone {
      @include media($screen-tablet) {
        display: none;
      }
    }
  }
  &__layer {
    position: absolute;
    right: 0;
    width: 160px;
    top: 0;
    bottom: 0;
  }
}
</style>
