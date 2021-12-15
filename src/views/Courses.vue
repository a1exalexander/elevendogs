<template>
  <div class="Courses" @scroll="onScroll" :style="{ height: viewportHeight.value }">
    <div class="Courses__container">
      <dark-image class="Services__bg" :src="require('@/assets/images/Courses.jpg')" />
      <div class="Courses__content">
        <div class="Courses__row">
          <div v-for="course in courses" :key="course.name" class="Courses__col">
            <h2 class="Courses__title">{{ course.name }}</h2>
            <div v-for="stage in course.stages" :key="stage.name">
              <h4 class="Courses__subtitle" v-if="stage.name">{{ stage.name }}</h4>
              <ul class="Courses__list">
                <li v-for="value in stage.values" :key="value" class="Courses__item">
                  {{ value }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer class="Courses__footer" />
  </div>
</template>
<script>
import DarkImage from '../components/common/DarkImage.vue';
import AppFooter from '../components/common/AppFooter.vue';
import courses from '../../courses.json';

export default {
  name: 'Courses',
  components: { DarkImage, AppFooter },
  inject: ['viewportHeight'],
  data() {
    return {
      courses,
    };
  },
};
</script>

<style lang="scss">
.Courses {
  max-height: 100vh;
  overflow-y: scroll;
  @include media($screen-tablet-large) {
    padding-bottom: 0;
  }
  &__container {
    padding: 220px 34px 34px;
    @include flex-col(center, stretch);
    @include media($screen-iphone-6) {
      padding: 250px 34px 34px;
    }
    @include media($screen-tablet-large) {
      padding: 180px 74px 80px 48px;
      min-height: 100vh;
    }
  }
  &__content {
    @include media {
      max-height: calc(100vh - 180px - 80px);
      overflow-y: auto;
    }
  }
  &__row {
    @include flex();
    flex-wrap: wrap;
    @include media {
      flex-wrap: nowrap;
    }
  }
  &__col {
    flex: 1 1 100%;
    max-width: 100%;
    margin-bottom: 32px;
    @include media {
      flex: 1 1 calc(100% / 3);
      max-width: calc(100% / 3);
      margin-bottom: 0;
      padding: 0 24px;
    }
  }
  &__title {
    @include text($H16, 500, $mocca);
    margin-bottom: 16px;
  }
  &__subtitle {
    @include text($H14, 500, $mocca);
    margin-bottom: 12px;
  }
  &__list {
    padding-left: 16px;
    margin-bottom: 12px;
  }
  &__item {
    @include text($H12, 400, $mocca);
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
