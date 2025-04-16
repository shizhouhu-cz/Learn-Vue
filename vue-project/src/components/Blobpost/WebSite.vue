<script setup>
import { provide, ref } from 'vue'
import Blob from './Blob.vue'

const siteName = ref('')
provide('siteName', siteName)
</script>

<template>
  <div>
    <input v-model="siteName" />
    <Blob>
      <span :style="{ color: 'green' }">{{ siteName }}</span>
    </Blob>
  </div>
</template>
