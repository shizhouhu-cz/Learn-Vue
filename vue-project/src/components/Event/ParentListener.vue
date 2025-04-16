<script setup>
import { ref } from 'vue'
import ChildTrigger from './ChildTrigger.vue'

const fontSize = ref(1)

// 事件回调
function onEnlargeText(val) {
  if (val) {
    fontSize.value = val
  } else {
    fontSize.value += 0.1
  }
}
</script>

<template>
  <!-- 监听子组件事件 -->
  <ChildTrigger
    @enlarge-text="onEnlargeText"
    :style="{ fontSize: fontSize + 'rem' }"
  ></ChildTrigger>
</template>
