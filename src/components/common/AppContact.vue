<template>
  <ul class="AppContact">
    <li class="AppContact__item">
      <contact-link
        icon="instagram"
        href="https://www.instagram.com/eleven.dogs"
        text="@eleven.dogs"
      />
    </li>
    <li class="AppContact__item">
      <contact-link icon="phone" href="tel:+3800669960006" text="+380669960006" />
    </li>
    <li class="AppContact__item AppContact__item--mtless">
      <contact-link
        icon="email"
        href="mailto:hello@elevendogs.com.ua"
        text="hello@elevendogs.com.ua"
      />
    </li>
  </ul>
</template>
<script>
import ContactLink from './ContactLink.vue';

export default {
  name: 'AppContact',
  components: {
    ContactLink,
  },
};
</script>
<style lang="scss">
$style: AppContact;
.#{$style} {
  list-style: none;
  @include media($screen-tablet-small) {
    @include flex-col(flex-start, flex-end);
  }
  &__item {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
    &--mtless {
      margin-top: -2px;
    }
  }
}
</style>
