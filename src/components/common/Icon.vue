<template>
  <component :is="`icon-${name}`" />
</template>
<script>
import IconInstagram from './icons/IconInstagram.vue';
import IconPhone from './icons/IconPhone.vue';

export default {
  name: 'Icon',
  components: {
    IconInstagram,
    IconPhone
  },
  props: {
    name: {
      type: String,
      required: true,
      validator(value) {
        return ['instagram', 'phone'].indexOf(value) !== -1;
      }
    }
  }
};
</script>
