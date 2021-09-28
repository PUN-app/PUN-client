<template>
  <stxGaiaDemo msg="Gaia Demo"/>
  <img alt="Vue logo" src="./assets/stacks-logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import stxGaiaDemo from '@/stacks/components/stx-gaia-demo.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    stxGaiaDemo
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
