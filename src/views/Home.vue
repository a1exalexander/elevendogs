<template>
  <div class="Home" v-swipe="onSwipe" v-wheel="onSwipe">
    <transition>
      <dark-image class="Home__bg" :src="slide.image" />
    </transition>
    <div class="Home__container">
      <div class="Home__title-container">
        <transition
          @beforeEnter="beforeEnterTitle"
          @enter="enterTitle"
          @leave="leaveTitle"
          :css="false"
        >
          <h2 class="Home__title" :key="slide.title">{{ slide.title }}</h2>
        </transition>
      </div>
      <app-button class="Home__button">Записатися</app-button>
    </div>
  </div>
</template>

<script>
import gsap, { TimelineMax, Power4 } from 'gsap';
import DarkImage from '../components/common/DarkImage.vue';
import AppButton from '../components/common/AppButton.vue';

export default {
  name: 'Home',
  components: { DarkImage, AppButton },
  data() {
    return {
      activeSlide: 0,
      slides: [
        {
          title: 'досвідчені барбери',
          image: '/images/Slide1.png',
        },
        {
          title: 'приємна компанія',
          image: '/images/Slide2.png',
        },
        {
          title: 'справжні чоловіки',
          image: '/images/Slide3.png',
        },
        {
          title: 'у нас є смак',
          image: '/images/Slide4.png',
        },
      ],
    };
  },
  methods: {
    onSwipe(direction) {
      const { activeSlide, slides } = this;
      const max = slides.length - 1;
      if (direction === 'UP') {
        const next = activeSlide + 1;
        this.activeSlide = next > max ? 0 : next;
      } else {
        const next = activeSlide - 1;
        this.activeSlide = next < 0 ? max : next;
      }
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
        .to(el, 0.08, { className: 'Home__title _red-shadow' }, 'split')
        .to(el, 0, { scale: 1.1 }, 'split')
        .to(el, 0, { scale: 1 }, '+=0.02')
        .to(el, 0.08, { className: 'Home__title' }, '+=0.09')
        .to(el, 0.05, { className: 'Home__title _green-shadow' }, 'split')
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
  },
  computed: {
    slide() {
      const { slides, activeSlide } = this;
      const slide = slides[activeSlide];
      if (!slide) return slides[0];
      return slide;
    },
  },
};
</script>

<style lang="scss">
.Home {
  &__container {
    padding: 140px 164px 140px 84px;
    min-height: 100vh;
    @include flex(space-between, center);
  }
  &__title-container {
    width: 100%;
    height: 100%;
    @include flex(flex-start, center);
    position: relative;
  }
  &__title {
    position: absolute;
    @include text(156px, 600, $mocca);
    font-family: $secondary-font;
    text-transform: uppercase;
    line-height: 101%;
    &._red-shadow {
      text-shadow: -3px 0 red;
    }
    &._green-shadow {
      text-shadow: -3px 0 rgb(0, 175, 0);
    }
  }
  &__button {
    align-self: flex-end;
  }
}
</style>
