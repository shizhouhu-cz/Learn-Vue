<script setup>
// 这个linkedVal是一个CustomRef，它的get和set都被拦截了，在set里会触发事件通知父组件修改对应的ref，并引发重新渲染。
const linkedVal = defineModel()
const [titleVal, modifiers] = defineModel('model-title', {
  set(val) {
    return modifiers.upper ? String.prototype.toUpperCase.call(val) : val
  },
})
// const props = defineProps('model-titleModifiers')
// console.log(props['model-titleModifiers'])
</script>

<template>
  <div>
    <span>currentModel value in Child is : {{ $attrs['model-titleModifiers'] }} </span>
    <button @click="linkedVal++">increase models</button>
    <input v-model="titleVal" />
  </div>
</template>
z
