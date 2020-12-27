<template>
  <a @mouseleave="visible = false" class="ContactLink" :href="href" target="_blank">
    <transition @beforeEnter="beforeEnter" @enter="enter" @leave="leave" :css="false">
      <div v-show="visible" class="ContactLink__expand">{{ text }}</div>
    </transition>
    <icon
      @mouseenter="visible = true"
      @click="visible = true"
      class="ContactLink__icon"
      :name="icon"
    />
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
        translateX: -50,
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
        translateX: -50,
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
  @include hover {
    .#{$style}__icon {
      transform: scale(1.1);
    }
  }
  &__icon {
    @include svg($H24, $mocca);
    @include transition(transform);
    margin-left: 14px;
  }
  &__expand {
    text-decoration: none;
    @include text($H16, 500, $mocca);
    display: inline-flex;
    right: calc(100% + 12px);
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
