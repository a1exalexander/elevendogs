<template>
  <button class="Button"><slot /></button>
</template>

<script>
export default {
  name: 'AppButton',
};
</script>

<style lang="scss">
.Button {
  background-color: transparent;
  outline: none;
  padding: 0 32px;
  @include flex(center, center);
  display: inline-flex;
  border: 2px solid $mocca;
  @include text($H16, 500, $mocca);
  line-height: 1;
  min-height: 48px;
  text-transform: uppercase;
  cursor: pointer;
  @include transition(transform, color, background-color, border);
  @include hover {
    background-color: $mocca;
    color: black;
    border-color: transparent;
  }
  &:active {
    border-color: transparent;
  }
}
</style>
