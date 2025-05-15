# Pinia

- Pinia 是什么，有什么优势
- Pinia 的核心概念
- Pinia 如何使用
- Pinia 的插件系统

## Pinia 是什么

Pinia 是一个**拥有组合式 API**的状态管理库。主要是为了解决 vue 框架跨组件、跨页面场景下的状态共享问题。

Pinia 的优势：

- 方便调试，devtools 对其提供了支持，使得查看状态即追踪更新变得便利。
- 便于扩展，Pinia 支持插件对其进行配置，可以方便的对整个状态库进行配置或追踪。
- 热更新，不必重载页面就能修改 store。

## Pinia 的核心概念

- Store：一个保存业务状态和逻辑的实体，不与组件绑定，即其承载的是全局状态。它由 state,getter,action 构成
- state：存储业务状态的载体，同时也负责状态的初始化。
- getter：存储派生状态的载体，是 state 的计算值、派生值。
- action：存储业务逻辑的载体，用于封装对 state 的操作，并且支持异步，意味着可以进行网络请求等操作。
- 插件：可以对 Pinia 进行配置，实现能力的增强。

## Pinia 如何使用

Pinia 的创建和工作流程大致如下

- 创建实例：创建 Pinia 实例 piniaInstance
- 注册：piniaInstance 作为插件注册到 vue 的 app 实例上
- 定义 Store：通过 defineStore 定义 state、getter、action
- 访问 Store：在 setup()中可以访问 Store 中的所有属性，访问即订阅。
- Store 更新：通过 Store 暴露的响应式数据和方法可以修改 state。
- 触发订阅者更新：所有订阅了 Store 的订阅者借助响应式系统进行更新。
