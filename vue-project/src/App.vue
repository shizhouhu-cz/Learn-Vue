<script setup lang="ts">
import Counter from './components/Counter.vue';
import TestRef from './components/TestRef.vue';

</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" class="red-color" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->

  <Counter></Counter>
   <TestRef></TestRef>
  <!-- <ConditionRender></ConditionRender> -->
  <!-- <FormExample></FormExample> -->
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.red-color {
  color: red;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;


  }
}
</style>
