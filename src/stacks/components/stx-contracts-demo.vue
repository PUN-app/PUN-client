<template>
  <div>
    <h1>{{ msg }}</h1>
    <p v-if="!userSession.isUserSignedIn()">Please log in.</p>
    <div v-if="userSession.isUserSignedIn()">
      <p>
        <button @click="deployContract">Deploy</button>
        <button @click="callContract">Call</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import {inject, ref, reactive} from "vue";
  import {StxSessionService} from '@/services/stx-session.service';
  import { deployContract, callContract } from '@/stacks/lib/stx-contract-demo';

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
        deployContract,
        callContract,
      }
    },
  }
</script>