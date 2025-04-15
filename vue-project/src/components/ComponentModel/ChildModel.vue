<script setup>
// 这个linkedVal是一个CustomRef，它的get和set都被拦截了，在set里会触发事件通知父组件修改对应的ref，并引发重新渲染。
const linkedVal = defineModel()
const [titleVal,modifiers] = defineModel('model-title', {
  get(val) {
    if (!val?.startsWith('Ryan')) {
      return modifiers.upper ? 'Ryan Upper' + val : val
    }
    return val
  },
})
</script>

<template>
  <div>
    <span>currentModel value in Child is : {{ linkedVal }}</span>
    <button @click="linkedVal++">increase models</button>
    <div>
      <input v-model="titleVal" />
    </div>
  </div>
</template>
