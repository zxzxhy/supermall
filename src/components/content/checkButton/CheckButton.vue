<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.check-button {
  margin: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  border-color: red;
  background-color: red;
}
</style>