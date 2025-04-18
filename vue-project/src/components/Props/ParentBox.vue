<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const students = ref([
  { name: 'zhangsan', age: 19 },
  { name: 'lisi', age: 23 },
  { name: '大山'},
])
</script>
<template>
  <div>
    <Child v-bind="stu" v-for="stu in students"></Child>
  </div>
</template>
