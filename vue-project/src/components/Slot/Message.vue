<script setup>
import Error from './ErrorBox.vue'
</script>

<template>
  <div>
    <!-- 同时使用默认插槽和具名插槽时，需要显示定义具名default插槽 -->
    <Error>
      <!-- 显示default插槽 -->
      <template #default="defaultSlotProps">
        <p>{{ defaultSlotProps.slotName }}错误信息</p>
      </template>

      <!-- 具名插槽 -->
      <template #footer="slotProps">
        <span style="font-size: small"
          >这是{{ slotProps.compName }}的尾部{{ slotProps.slotName }}
          {{ console.log(slotProps) }}</span
        >
      </template>
    </Error>
    --------------------
    <!-- 单独使用默认插槽，可直接在元素上指定v-slot -->
    <Error v-slot="slotProps">
      <p>{{ slotProps.slotName }}错误信息</p>
    </Error>
  </div>
</template>
