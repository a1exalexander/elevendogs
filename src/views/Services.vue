<template>
  <div class="Services" @scroll="onScroll">
    <div class="Services__container">
      <dark-image class="Services__bg" :src="require('@/assets/images/Slide3.png')" />
      <ul class="Services__list">
        <service
          :class="['Services__item', { 'Services__item--middle': idx === 1 }]"
          :style="{ 'animation-delay': `0.${idx * 2}s` }"
          v-for="(item, idx) in services"
          :name="item.name"
          :price="item.price"
          :key="item.name"
        />
      </ul>
      <app-button class="Services__button">Записатися</app-button>
    </div>
    <app-footer class="Services__footer" />
  </div>
</template>
<script>
import services from '../../services.json';
import DarkImage from '../components/common/DarkImage.vue';
import Service from '../components/common/Service.vue';
import AppButton from '../components/common/AppButton.vue';
import AppFooter from '../components/common/AppFooter.vue';

export default {
  name: 'Services',
  components: { DarkImage, Service, AppFooter, AppButton },
  data() {
    return {
      services,
    };
  },
};
</script>

<style lang="scss">
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.Services {
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 120px;
  @include media($screen-tablet-small) {
    padding-bottom: 0;
  }
  &__container {
    padding: 200px 34px 34px;
    @include flex-col(center, stretch);
    @include media($screen-tablet-small) {
      padding: 128px 64px 64px;
      min-height: 100vh;
    }
  }
  &__list {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 42px;
    @include media($screen-tablet-small) {
      @include flex(center, center);
      flex-wrap: wrap;
    }
  }
  &__item {
    position: relative;
    &:not(:last-child) {
      margin-bottom: 24px;
    }
    &--middle {
      @include media($screen-tablet-small) {
        top: -72px;
      }
    }
    @include media($screen-tablet-small) {
      flex: 1 1 33.3%;
      max-width: 40%;
      &:not(:last-child) {
        margin-bottom: 42px;
      }
      margin-bottom: 42px;
    }
    @include media($screen-desktop-large) {
      flex-basis: 33.3%;
    }
    animation-fill-mode: both;
    animation-name: fadeInDown;
    animation-duration: 0.4s;
    animation-timing-function: ease-in;
  }
  &__button {
    align-self: center;
  }
  &__more {
    position: absolute;
    bottom: 34px;
    align-self: center;
    text-transform: uppercase;
  }
}
</style>
