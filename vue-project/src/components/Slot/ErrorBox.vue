<script setup>
import { ref } from 'vue'

const nameInfo = ref('hahah')
</script>

<template>
  <div>
    <div style="color: red">这是一个警示框，发生了一些错误</div>

    <!-- 默认插槽 -->
    <slot slot-name="default">暂时没有错误</slot>

    <!-- footer插槽 -->
    <slot name="footer" comp-name="ErrorBox" :slot-name="nameInfo"></slot>
  </div>
</template>
