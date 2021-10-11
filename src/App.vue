<template>
  <stxDemo/>
  <img alt="PUN logo" src="./assets/stacks-logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import stxDemo from '@/stacks/components/demo/stx-demo.vue';
import { StxSessionService } from '@/services/stx-session.service';
import { StxApiTransactionsService } from '@/services/stx-api-transactions.service';
import { AppConfig } from '@/data/app-config.data';

// application configuration
//https://stacks-node-api.testnet.stacks.co
const urlConfig = {
  schema: process.env.VUE_APP_STX_API_HOST_SCHEMA
    ? process.env.VUE_APP_STX_API_HOST_SCHEMA
    : "https",
  host: process.env.VUE_APP_STX_API_HOST
    ? process.env.VUE_APP_STX_API_HOST
    : "stacks-node-api.testnet.stacks.co",
  port: process.env.VUE_APP_STX_API_HOST_PORT
    ? process.env.VUE_APP_STX_API_HOST_PORT
    : 80,
};
const appConfig = new AppConfig(
  urlConfig,
);
const sessionService = new StxSessionService();
const stxApiTransactionsService = new StxApiTransactionsService();
stxApiTransactionsService.baseApiHostUrl = appConfig.appUrl;
console.debug("stxApiTransactionsService.baseApiHostUrl: " + stxApiTransactionsService.baseApiHostUrl);

export default {
  name: 'App',
  components: {
    HelloWorld,
    stxDemo,
  },
  provide: {
    sessionService: sessionService,
    transactionService: stxApiTransactionsService,
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

h1 {
  font-size: 44px;
  line-height: 16px;
  color: #888;
  padding-top: 12px
}
</style>
