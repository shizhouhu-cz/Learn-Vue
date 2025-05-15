import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const useCountStore = defineStore('countStore', () => {
  let count1 = ref(0)
  const age = ref(18)
  const name = ref('lisi')
  //   const count2 = ref(10)
  const $reset = () => {
    count1.value = 100
  }

  const doubleCount = computed(() => count1.value * 2)

  function increase() {
    count1.value++
  }
  return { count1, $reset, name, age, doubleCount, increase }
})

// const useCountStore = defineStore('countStore', {
//   state: () => {
//     const count1 = ref(0)
//     const age = ref(18)
//     const name = ref('lisi')
//     return { count1, age, name }
//   },
// })

export default useCountStore
