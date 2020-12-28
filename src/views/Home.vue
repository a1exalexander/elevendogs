<template>
  <div class="Home" v-swipe="onSwipe" v-wheel="onSwipe">
    <transition
      appear
      @before-enter="beforeEnterImage"
      @enter="enterImage"
      @leave="leaveImage"
      :css="false"
      mode="out-in"
    >
      <dark-image :src="slide.image" :key="slide.title" />
    </transition>
    <div class="Home__container">
      <div class="Home__title-container">
        <transition appear @enter="enterTitle" @leave="leaveTitle" :css="false">
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
  components: { AppButton, DarkImage },
  data() {
    return {
      timer: null,
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
      }, 5000);
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
        opacity: 0.5,
        filter: 'grayscale(1) brightness(0.4)',
      });
    },
    enterImage(el, done) {
      const tl = new TimelineMax();
      tl.to(el, 0.3, {
        scale: 1,
        opacity: 1,
        filter: `grayscale(0) hue-rotate(0deg) brightness(0.4)`,
        ease: Power4.easeInOut,
      })
        .to(el, 0.1, {
          filter: `grayscale(0) hue-rotate(200deg) brightness(0.4)`,
          ease: Power4.easeInOut,
        })
        .to(el, 0.1, {
          filter: `grayscale(0) hue-rotate(240deg) brightness(0.4)`,
          ease: Power4.easeInOut,
        })
        .to(el, 0.1, {
          filter: `grayscale(0) hue-rotate(300deg) brightness(0.4)`,
          ease: Power4.easeInOut,
        })
        .to(el, 0.1, {
          filter: `grayscale(0) hue-rotate(360deg) brightness(0.4)`,
          ease: Power4.easeInOut,
        })
        .to(el, 0.1, {
          filter: `grayscale(0) hue-rotate(0) brightness(0.4)`,
          ease: Power4.easeInOut,
          onComplete: done,
        });
    },
    leaveImage(el, done) {
      gsap.to(el, {
        duration: 0.4,
        opacity: 0.5,
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
    }, 5000);
  },
  beforeUnmount() {
    this.autoplay();
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
