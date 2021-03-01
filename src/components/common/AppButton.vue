<template>
  <a :href="href" @click="onClick" :class="['Button', { _animate: animated }]">
    <span class="Button__wrapper"></span><slot />
  </a>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    href: {
      type: String,
      default: 'https://beauty.dikidi.net/#widget=44771',
    },
  },
  data() {
    return {
      animated: false,
      timer: null,
    };
  },
  methods: {
    onClick(e) {
      this.animate();
      this.$emit('click', e);
    },
    async animate() {
      clearTimeout(this.timer);
      this.animated = false;
      await this.$nextTick();
      this.animated = true;
      this.timer = setTimeout(() => {
        this.animated = false;
      }, 700);
    },
  },
};
</script>

<style lang="scss">
$fuschia: $mocca;
$button-bg: $fuschia;
$button-text-color: $mocca;
$baby-blue: $mocca;
$style: Button;
.#{$style} {
  position: relative;
  background-color: transparent;
  outline: none;
  border: none;
  padding: 14px 32px;
  @include flex(center, center);
  @include text($H16, 500, $mocca);
  line-height: 1;
  min-height: 44px;
  text-transform: uppercase;
  transform-origin: center center;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  z-index: 2;
  width: 100%;
  text-decoration: none;
  @include media($screen-tablet-large) {
    width: auto;
    display: inline-flex;
  }
  &__wrapper {
    display: block;
    border: 2px solid $mocca;
    position: absolute;
    @include position();
    @include transition(transform);
  }
  @include transition(transform, color, background-color, border, padding, right, bottom);
  &:before,
  &:after {
    position: absolute;
    content: '';
    display: block;
    width: 140%;
    height: 100%;
    left: -20%;
    z-index: -1000;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
  }
  &:before {
    display: none;
    top: -75%;
    background-image: radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, $button-bg 20%, transparent 30%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, $button-bg 15%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
  }
  &:after {
    display: none;
    bottom: -75%;
    background-image: radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, $button-bg 15%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%),
      radial-gradient(circle, $button-bg 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
    //background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
  &._animate {
    &:before {
      display: block;
      animation: topBubbles ease-in-out 0.75s forwards;
    }
    &:after {
      display: block;
      animation: bottomBubbles ease-in-out 0.75s forwards;
    }
  }
  @include hover {
    .#{$style}__wrapper {
      transform: scale(1.03);
    }
  }
  &:active {
    .#{$style}__wrapper {
      transform: scale(0.97);
    }
  }
}
@keyframes topBubbles {
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%,
      70% 90%;
  }
  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%,
      90% 30%;
  }
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%,
      90% 20%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}

@keyframes bottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
  }
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
    background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
  }
}
</style>
