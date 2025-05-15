<script setup>
import { ref } from 'vue'
import ChildModel from './ChildModel.vue'

const modelref = ref(1)
const tit = ref('哈哈哈')
</script>

<template>
  <div>
    <div :style="{ color: 'red' }">model value: {{ modelref }};model title:{{ tit }}</div>
    <button @click="modelref++">modify model initialvalue</button>
    <ChildModel v-model="modelref" v-model:model-title.upper="tit"></ChildModel>
  </div>
</template>
