<script setup>
import { inject, onRenderTracked, ref, watchEffect,readonly } from 'vue'

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
const emit = defineEmits(['reset', 'enlarge-text'])
function reset() {
  emit('reset')
}

const siteName = inject('siteName')
</script>

<template>
  <div>
    <h4>{{ $props.title }} : {{ age }} {{ greetingMessage }} {{ siteName }} {{console.log($slots)}}</h4>
    <button @click="$emit('enlarge-text', 2, 0.5)">enlarge text</button>
    <button @click="reset">reset</button>
    <span>{{ count }}</span>
  </div>
</template>
