<template>
  <div class="navigation">
    <logo-text class="navigation__logo" />
    <nav class="menu">
      <ul class="menu__list">
        <li class="menu__item">
          <router-link class="menu__link" :to="{ name: routeTypes.HOME }">Сервіси</router-link>
        </li>
        <li class="menu__item">
          <router-link class="menu__link" :to="{ name: routeTypes.CONTACTS }">Контаки</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { routeTypes } from '../router';
import LogoText from './common/LogoText.vue';

export default {
  name: 'TheNavigation',
  components: { LogoText },
  data() {
    return {
      routeTypes
    };
  }
};
</script>
<style lang="scss">
.navigation {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2;
}
</style>
