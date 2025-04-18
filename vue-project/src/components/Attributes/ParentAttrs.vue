<script setup>
import { ref } from 'vue'
import ChildAttrs from './ChildAttrs.vue'

const count = ref(18)
</script>

<template>
  <ChildAttrs :count="count" test="123" class="red" style="font-weight: bolder" @click="console.log('haha')"></ChildAttrs>
  <button @click="count++">count++</button>
</template>

<style>
.red {
  color: red;
}
</style>
