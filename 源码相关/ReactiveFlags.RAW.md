在Vue3的响应式系统中，`ReactiveFlags.RAW` 是一个关键属性，用于访问响应式对象的原始数据（即未被Proxy包装的对象）。其核心作用与赋值时机如下：

---

### 一、核心作用
1. **获取原始对象**  
   `RAW` 属性允许开发者绕过Proxy代理，直接访问响应式对象的原始数据。这在需要对比对象或执行非响应式操作时非常有用，例如：
   ```javascript
   const obj = { a: 1 };
   const proxyObj = reactive(obj);
   console.log(proxyObj[ReactiveFlags.RAW] === obj); // 输出 true
   ```

2. **避免重复代理**  
   Vue3通过检查目标对象是否已存在`RAW`属性，防止对同一个对象重复创建Proxy代理。若对象已被代理，则直接从缓存（如`reactiveMap`）中返回现有代理。

3. **处理只读与响应式状态冲突**  
   当对已代理的响应式对象调用`readonly()`时，通过`RAW`属性判断原始对象的响应式状态，确保逻辑正确性。

---

### 二、赋值时机
`RAW`属性的赋值发生在Proxy代理对象创建过程中，具体逻辑如下：

1. **代理对象创建阶段**  
   在`createReactiveObject`函数中生成Proxy时，Vue会通过Proxy的拦截器（如`get`陷阱）动态处理对`RAW`属性的访问请求。当访问`ReactiveFlags.RAW`时，直接返回原始对象（即`target`）。

2. **缓存命中时的快速返回**  
   如果目标对象已被代理（即存在于`reactiveMap`等WeakMap中），则不会重新生成Proxy，此时`RAW`属性已存在于现有代理对象中，用于快速返回原始对象。

3. **特殊类型处理**  
   对于集合类型（如Set/Map），Vue会通过`collectionHandlers`拦截器处理`RAW`属性的访问，确保返回原始集合对象。

---

### 三、源码实现示例
以`createReactiveObject`函数为例，其逻辑包括：
```javascript
function createReactiveObject(target, proxyMap, baseHandlers) {
  // 若对象已被代理，直接返回现有代理
  const existingProxy = proxyMap.get(target);
  if (existingProxy) return existingProxy;

  // 创建新代理并缓存
  const proxy = new Proxy(target, baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
```
在拦截器中，`get`陷阱会处理对`ReactiveFlags.RAW`的访问：
```javascript
// baseHandlers.ts 中的拦截逻辑
function createGetter() {
  return function get(target, key, receiver) {
    if (key === ReactiveFlags.RAW) {
      return target; // 返回原始对象
    }
    // ...其他逻辑
  };
}
```

---

### 四、应用场景
- **深层次对象比较**：直接操作原始对象进行对比，避免Proxy干扰。
- **性能优化**：在无需响应式的场景（如一次性计算）中使用原始数据。
- **调试**：快速查看原始数据状态，而非代理后的对象。

通过`ReactiveFlags.RAW`，Vue3在保持响应式能力的同时，提供了灵活操作原始数据的途径，这一设计在源码中通过Proxy拦截器和WeakMap缓存机制高效实现。