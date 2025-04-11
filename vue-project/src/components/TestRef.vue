<script setup>


const observerObj = Promise.resolve();
const a = {
    name:'zhangsan'
}
console.log(observerObj.toString());
console.log(Object.prototype.toString.call(a));

</script>

<template>
    <p>{{ observerObj }}</p>
</template>