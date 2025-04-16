<script setup>
import { ref } from 'vue';
import BlobPost from './BlobPost.vue'


const blobs = ref([
    { id: 1, title: 'zhangsan', age: 18, greetingMessage: 'hello' },
    { id: 2, title: 'lisi', age: 18 },
    { id: 3, title: 'wangwu', age: 18 },
    { id: 4, title: 'sunliiu', age: 18 },
])

const fontSize = ref(1);

if(fontSize.value > 1.2){
    console.log('哈哈哈')
}
</script>

<template>
    <div :style="{ fontSize: fontSize + 'rem', color: 'red' }">
        <BlobPost v-for="blob in blobs" :key="blob.id" :title="blob.title" :age="blob.age"
            :greeting-message='blob.greetingMessage' @enlarge-text="(n,m) => fontSize += 0.1 * n *m" @reset="fontSize = 1">
        </BlobPost>
    </div>
    <!-- <div :style="{ fontSize: '1rem' }">
        <blob-post v-for="blob in blobs" :key="blob.id" v-bind="blob" @enlarge-text="fontSize += 0.1"
            @reset="fontSize = 1">
        </blob-post>
    </div> -->
</template>