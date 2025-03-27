<script setup>
import { ref } from 'vue'

const counter = ref(0)
const handler = (...args)=>{
	console.log(args);
}
</script>

<template>
	<button @click="handler">Add 10</button>
	<p>The button above has been clicked {{ counter }} times.</p>
</template>