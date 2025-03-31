<script setup>
import { computed, reactive, ref, shallowRef } from 'vue';

const counter = reactive({
	info: { count: 1 },
	ele: [{ count: 2 }, { count: 3 }]

})

const computedValue = computed(() => {
	console.log(counter)
	return counter.ele[0].count;
})
const handler = () => {
	counter.ele.unshift({count:10085})
}
</script>

<template>
	<button @click="handler">Add 10</button>
	<p>The button above has been clicked {{ computedValue }} times.</p>
</template>