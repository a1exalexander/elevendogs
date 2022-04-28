<template>
  <div class="Courses">
    <div class="Courses__container">
      <!-- <dark-image class="Services__bg" :src="require('@/assets/images/Courses.jpg')" /> -->
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
// import DarkImage from '../components/common/DarkImage.vue';
import AppFooter from '../components/common/AppFooter.vue';
import courses from '../../courses.json';

export default {
  name: 'Courses',
  components: { AppFooter },
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
      padding: 34px;
    }
    @include media($screen-tablet-large) {
      padding: 0 36px 36px;
      min-height: 100vh;
    }
  }
  &__content {
    @include media {
      /* max-height: calc(100vh - 180px - 80px); */
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
    &:not(:last-child) {
      margin-bottom: 32px;
    }
    @include media {
      flex: 1 1 calc(100% / 3);
      max-width: calc(100% / 3);
      margin-bottom: 0;
      padding: 0 24px;
    }
  }
  &__title {
    @include text($H20, 700, $mocca);
    margin-bottom: 20px;
  }
  &__subtitle {
    @include text($H18, 700, $mocca);
    margin-bottom: 16px;
  }
  &__list {
    padding-left: 16px;
    margin-bottom: 16px;
  }
  &__item {
    @include text($H16, 400, $mocca);
    line-height: 150%;
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
