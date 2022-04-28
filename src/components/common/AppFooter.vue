<template>
  <footer class="AppFooter">
    <app-contact class="AppFooter__contact _mnone" />
    <app-link line class="AppFooter__location" href="https://goo.gl/maps/wEtkFJMWqqpxhxMVA"
      >Кременчук, вул. Івана Мазепи, 28</app-link
    >
  </footer>
</template>

<script>
import AppLink from './AppLink.vue';
import AppContact from './AppContact.vue';

export default {
  name: 'AppFooter',
  components: {
    AppLink,
    AppContact,
  },
};
</script>
<style lang="scss">
.AppFooter {
  @include media($screen-tablet-large) {
    display: none;
  }
  &__contact {
    margin-bottom: 22px;
    @include media($screen-iphone-plus) {
      margin-bottom: 34px;
    }
  }
  &__location {
    display: block;
    padding-right: 50px;
  }
  padding: 34px 34px 64px;
}
</style>
