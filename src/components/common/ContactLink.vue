<template>
  <a class="ContactLink" :href="href" target="_blank">
    <transition @beforeEnter="beforeEnter" @enter="enter" @leave="leave" :css="false">
      <div v-show="visible" class="ContactLink__expand">{{ text }}</div>
    </transition>
    <icon
      @mouseenter="visible = true"
      @mouseleave="visible = false"
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
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    text: String
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    beforeEnter(el) {
      gsap.set(el, {
        opacity: 0,
        // transform: 'translateX(200px)'
      });
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 0.3,
        opacity: 1,
        // transform: 'translateX(0)',
        onComplete: done
      });
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.3,
        opacity: 0,
        // transform: 'translateX(200px)',
        onComplete: done
      });
    }
  }
};
</script>

<style lang="scss">
$style: ContactLink;
.#{$style} {
  position: relative;
  &__icon {
    @include svg(24px, $mocca);
  }
  &__expand {
    position: absolute;
    right: calc(100% + 12px);
  }
}
</style>
