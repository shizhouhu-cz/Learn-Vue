# 类和样式绑定

不同于其他的属性，`class`和 `style`属性的值可能会比较复杂，例如`class='foo bar baz'`这样的场景，如果我们动态的拼接字符串，比较容易出错。
因此模板引擎对这两个属性做了增强，除了字符串外，表达式的值还可以是对象或数组。

## 绑定 Class

- 绑定对象时，对象会被解构，根据对象属性值的真假来切换 class。(推荐使用计算属性来绑定多个 clas)
- 绑定数组时，数组同样会被解构，并且数组元素可以是对象，可以应用上面的规则

### 绑定对象

在需要动态绑定多个 class 的时候，推荐使用计算属性。

```html
<!-- 演示对象的情况，伪代码，只是举例 -->
<script>
  const isActive = ref(true);
  const hasError = ref(false);
  const classObject = reactive({
    active: true,
    "has-error": false,
  });
</script>
<!-- class在对象的属性为false时会移除该class，所以初始情况下class的值为'active' -->
<div :class="{active: isActive, 'has-error': hasError}"></div>
<!-- 这里的效果和上面一样，对象会被解构出来 -->
<div :class="classObject"></div>
```

### 绑定数组

```html
<!-- 演示数组的情况，伪代码 -->
<script>
  const activeClass = ref("active");
  const errorClass = ref("has-error");
</script>
<!-- 可以使用三元表达式实现切换 -->
<div :class="[isActive ? activeClass : '', errorClass]"></div>
<!-- 可以嵌套对象 -->
<div :class="[{[activeClass] : isActive} , errorClass]"></div>
```

### 在组件上使用

- 对于只有一个根元素的组件，当实用了`class`属性时，这些`class`会添加到根元素上并于已有的 class 进行合并。
- 对于有多个根元素的组件，可以用过组件的`$attrs.class`属性来指定接收的元素。

有一点要注意的是，通过`$attrs.class`显式绑定的时候，class 对应的样式需要在子组件上，而只有一个根元素的默认绑定模式下，样式定义需要在父组件上。

**一个根元素的场景**

```html
<!-- ChildComponent.vue -->
<template>
  <div class="foo">你好</div>
</template>

<!-- ParentComponent.vue -->
<ChildComponent class="bar" />

<!-- 渲染结果 -->
<div class="foo bar">你好</div>
```

**多个根元素的场景**

```html
<!-- ChildComponent.vue -->
<template>
  <div class="foo">你好</div>
  <div :class="$attrs.class">朋友</div>
</template>

<!-- ParentComponent.vue -->
<ChildComponent class="bar"></ChildComponent>

<!-- 渲染结果 -->
<div class="foo">你好</div>
<div class="bar">朋友</div>
```

## 绑定 Style 内联样式

- 绑定一个对象，因为在 DOM 中本身 style 属性本身就是一个对象，所以绑定的对象可以直接作为属性值。
- 绑定一个数组，可以合并多个样式对象。

### 绑定对象

如果样式复杂，同样推荐使用计算属性

```html
<script>
  const activeColor = ref("ref");
  const fontSize = ref("12");
</script>

<!-- 推荐使用小驼峰的样式属性名 -->
<div :style='{color : activeColor, fontSize : fontSize + "px"}'></div>
<!-- 同样支持短横线连接的属性名 -->
<div :style='{color : activeColor, font-size : fontSize + "px"}'></div>
```

### 绑定数组

数组中的对象会被合并成一个对象，作为 style 的属性值。

```html
<div :style="[baseStyleObject, extraStyleObject]"></div>
```

### 自动前缀

如果实用了需要特殊前缀的 css 属性，vue 会自动添加前缀

### 样式多值

可以对一个属性提供多个值，浏览器会从最后一个值开始尝试，直至找到支持的值。多用于兼容不同类型的浏览器。

```html
<div :style='{display:["-webkit-box", "flex"]}'></div>
```
