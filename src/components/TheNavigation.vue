<template>
  <div class="Navigation">
    <logo-text class="Navigation__logo" />
    <app-menu class="Navigation__menu" />

    <ul class="ContactList Navigation__contact">
      <li class="ContactList__item">
        <contact-link
          icon="instagram"
          href="https://www.instagram.com/eleven.dogs"
          text="@eleven.dogs"
        />
      </li>
      <li class="ContactList__item">
        <contact-link icon="phone" href="tel:+3800669960006" text="+380669960006" />
      </li>
    </ul>

    <app-link class="Navigation__location" href="https://goo.gl/maps/wEtkFJMWqqpxhxMVA"
      >Кременчук, вул. Івана Мазепи, 28</app-link
    >
  </div>
</template>
<script>
import AppLink from './common/AppLink.vue';
import AppMenu from './common/AppMenu.vue';
import ContactLink from './common/ContactLink.vue';
import LogoText from './common/icons/LogoText.vue';

export default {
  name: 'TheNavigation',
  components: { LogoText, AppMenu, AppLink, ContactLink }
};
</script>
<style lang="scss">
$style: Navigation;
.#{$style} {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2;
  padding: 36px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  &__logo {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    justify-self: start;
    align-self: start;
  }
  &__menu {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    justify-self: end;
    align-self: start;
  }
  &__contact {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
    justify-self: end;
    align-self: center;
  }
  &__location {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    justify-self: start;
    align-self: end;
  }
  &__link {
    &.router-link-exact-active {
      &:before {
        content: '';
        display: block;
        @include size(6px);
        background-color: $mocca;
      }
    }
  }
  &__contact-list {
    grid-row: 1 / 3;
    grid-column: 2 / 3;
    justify-self: end;
    align-self: center;
  }
}
$style: ContactList;
.#{$style} {
  @include flex-col(flex-start, flex-end);
  list-style: none;
  &__item {
    &:not(:last-child) {
      margin-bottom: 18px;
    }
  }
}
</style>
