<script setup>
import { ref } from 'vue'
import ChildModel from './ChildModel.vue'

const modelref = ref(1)
const tit = ref('哈哈哈')
</script>

<template>
  <div>
    <span style="{color:'red'}">Parent model value is {{ modelref }}</span>
    <button @click="modelref++">modify model initialvalue</button>
    <span>{{tit}}</span>
    <ChildModel v-model="modelref" v-model:model-title="tit"></ChildModel>
  </div>
</template>
