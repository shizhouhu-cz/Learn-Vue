<script setup>
import { computed, ref } from 'vue';


const condition = ref(0);

const isConditionA = computed(() => {
    return condition.value > 0.6;
})
const isConditionB = computed(() => {
    return condition.value <= 0.3;
})

console.log('reExcute')


</script>

<template>
    <button @click="condition = Math.random()">change condition</button>
    <!-- 如果满足了这个分支的条件，那么后面的分支都不会执行 -->
    <div v-if='isConditionA'>条件分支A</div>
    <!-- 当不满足ConditionA时会进入这个分支进行判断 -->
    <div v-else-if='isConditionB'>条件分支B</div>
    <!-- 这里的指令没有值 -->
    <div v-else>default分支</div>
    
    
    <div v-if='condition > 0.6'>条件分支A</div>
    <!-- 当不满足ConditionA时会进入这个分支进行判断 -->
    <div v-else-if='condition <= 0.3'>条件分支B</div>
    <!-- 这里的指令没有值 -->
    <div v-else>default分支</div>



</template>