<template>
  <div class="Services">
    <div class="Services__container">
      <!-- <dark-image class="Services__bg" :src="require('@/assets/images/Services.jpg')" /> -->
      <ul class="Services__list">
        <service
          :class="['Services__item', { _top: [1, 2].includes(idx), _bottom: [5, 6].includes(idx) }]"
          :style="{ 'animation-delay': `0.${idx * 10}s` }"
          v-for="(item, idx) in services"
          :name="item.name"
          :price="item.price"
          :href="`tel:${$seo.phone}`"
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
import Service from '../components/common/Service.vue';
import AppButton from '../components/common/AppButton.vue';
import AppFooter from '../components/common/AppFooter.vue';

export default {
  name: 'Services',
  components: { Service, AppFooter, AppButton },
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
  flex-grow: 1;
  /* max-height: 100vh; */
  /* overflow-y: scroll; */
  @include media($screen-tablet-large) {
    padding-bottom: 0;
  }
  &__container {
    padding: 34px;
    @include flex-col(center, stretch);
    @include media($screen-iphone-6) {
      padding: 34;
    }
    @include media($screen-tablet-large) {
      padding: 64px;
      /* min-height: 100vh; */
    }
  }
  &__list {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 42px;
    @include media($screen-tablet-large) {
      margin-bottom: 0;
      @include flex(center, center);
      flex-wrap: wrap;
    }
  }
  &__item {
    position: relative;
    &:not(:last-child) {
      margin-bottom: 32px;
    }
    &._top {
      @include media($screen-tablet-large) {
        top: -82px;
      }
    }
    &._bottom {
      @include media($screen-tablet-large) {
        bottom: -82px;
      }
    }
    @include media($screen-tablet-large) {
      flex: 1 1 25%;
      max-width: 25%;
      &:not(:last-child) {
        margin-bottom: 36px;
      }
      margin-bottom: 36px;
    }
    @include media($screen-fullhd) {
      flex-basis: 25%;
      &:not(:last-child) {
        margin-bottom: 42px;
      }
      margin-bottom: 42px;
    }
    animation-fill-mode: both;
    animation-name: fadeInDown;
    animation-duration: 0.5s;
    animation-timing-function: ease-in;
  }
  &__button {
    align-self: center;
    @include media($screen-tablet-large) {
      position: absolute;
      transform: translateY(-42px);
    }
  }
  &__more {
    position: absolute;
    bottom: 34px;
    align-self: center;
    text-transform: uppercase;
  }
}
</style>
