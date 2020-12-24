<template>
  <div class="Home">
    <dark-image class="" :src="require('@/assets/images/Slide1.png')" />
  </div>
</template>

<script>
import DarkImage from '../components/common/DarkImage.vue';

export default {
  name: 'Home',
  components: { DarkImage }
};
</script>
