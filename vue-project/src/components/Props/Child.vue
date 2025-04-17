<script setup>
import { watch } from 'vue'

// 用法一
// const props = defineProps(['name','age'])
// console.log(props)
const { name, age = 18 } = defineProps(['name', 'age'])
console.log(name)
// 用法二
// defineProps({
//   name: String,
//   age: Number,
// })

// 用法三
// defineProps({
//   age: {
//     // 允许的类型
//     type: [Number, null],
//     // 是否必传
//     required: true,
//   },
//   name: {
//     type: String,
//     // 默认值
//     default: '王五',
//   },
// })
watch(
  () => name,
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
  },
)
</script>

<template>
  <div>
    <p>Name:{{ name }}</p>
    <p>Age:{{ $props.age }}</p>
  </div>
</template>
