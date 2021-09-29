<template>
  <stxAccountDemo msg="Account Demo"/>
  <stxAuthDemo msg="Authentication Demo"/>
  <stxGaiaDemo msg="Gaia Demo"/>
  <img alt="PUN logo" src="./assets/stacks-logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import stxAccountDemo from '@/stacks/components/stx-account-demo.vue';
import stxAuthDemo from '@/stacks/components/stx-auth-demo.vue';
import stxGaiaDemo from '@/stacks/components/stx-gaia-demo.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    stxAccountDemo,
    stxAuthDemo,
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
