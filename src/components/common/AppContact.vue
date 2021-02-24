<template>
  <ul class="AppContact">
    <li class="AppContact__item">
      <contact-link
        icon="instagram"
        :href="`https://www.instagram.com/${$seo.instagram}`"
        :text="`@${$seo.instagram}`"
      />
    </li>
    <li class="AppContact__item">
      <contact-link icon="phone" href="tel:+3800669960006" :text="$seo.phone" />
    </li>
    <li class="AppContact__item AppContact__item--mtless">
      <contact-link icon="email" :href="`mailto:${$seo.email}`" :text="$seo.email" />
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
  @include media($screen-tablet) {
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
