<script setup>
import { ref } from 'vue'
import SimulateChildModel from './SimulateChildModel.vue'

const count = ref(0)
</script>

<template>
  <div>
    <div style="color: red">{{ count }}</div>
    <SimulateChildModel @update-count="(e) => (count = e)" :count="count"></SimulateChildModel>
  </div>
</template>
