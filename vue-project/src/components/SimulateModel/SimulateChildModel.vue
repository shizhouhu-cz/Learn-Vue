<script setup>
import { ref } from 'vue'

const { count } = defineProps(['count'])
const emit = defineEmits(['updateCount'])
const target = ref()
function update() {
  emit('updateCount', target.value)
}
</script>

<template>
  <input v-model="target" />
  <button @click="update">更新数据</button>
</template>
