<script setup>
import { ref, useTemplateRef } from 'vue';
const inputRef = ref(null);
const input2 = useTemplateRef('inputRef2')
</script>

<template>
    <input type="text" ref="inputRef">
    <input type="text" ref="inputRef2">
    <button @click="inputRef.focus()">聚焦input1</button>
    <button @click="input2.focus()">聚焦input2</button>
</template>