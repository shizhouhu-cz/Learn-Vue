<script setup>
import { ref, watch } from 'vue'

const val = ref('')

// 方式一
const emit = defineEmits(['enlarge-text'])

// 方式二
// const emit = defineEmits({
//   'enlarge-text'(val) {
//     console.log(val)

//     if (val > 2) {
//       return false
//     }
//     return true
//   },
// })

// 在侦听器中触发事件
watch(val, (newVal) => {
  let fontSize = +newVal
  if (fontSize > 1) {
    fontSize = newVal / 10
  }
  // 事件名之后的参数列表会作为回调函数的参数列表
  emit('enlarge-text', fontSize)
})
</script>

<template>
  <div>
    <input id="input" v-model="val" />
    <label for="input">指定fontsize，输入值如果大于1，则/10</label>
    <div>
      <!-- 在模板中触发事件 -->
      <button @click="$emit('enlarge-text')">fonesize+0.1</button>
    </div>
  </div>
</template>
