<template>
  <div class="Home">
    <!-- <div v-show="false">
      <img v-for="item in slides" :key="item.title" :src="item.image" rel="preload" />
    </div>
    <transition
      appear
      @before-enter="beforeEnterImage"
      @enter="enterImage"
      @leave="leaveImage"
      :css="false"
      mode="out-in"
    >
      <dark-image :src="slide.image" :key="slide.title" />
    </transition> -->
    <div class="Home__container">
      <div class="Home__title-container">
        <transition appear @enter="enterTitle" @leave="leaveTitle" :css="false">
          <h2 class="Home__title" :key="slide.title">{{ slide.title }}</h2>
        </transition>
      </div>
      <app-button class="Home__button">Записатися</app-button>
    </div>
    <app-footer />
  </div>
</template>

<script>
import gsap, { TimelineMax, Power4 } from 'gsap';
import Flag from '@/assets/images/flag.jpeg';
import AppButton from '../components/common/AppButton.vue';
import AppFooter from '../components/common/AppFooter.vue';

const ANIMATION_DELAY = 4000;

export default {
  name: 'Home',
  components: { AppButton, AppFooter },
  data() {
    return {
      timer: null,
      activeSlide: 0,
      slides: [
        {
          title: 'рускій воєнний корабль',
          image: Flag,
        },
        {
          title: 'іди нах#й',
          image: Flag,
        },
        {
          title: 'ми досвідчені барбери',
          image: Flag,
        },
        {
          title: 'і приємна компанія',
          image: Flag,
        },
        {
          title: 'у нас є смак',
          image: Flag,
        },
        // {
        //   title: 'ми справжні чоловіки',
        //   image: Flag,
        // },
      ],
    };
  },
  methods: {
    next() {
      const { activeSlide, slides } = this;
      const next = activeSlide + 1;
      const max = slides.length - 1;
      this.activeSlide = next > max ? 0 : next;
    },
    prev() {
      const { activeSlide, slides } = this;
      const max = slides.length - 1;
      const next = activeSlide - 1;
      this.activeSlide = next < 0 ? max : next;
    },
    autoplay() {
      this.stop();
      this.timer = setInterval(() => {
        this.next();
      }, ANIMATION_DELAY);
    },
    stop() {
      clearInterval(this.timer);
    },
    onSwipe(direction) {
      this.stop();
      if (direction === 'UP') {
        this.next();
      } else {
        this.prev();
      }
      this.autoplay();
    },
    enterTitle(el, done) {
      const tl = new TimelineMax();

      tl.to(el, 0.2, { opacity: 1, ease: Power4.easeInOut })
        .to(el, 0.1, { skewX: 70, ease: Power4.easeInOut })
        .to(el, 0.04, { skewX: 0, ease: Power4.easeInOut })
        .to(el, 0.04, { opacity: 0 })
        .to(el, 0.04, { opacity: 1 })
        .to(el, 0.04, { x: -20 })
        .to(el, 0.04, { x: 0 })
        .add('split', 0)
        .to(el, 0.1, { className: 'Home__title _red-shadow' }, 'split')
        .to(el, 0, { scale: 1.1 }, 'split')
        .to(el, 0, { scale: 1 }, '+=0.02')
        .to(el, 0.08, { className: 'Home__title' }, '+=0.09')
        .to(el, 0.1, { delay: 0.2, className: 'Home__title _green-shadow' }, 'split')
        .to(el, 0.03, { className: 'Home__title' }, '+=0.01')
        .to(el, 0.02, { scaleY: 1.1, ease: Power4.easeInOut })
        .to(el, 0.04, { scaleY: 1, ease: Power4.easeInOut, onComplete: done });
    },
    leaveTitle(el, done) {
      gsap.to(el, {
        duration: 0.4,
        opacity: 0,
        onComplete: done,
      });
    },
    beforeEnterImage(el) {
      gsap.set(el, {
        scale: 1.05,
        filter: 'grayscale(1) brightness(0.4)',
      });
    },
    enterImage(el, done) {
      const tl = new TimelineMax();
      tl.to(el, {
        duration: 0.5,
        scale: 1,
        filter: 'grayscale(0) brightness(0.4)',
        ease: Power4.easeInOut,
        onComplete: done,
      });
    },
    leaveImage(el, done) {
      gsap.to(el, {
        duration: 0.4,
        filter: 'grayscale(1) brightness(0.4)',
        scale: 1.05,
        onComplete: done,
      });
    },
  },
  computed: {
    slide() {
      const { slides, activeSlide } = this;
      const slide = slides[activeSlide];
      if (!slide) return slides[0];
      return slide;
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.next();
    }, ANIMATION_DELAY);
  },
  beforeUnmount() {
    this.autoplay();
  },
};
</script>

<style lang="scss">
.Home {
  flex-grow: 1;
  @include flex-col(space-between, stretch);
  @include media($screen-tablet-large) {
    padding-bottom: 0;
    display: block;
  }
  &__container {
    overflow: hidden;
    max-width: 100vw;
    flex-grow: 1;
    padding: 0 32px;
    @include flex-col(flex-start, stretch);
    @include media($screen-tablet-large) {
      @include flex(space-between, center);
      padding: 64px;
    }
    @include media {
      padding: 80px 164px 140px 84px;
    }
  }
  &__title-container {
    width: 100%;
    @include flex-col(center, center);
    position: relative;
    height: 120px;
    margin-bottom: 32px;
    @include media($screen-iphone-6) {
      min-height: 200px;
    }
    @include media($screen-iphone-plus) {
      min-height: 200px;
    }
    @include media($screen-tablet-large) {
      min-height: auto;
      height: 100%;
      flex: 1 1;
      @include flex(flex-start, center);
    }
  }
  &__title {
    width: 100%;
    position: absolute;
    @include text($H32, 600, $mocca);
    font-family: $secondary-font;
    text-transform: uppercase;
    line-height: 101%;
    text-align: center;
    @include media($screen-iphone-6) {
      font-size: $H48;
    }
    @include media($screen-iphone-plus) {
      font-size: $H54;
    }
    @include media($screen-tablet-large) {
      text-align: left;
      font-size: calc(100vw / 8);
    }
    @include media {
      font-size: 156px;
    }
    &._red-shadow {
      text-shadow: -3px 0 red;
    }
    &._green-shadow {
      text-shadow: -3px 0 rgb(0, 175, 0);
    }
  }
  &__button {
    @include media($screen-tablet-large) {
      align-self: flex-end;
    }
  }
}
</style>
