<template>
  <div>
    <h1>{{ msg }}</h1>
    <p v-if="!userSession.isUserSignedIn()">Please log in.</p>
    <div v-if="userSession.isUserSignedIn()">
      <div v-if="finishedTxData">
        <p>
          TxId <input v-model="finishedTxData.txId"/>
        </p>
        <p v-if="finishedTxData.txId">
          <button @click="monitor">Monitor</button>
        </p>
      </div>
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
  import { deployContract } from '@/stacks/lib/stx-contract-demo';
  import { ContractCall } from '@/stacks/lib/stx-contract';
  import { StxTransactionMonitor } from '@/stacks/lib/stx-transaction-monitor';
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
      const finishedTxData = ref({} as FinishedTxData | null);
      const stxSession = inject('sessionService', new StxSessionService());
      const userSession = reactive(stxSession.userSession);
      const contractCall = new ContractCall();
      const txMonitor = new StxTransactionMonitor();

      return {
        // data
        userSession,
        finishedTxData,

        // methods
        deployContract,
//        callContract,
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
        monitor() {
          console.debug("monitor");
          if (finishedTxData.value && finishedTxData.value.txId && txMonitor != null) {
            txMonitor.unsubscribe();
            txMonitor.subscribe(finishedTxData.value.txId);
          }
        },
      }
    },
  }
</script>