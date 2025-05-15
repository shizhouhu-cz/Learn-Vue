<script setup>
import { defineAsyncComponent, ref } from 'vue'
import Parent from '../ComponentModel/Parent.vue'
import AsyncChild from './AsyncChild.vue'

const AsyncComp = defineAsyncComponent({
  loader: () => import('./AsyncChild.vue'),
  delay: 2000,
  loadingComponent: Parent,
})
const loading = ref(true)
</script>

<template>
  <AsyncComp></AsyncComp>
  <!-- <AsyncChild></AsyncChild> -->
</template>
