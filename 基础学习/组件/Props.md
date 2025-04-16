# Props

父组件直接在子组件元素的属性列表中传入，子组件需要通过`defineProps`声明 props 列表。

## defineProps 宏

defineProps 是一个**宏**。
宏意味着这行代码会在编译时被转换成其他代码，运行时不会存在宏的痕迹。由于其在编译时被处理，因此**无需导入**。

**注意：**
- 未声明的属性是无法直接在模板中访问的，因为上下文的代理对象会判断访问的属性是否在声明列表中。
- 宏必须在setup的顶层作用域中。

### 入参

入参主要有三种形式：

- `defineProps(['name','age'])`：数组，最简单的形式，仅声明属性列表。
- `defineProps({name: String, age: Number})`：对象，声明的同时配置类型检查，这里的类型是构造函数，意味着可以是自定义的类。
- `defineProps({name: {type:String,required:false,defualt:'zhangsan'}})`：对象，声明的同时，配置更精细的校验。

```html
<!-- Parent.vue -->
<script setup>
  import { ref } from "vue";
  import Child from "./Child.vue";

  const students = ref([
    { name: "zhangsan", age: 19 },
    { name: "lisi", age: 23 },
  ]);
</script>
<template>
  <div>
    <Child v-bind="stu" v-for="stu in students"></Child>
  </div>
</template>
```

```html
<!-- Child.vue -->
<script setup>
  // 用法一
  // defineProps(['name','age'])

  // 用法二
  // defineProps({
  //   name: String,
  //   age: Number,
  // })

  // 用法三
  defineProps({
    age: {
      // 允许的类型
      type: [Number, null],
      // 是否必传
      required: true,
    },
    name: {
      type: String,
      // 默认值
      default: "王五",
    },
  });
</script>

<template>
  <div>
    <p>Name:{{ name }}</p>
    <p>Age:{{ age }}</p>
  </div>
</template>
```

### 返回值

返回值是一个代理对象，对其属性的访问都会被加入追踪列表。
不过由于 defineProps 是一个宏，在编译时会被替换，所以其返回值也比较特殊。涉及到一个 setup 函数编译后的入参`__props`，表示由父组件传入的参数列表产生的一个代理对象。

返回值的特点：

- 只接收返回值，不解构，则相当于把内部属性`__props`赋值给了接收的变量。
- （只对 3.5+有效）对返回值进行解构，则对解构后变量的访问会被编译成`__props.propName`，这样可以**保留响应性**。
- 在第二点的基础上，在 setup 的调用栈中访问变量，会丢失响应性，需要通过包装成 getter 函数来保持响应性。例如 watch 的 source 指定为解构变量，会导致响应性丢失。
- 可以为解构变量设置默认值，同 js 的原生语法，编译后默认值会被设置到 props 选项上。

```html
<script setup>
  // 下面的代码在编译之后就是const props = __props
  //   const props = defineProps(["name", "age"]);

  /**
   * 下面的代码编译之后就是console.log(__props.name);
   * 因为age没有被访问，所以age标识符随着defineProps的移除而被移除了。
   */
  const { name, age = 18 } = defineProps(["name", "age"]);
  console.log(name);

  // 这里如果watch的第一个参数是name，会编译报错
  watch(
    () => name,
    (newVal, oldVal) => {
      console.log(newVal, oldVal);
    }
  );
</script>

<template>
  <div>
    <p>Name:{{ name }}</p>
    <p>Age:{{ age }}</p>
  </div>
</template>
```

## 父组件传递 Props 时的细节

- 命名：推荐使用短横线连接，例如`greeting-message`（ref 的变量名是`greetingMessage`）。不同于组件名时与原生元素名的区分，在属性名使用驼峰并没有优势。但是可以支持驼峰方式的命名
- 值类型：如果是静态值，即没有使用 v-bind 绑定的，会作为字符串传递；v-bind 绑定的动态值，类型取决于表达式的值类型，可以是任意类型。
- 省略值：如果不指定属性的值，会隐式的把值转为`true`

## Props 的特性-单向数据流

所有的 Props 都遵循单向绑定的原则，在子组件中是**只读**的，在子组件中可以通过**事件**可以让父组件更新属性值。props 在父组件更新后，会把更新的值流向子组件，不会出现逆向传递。这么做的好处是让数据的流向变得清晰，易于分析。

想要修改 Props 值一般有两种场景：

- 需要基于 props 值产生一个局部可修改的属性：可以通过`ref(props.initialCounter)`的形式创建响应式对象。
- 需要基于 props 值进行计算产生派生值：使用`computed`计算属性

特别要注意，对象和集合类型的值，虽然绑定关系无法修改，但是内部属性是可以修改的，vue 没有对这种情况做阻止，官网解释是代价昂贵。
