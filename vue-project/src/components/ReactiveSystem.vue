<script setup>
import { reactive, ref } from 'vue';

// 声明ref响应式状态
const count = ref(0);
// 创建事件处理函数（产生修改状态副作用的函数）
const increaseCount = () => {
    count.value++;
}

// 声明reactive状态
const reactiveCount = reactive({
    count: 0,
})

// ref对象作为reactive对象的属性
const countRef = reactive({ count })
console.log(countRef.count);
const countNoRef = { count }
</script>

<template>
    <div>
        <button @click="count++">ref count inner</button>
        <button @click="increaseCount">ref count handler</button>
        {{ count }}
    </div>

    <div>
        <button @click="reactiveCount.count++">reactive count</button>
        {{ reactiveCount.count }}
    </div>
    <div>
        <button @click="countRef.count++">countRef count</button>
        {{ countRef.count + 1 }}
    </div>
    <div>countNoRef： {{ countNoRef.count + 1 }}</div>
</template>