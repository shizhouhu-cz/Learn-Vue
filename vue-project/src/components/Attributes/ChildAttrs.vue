<script setup>
import { useAttrs, watch } from 'vue'
import CChildAttrs from './CChildAttrs.vue'

// Promise.resolve().then(() => {
//   const attrs = useAttrs()
//   console.log(attrs)
// })
// defineOptions({
//   inheritAttrs: false,
// })

const attrs = useAttrs()
console.log(attrs.count)
</script>

<template>
  <!-- <div class="big-font" style="text-decoration: underline">
    <span :class="$attrs.class">这是一段文字</span>
  </div> -->
  <div></div>
  <CChildAttrs :class="$attrs.class"></CChildAttrs>
</template>

<style>
.big-font {
  font-size: large;
}
</style>
