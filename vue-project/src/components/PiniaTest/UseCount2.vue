<script setup>
import useCountStore from '@/store/countStore'

const countStore = useCountStore()
// 解构会破坏响应性，因为这里通过代理返回的只是值而已，对其修改也无法影响store；该值没有订阅者，无法响应store的更新
const { name, age } = countStore

function patch() {
  countStore.count1++
  countStore.$patch({
    age: 900,
    name: 'wangwu',
    // count1: 20,
  })
}

countStore.$subscribe((mutation, state) => {
  console.log(mutation)
  console.log(state)
})
</script>
<template>
  <div style="color: lightblue">
    这是计数器2
    <div>
      目前的count：{{ countStore.count1 }}
      <button @click="countStore.count1 += 2">increase</button>
      <div>目前的age：{{ countStore.age }}</div>
      <div>目前的name：{{ countStore.name }}</div>
      -------- 解构方式访问的状态
      <div>目前的age：{{ age }}</div>
      <div>目前的name：{{ name }}</div>
    </div>

    <div>
      <button @click="countStore.$reset()">重置store</button>
      <button @click="patch">patch state</button>
    </div>
  </div>
</template>
