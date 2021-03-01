<template>
  <li class="Service">
    <a class="Service__link" :href="href">
      <h3 class="Service__name">{{ name }}</h3>
      <span class="Service__price">{{ animatedNumber }}</span>
    </a>
  </li>
</template>
<script>
import gsap from 'gsap';

export default {
  name: 'Service',
  props: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: [Number, String],
      required: true,
    },
    href: {
      type: String,
      default: '#',
    },
  },
  data() {
    return {
      tweenedNumber: 0,
    };
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0);
    },
  },
  mounted() {
    gsap.to(this.$data, { duration: 1.3, tweenedNumber: this.price });
  },
};
</script>
<style lang="scss">
.Service {
  display: block;
  &__link {
    text-decoration: none;
    @include flex(space-between, center);
    @include media($screen-tablet-large) {
      flex-direction: column;
      justify-content: center;
    }
  }
  &__name {
    text-transform: uppercase;
    @include text(calc(100vw / 24), 600, $mocca);
    line-height: 1;
    white-space: nowrap;
    @include media($screen-tablet-large) {
      font-size: calc(100vw / 54);
      margin-bottom: 18px;
    }
    @include media($screen-desktop) {
      font-size: calc(100vw / 60);
      margin-bottom: 18px;
    }
    @include media($screen-fullhd) {
      font-size: $H24;
    }
  }
  &__price {
    @include text(calc(100vw / 9), 600, $mocca);
    line-height: 1;
    @include media($screen-tablet-large) {
      font-size: calc(100vw / 11);
    }
    @include media($screen-desktop) {
      font-size: calc(100vw / 12);
    }
    @include media($screen-desktop-large) {
      font-size: calc(100vw / 13);
    }
    @include media($screen-hd) {
      font-size: calc(100vw / 14);
    }
    @include media($screen-fullhd) {
      font-size: calc(100vw / 15);
    }
    @include media($screen-retina) {
      font-size: $H-PRICE;
    }
  }
}
</style>
