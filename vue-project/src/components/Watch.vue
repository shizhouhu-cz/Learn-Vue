<script setup>
import { onWatcherCleanup, ref, watch, watchPostEffect } from 'vue';

const count = ref(0);

watch(count, (newVal, oldVal, onCleanup) => {
    console.log(document.querySelector('#cl').innerHTML);
    onCleanup(() => console.log('cleaning'))
    onWatcherCleanup(() => console.log('clearing2'))
})

</script>

<template>
    <div id="cl" @click="count++">现在的count是：{{ count }}</div>
</template>