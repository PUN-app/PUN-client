<template>
  <div>
    <h1>{{ msg }}</h1>
    <p v-if="!userSession.isUserSignedIn()">Please log in.</p>
    <div v-if="userSession.isUserSignedIn()">
      <p v-if="finishedTxData">
        TxId <input v-model="finishedTxData.txId"/>
      </p>
      <p>
        <button @click="deployContract">Deploy</button>
        <button @click="callContractObj">Call</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import {inject, ref, reactive} from "vue";
  import {StxSessionService} from '@/services/stx-session.service';
  import { deployContract, callContract } from '@/stacks/lib/stx-contract-demo';
  import { ContractCall } from '@/stacks/lib/stx-contract';
  import { FinishedTxData } from "@stacks/connect";

  export default {
    name: "stxContractsDemo",
    props: {
      msg: String,
      isLoggedIn: {
        default: false,
      },
    },
    setup() {
      const finishedTxData = ref(null as FinishedTxData | null);
      const stxSession = inject('sessionService', new StxSessionService());
      const userSession = reactive(stxSession.userSession);
      const contractCall = new ContractCall();

      return {
        // data
        userSession,
        finishedTxData,

        // methods
        deployContract,
        callContract,
        callContractObj() {
          contractCall.call().then( () => {
            console.debug("contractCall.call().then: " + 
              JSON.stringify(contractCall.finishedTxData, (_, v) => typeof v === 'bigint' ? v.toString() : v, 1));
            if (contractCall.finishedTxData)
              finishedTxData.value = contractCall.finishedTxData;
          }).catch( (err) => {
            console.error("callContractObj err: " + err);
            console.error("callContractObj err: " + JSON.stringify(err));
          })
        },
      }
    },
  }
</script>