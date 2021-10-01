<template>
  <stxDemo/>
  <img alt="PUN logo" src="./assets/stacks-logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import stxDemo from '@/stacks/components/stx-demo.vue';
import { StxSessionService } from '@/services/stx-session.service';

const sessionService = new StxSessionService();

export default {
  name: 'App',
  components: {
    HelloWorld,
    stxDemo,
  },
  provide: {
    sessionService: sessionService,
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
