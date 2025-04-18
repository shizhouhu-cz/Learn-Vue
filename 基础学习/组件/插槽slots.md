# 插槽

- 插槽概念及基本使用方法
- 插槽类型：默认插槽/具名插槽/条件插槽/作用域插槽
- 插槽实践：实现高级列表/无渲染组件

## 插槽概念及基本用法

- 插槽出口(slot outlet)：`<slot>`元素是一个插槽出口
- 插槽内容(slot content)：由父组件定义在子组件的内容区域中
- 渲染作用域：插槽内容可访问的作用域，类似于函数作用域，函数在哪里定义决定了其可访问的词法作用域。
- 动态插槽名：可使用`v-slot:[dynamicSlotName]`的形式绑定一个插槽名变量
- 默认内容：子元素在父元素传递的插槽内容为空时，使用的默认内容

注意：子组件不仅可以决定 slot 渲染在**什么位置**，也能决定 slot 渲染**多少次**，可以理解为一个渲染函数，可以让任何可以出现模板的地方渲染任意次。

基本用法演示：

```html
<!-- Parent.vue -->
<script setup>
  import { ref } from "vue";
  import Error from "./ErrorBox.vue";

  const count = ref(0);
</script>

<template>
  <Error>
    <!-- 插槽内容，由子组件决定渲染位置，可访问当前作用域 -->
    <div @click="count++">发生了{{ count }}次错误</div>
  </Error>
  ---------------------
  <!-- 不传递插槽内容时，子元素会使用默认内容 -->
  <Error></Error>
</template>
```

```html
<!-- Child.vue -->
<template>
  <div>
    <div style="color:red">这是一个警示框，发生了一些错误</div>
    <!-- 插槽出口，通过slot元素可以使用父组件传递的插槽内容 -->
    <!-- slot元素的内容表示默认内容，当父元素没有指定插槽内容时会被渲染 -->
    <slot>目前还没有发生错误</slot>
  </div>
</template>
```

## 插槽类型

从形态上分为两种

- 默认插槽：由插槽内容中除了具名插槽之外所有内容组合而成
- 具名插槽：由`template`元素包裹，并通过`v-slot:slotName`指定 slotName 的插槽

增强能力的两种插槽类型

- 条件插槽：子元素在使用插槽时，可以通过`$slot.slotName`判断是否传递了相关插槽，结合`v-if`的条件渲染，可形成该类型插槽。
- 作用域插槽：子元素通过给`slot`元素传递属性，父元素在插槽上通过`v-slot="slotProps"`的方式接收属性列表，形成该类型插槽。

### 默认插槽/具名插槽

所有位于顶层的非`template`元素都会被隐式的作为默认插槽的内容，在编译之后，会整合起来作为名为`default`的插槽对象。
使用 template 指定`v-slot`属性即可实现具名插槽，指令的参数即为插槽名，template 元素的内容即为插槽内容。

默认插槽和具名插槽示例

```html
<!-- Parent.vue -->
<script setup>
  import { ref } from "vue";
  import Error from "./ErrorBox.vue";
</script>

<template>
  <div>
    <!-- 组件的内容就是插槽内容，由子组件决定渲染位置，可访问当前作用域 -->
    <Error>
      <!-- 以下内容即为默认插槽内容，即使中间隔了具名插槽也不影响 -->
      <div @click="count++">发生了一些错误</div>
      <p>↑错误信息</p>

      <!-- 具名插槽，v-slot指令的参数即为插槽名 -->
      <template v-slot:head>
        <span style="font-size: small">这是头部</span>
      </template>

      <!-- 具名插槽，简写形式 -->
      <template #footer>
        <span style="font-size: small">这是尾部</span>
      </template>
    </Error>
  </div>
</template>
```

```html
<!-- Error.vue -->
<template>
  <div>
    <!-- head插槽 -->
    <slot name="head"></slot>

    <div style="color:red">这是一个警示框，发生了一些错误</div>

    <!-- 默认插槽 -->
    <slot>暂时没有错误</slot>

    <!-- footer插槽 -->
    <slot name="footer"></slot>
  </div>
</template>
```

### 条件插槽

插槽结合 v-if 指令可实现条件渲染，注意不能在 slot 元素上使用 v-if，这没有效果。
这种情况下一般需要用到一个模板的内置属性`$slots`，这个对象上包含了所有 slot。

```html
<!-- Child.vue -->
<template>
  <div>
    <!-- 使用$slots.name即可判断是否传递了该插槽 -->
    <div v-if="$slots.head">
      <!-- 不能直接在slot上使用v-if -->
      <slot name="head"></slot>
    </div>

    <!-- 默认插槽则使用default判断 -->
    <div v-if="$slots.default">
      <!-- 不能直接在slot上使用v-if -->
      <slot></slot>
    </div>
  </div>
</template>
```

### 作用域插槽

插槽内容是模板，在编译之后就是一个渲染函数，因此可以结合函数的作用域来理解。函数可以访问定义时所在的词法作用域，这其中包括函数的入参。因此 vue 提供了向插槽内容传递参数的能力。

只使用默认插槽和混用两种插槽的情况下，子组件写法相同，父组件写法则有所不同。

- 子组件中，在 slot 元素上传递属性；
- 父组件中：如果只使用默认插槽，那么在子组件的属性列表中指定`v-slot`即可；
  如果混用，需要显示定义默认插槽，在插槽内容外层的 template 上用`v-slot`指令的属性值接收。

```html
<!-- Parent.vue -->
<script setup>
  import Error from "./ErrorBox.vue";
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
          >这是{{ slotProps.compName }}的尾部{{ slotProps.slotName }} {{
          console.log(slotProps) }}</span
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
```

```html
<!-- Error.vue -->
<script setup>
  import { ref } from "vue";
  const nameInfo = ref("hahah");
</script>

<template>
  <div>
    <div style="color: red">这是一个警示框，发生了一些错误</div>

    <!-- 默认插槽 通过slot元素的属性传递参数 -->
    <slot slot-name="default">暂时没有错误</slot>

    <!-- 具名插槽的name会被自动过滤掉 -->
    <slot name="footer" comp-name="ErrorBox" :slot-name="nameInfo"></slot>
  </div>
</template>
```

## 实践

这里介绍两种：

- 高级列表组件：封装视图和逻辑
- 无渲染组件：子组件只负责逻辑，父组件负责视图。

代码参见官网。
