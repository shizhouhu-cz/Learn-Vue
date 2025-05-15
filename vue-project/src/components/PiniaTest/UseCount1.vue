<script setup>
import useCountStore from '@/store/countStore'

const countStore = useCountStore()
console.log(countStore)
</script>
<template>
  <div style="color: lightgreen">
    这是计数器1
    <div>
      目前的count：{{ countStore.count1 }}
      <button @click="countStore.increase()">increase</button>
    </div>

    <div>doubleCount:{{ countStore.doubleCount }}</div>
  </div>
</template>
