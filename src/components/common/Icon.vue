<template>
  <component :is="`icon-${name}`" />
</template>
<script>
import IconInstagram from './icons/IconInstagram.vue';
import IconPhone from './icons/IconPhone.vue';
import IconEmail from './icons/IconEmail.vue';

export default {
  name: 'Icon',
  components: {
    IconInstagram,
    IconPhone,
    IconEmail,
  },
  props: {
    name: {
      type: String,
      required: true,
      validator(value) {
        return ['instagram', 'phone', 'email'].indexOf(value) !== -1;
      },
    },
  },
};
</script>
