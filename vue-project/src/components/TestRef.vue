<script setup>


const observerObj = Promise.resolve();
console.log(observerObj.toString());
console.log(Object.prototype.toString(() => console.log()));

</script>

<template>
    <p>{{ observerObj }}</p>
</template>