<template>
  <div class="Services" @scroll="onScroll" :style="{ height: viewportHeight.value }">
    <div class="Services__container">
      <dark-image class="Services__bg" :src="require('@/assets/images/Services.jpg')" />
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
  inject: ['viewportHeight'],
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
  overflow-y: auto;
  @include media($screen-tablet) {
    padding-bottom: 0;
  }
  &__container {
    padding: 200px 34px 34px;
    @include flex-col(center, stretch);
    @include media($screen-tablet) {
      padding: 128px 64px 64px;
      min-height: 100vh;
    }
  }
  &__list {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 24px;
    @include media($screen-tablet) {
      @include flex(center, center);
      flex-wrap: wrap;
    }
    @include media($screen-tablet-large) {
      margin-bottom: 32px;
    }
  }
  &__item {
    position: relative;
    &:not(:last-child) {
      margin-bottom: 24px;
    }
    &--middle {
      @include media($screen-tablet) {
        top: -72px;
      }
    }
    @include media($screen-tablet) {
      flex: 1 1 33.3%;
      max-width: 40%;
      &:not(:last-child) {
        margin-bottom: 36px;
      }
      margin-bottom: 36px;
    }
    @include media($screen-fullhd) {
      flex-basis: 33.3%;
      &:not(:last-child) {
        margin-bottom: 42px;
      }
      margin-bottom: 42px;
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
