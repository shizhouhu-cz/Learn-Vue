<script setup>
import { onRenderTracked, ref, watchEffect } from 'vue'

const count = ref(1)
// defineProps(['title'])
const { age } = defineProps({
  age: Number,
  title: String,
  greetingMessage: String,
})

onRenderTracked((e) => {
  // console.log(e);
})
watchEffect(
  () => {
    // console.log(age);
  },
  {
    onTrack(e) {
      // console.log(e);
    },
  },
)
// const emit = defineEmits(['reset'])
// function reset() {
//   emit('reset')
// }
</script>

<template>
  <h4>{{ $props.title }} : {{ age }} {{ greetingMessage }}</h4>
  <button @click="$emit('enlarge-text', 2, 0.5)">enlarge text</button>
  <button @click="reset">reset</button>
  <span>{{ count }}</span>
</template>
