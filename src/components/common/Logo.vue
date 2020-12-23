<template>
  <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" class="logo">
    <path d="M1.18799 26.8258V1H6.4989V22.376H13.8525V26.8258H6.4989H1.18799Z" />
    <path
      d="M6.4989 26.8258H1.18799V1H6.4989V22.376M6.4989 26.8258V22.376M6.4989 26.8258H13.8525V22.376H6.4989"
      stroke-width="2"
    />
    <path
      d="M26.5171 0.999987L26.5171 26.8257L21.2062 26.8257L21.2062 5.4497L13.8526 5.44969L13.8526 0.999986L21.2062 0.999986L26.5171 0.999987Z"
    />
    <path
      d="M21.2062 0.999986L26.5171 0.999987L26.5171 26.8257L21.2062 26.8257L21.2062 5.44969M21.2062 0.999986L21.2062 5.44969M21.2062 0.999986L13.8526 0.999986L13.8526 5.44969L21.2062 5.44969"
      stroke-width="2"
    />
  </svg>
</template>
<script>
export default {
  name: 'Logo'
};
</script>
<style lang="scss" scoped>
.logo {
  @include svg(28px, $mocca);
  stroke: $mocca;
}
</style>
