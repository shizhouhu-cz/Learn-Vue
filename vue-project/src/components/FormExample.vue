<script setup>
import { ref } from 'vue';
const textValue = ref('123');
console.log(textValue._value);

const textAreaValue = ref();
const checkboxArr = ref([]);
const radioValue = ref();
const selectedValue = ref();
</script>

<template>

    <div>
        <!-- 文本输入框 input-->
        <p>文本输入信息：{{ textValue }}</p>
        <input v-model="textValue" placeholder="请输入">
    </div>

    <div>
        <!-- 多行文本textarea -->
        <p>多行输入文本值：{{ textAreaValue }}</p>
        <textarea v-model="textAreaValue"></textarea>
    </div>

    <div>
        <!-- 复选框 checkbox -->
        <p>复选框的值：{{ checkboxArr }}</p>
        <input type="checkbox" id="foo" value="Foo" v-model="checkboxArr">
        <label for="foo">Foo</label>

        <input type="checkbox" id="bar" value="Bar" v-model="checkboxArr">
        <label for="bar">Bar</label>

        <input type="checkbox" id="baz" value="Baz" v-model="checkboxArr">
        <label for="baz">Baz</label>
    </div>

    <div>

        <!-- 单选按钮 radio -->
        <p>单选按钮的值：{{ radioValue }}</p>
        <input type="radio" id="femal" value="男" v-model="radioValue">
        <label for="femal">男</label>

        <input type="radio" id="mal" value="女" v-model="radioValue">
        <label for="mal">女</label>

        <input type="radio" id="unknow" value="未知" v-model="radioValue">
        <label for="unknow">未知</label>

    </div>
    <!-- 选择器 select -->
    <div>
        <p>选择器的值：{{ selectedValue }}</p>
        <select v-model="selectedValue">
            <option disabled value="">请选择一个选项</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
    </div>

</template>