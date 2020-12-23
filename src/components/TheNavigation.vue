<template>
  <div class="container">
    <logo-text class="logo" />
    <nav class="navigation">
      <ul class="navigation__list">
        <li class="navigation__item">
          <router-link class="navigation__link" :to="{ name: routeTypes.HOME }">Сервіси</router-link>
        </li>
        <li class="navigation__item">
          <router-link class="navigation__link" :to="{ name: routeTypes.CONTACTS }"
            >Контаки</router-link
          >
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
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 2;
}
</style>
