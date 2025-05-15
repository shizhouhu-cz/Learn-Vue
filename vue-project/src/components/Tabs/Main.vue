<script setup>
import { ref } from 'vue'
import Home from './Home.vue'
import Help from './Help.vue'
import About from './About.vue'

// 定义tabs列表
const tabs = { Home, Help, About }

// 定义tab状态
const currentTab = ref('Home')
</script>

<template>
  <!-- 导航列表 -->
  <div style="display: flex" @click="currentTab = $event.target.getAttribute('data-name')">
    <button v-for="(value, key) in tabs" :data-name="key">{{ key }}</button>
  </div>
  <!-- 动态组件 -->
  <component :is="tabs[currentTab]"></component>
</template>
