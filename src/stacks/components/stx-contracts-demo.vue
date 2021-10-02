<template>
  <div>
    <h1>{{ msg }}</h1>
    <p v-if="!userSession.isUserSignedIn()">Please log in.</p>
    <div v-if="userSession.isUserSignedIn()">
      <p>
      <button @click="deploy">Deploy</button>
      (coming soon)
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import {inject, ref, reactive} from "vue";
  import {StxSessionService} from '@/services/stx-session.service';
  import { openContractDeploy } from '@stacks/connect';

  const codeBody = '(begin (print "hello, world"))';
  
  const deploy = function() {
    openContractDeploy({
      contractName: 'my-contract-name',
      codeBody,
      appDetails: {
        name: 'My App',
        icon: window.location.origin + '/my-app-logo.svg',
      },
      onFinish: data => {
        console.log('Stacks Transaction:', data.stacksTransaction);
        console.log('Transaction ID:', data.txId);
        console.log('Raw transaction:', data.txRaw);
      },
    });
  }

  export default {
    name: "stxContractsDemo",
    props: {
      msg: String,
      isLoggedIn: {
        default: false,
      },
    },
    setup() {
      const stxSession = inject('sessionService', new StxSessionService());
      const userSession = reactive(stxSession.userSession);

      return {
        userSession,
        deploy,
      }
    },
  }
</script>