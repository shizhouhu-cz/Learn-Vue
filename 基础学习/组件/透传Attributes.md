# 透传 attributes

透传 Attrbutes 指的是那些未被声明为 props 或者 emits 的 attributes 和`v-on`事件监视器。常见的就是`class`、`style`、`id`。

透传 attrs 在**单根节点**的元素上，会自动添加到根元素上，我们称之为**Attributes 继承**。
在**多根节点**元素上，则不会自动添加，如果不手动处理，编译器会发出警告。

## Attributes 继承

Attributes 继承指的是**单根节点**的元素上的透传 Attrs 会自动添加到该根节点上。对于常用的内置属性`class`、`style`以及监听器，模板进行了特殊处理。

- class 和 style 属性都会产生自动合并行为。
- v-on 的监听器同样会额外添加到根元素上，并且根元素如果已有同名监听器，则同样会触发。

```html
<!-- Parent.vue -->
<script setup>
  import { ref } from "vue";
  import ChildAttrs from "./ChildAttrs.vue";

  const count = ref(18);
</script>

<template>
  <!-- 这里传入的所有属性都没有在子组件中被声明为Props或者Emits -->
  <ChildAttrs
    :count="count"
    test="123"
    class="red"
    style="font-weight: bolder"
    @click="console.log('haha')"
  ></ChildAttrs>
  <button @click="count++">count++</button>
</template>

<style>
  .red {
    color: red;
  }
</style>
```

```html
<!-- ChildAttrs.vue -->
<script setup></script>

<template>
  <!-- 渲染的真实DOM为 <div class="big-font red" count="18" test="123" style="text-decoration: underline; font-weight: bolder;">这是一段文字</div>-->
  <!-- 观察可以发现，class和style都合并了，而其他自定义属性都成为了真实DOM的属性，包括没有被声明的响应式状态count -->
  <div>这是一段文字</div>
</template>
```

### 禁用自动继承并进行显示绑定

如果希望手动绑定到指定节点上，可以通过`defineOptions宏`禁用自动继承，通过`$attrs`进行手动绑定。
注意，不禁用的情况下，可以同时实现自动继承以及手动绑定，手动绑定不会影响自动继承。

```html
<script setup>
  // 在setup中调用宏
  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <div class="big-font" style="text-decoration: underline">
    <!-- 外层的根节点不会自动继承透传属性，这里同各国$attrs手动绑定 -->
    <span :class="$attrs.class">这是一段文字</span>
  </div>
</template>
```

### 深层组件继承

如果是单根节点且根节点是组件，并且没有通过显示绑定消费，那么未消费（未声明为 props 或 emits 的属性）的 Attributes 会自动流向其子组件。
注意：

- 透传到孙子组件的属性依然可以被声明为 props
- 如果在父组件被声明为 props 或者 emits，那么这个属性不会透传到孙子组件

```html
<!-- 假设这是一个深层组件，父组件没有使用props或者emits消费属性，那么透传过来的属性依然可以被声明为count并接收 -->
<script setup>
  defineProps(["count"]);
</script>
<template>
  <span>这是一个深层组件{{ count }}</span>
</template>
```

### 多根节点 Attributes

多根节点情况下，不会发生 Attributes 自动添加的行为，因为 vue 不知道要绑定到哪个根节点上。
这种情况下如果不进行显示绑定，vue 会产生一个警告。

## 在 javascript 中访问透传 Attributes

在模板中，通过`$attrs`可以访问到透传 Attributes 列表。
在 script setup 中，则可以通过`useAttrs`函数进行访问。

注意：
在 setup 中，我们也能通过 useAttrs 返回的属性代理部分实现类似 props 的能力，但是不建议这么做，会造成组件逻辑难以理解。
