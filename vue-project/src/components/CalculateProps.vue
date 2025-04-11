<script setup>
import { computed, ref } from 'vue';


const books = ref({
    libarayA: {
        name: 'nanjinglib',
        books: [
            'Vue 2 - Advanced Guide',
            'Vue 3 - Basic Guide',
            'Vue 4 - The Mystery'
        ]
    }
})

// 函数
function calculateBooksMessage() {
    console.log('re execute')
    return books.value.libarayA.books.length > 0 ? 'hasBook' : 'noBook'
}

// 计算属性
const hasBooks = computed(() => {
    console.log('re calculate')
    return books.value.libarayA.books.length > 0 ? 'hasBook' : 'noBook'
})

const count = ref(0);
</script>


<template>
    <div>
        func: {{ calculateBooksMessage() }}
    </div>
    <div>
        calcu:{{ hasBooks }}
    </div>
    <div @click="count++">count : {{ count }}</div>
</template>