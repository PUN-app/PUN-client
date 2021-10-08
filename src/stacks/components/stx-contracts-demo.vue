<template>
  <div>
    <h1>{{ msg }}</h1>
    <p v-if="!userSession.isUserSignedIn()">Please log in.</p>
    <div v-if="userSession.isUserSignedIn()">
      <div v-if="finishedTxData">
        <p>
          Contract Address <input class="stxAddress" v-model="contractOptions.contractAddress"/>
        </p>
        <p>
          Contract Name <input v-model="contractOptions.contractName"/>
        </p>
        <p>
          TxId <input class="stxAddress" v-model="finishedTxData.txId"/>
        </p>
        <p v-if="finishedTxData.txId">
          <button @click="monitor">Monitor</button>
        </p>
      </div>
      <p>
        <button @click="deploy">Deploy</button>
        <button @click="callContractObj">Call</button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, reactive, watch } from "vue";
  import {StxSessionService} from '@/services/stx-session.service';
  import { deployContract } from '@/stacks/lib/stx-contract-demo';
  import { ContractCall, ContractCallExtendedOptions, ContractDeploy, BaseContract } from '@/stacks/lib/stx-contract';
  import { StxTransactionMonitor } from '@/stacks/lib/stx-transaction-monitor';
  import { FinishedTxData } from "@stacks/connect";

  export default defineComponent({
    name: "stxContractsDemo",
    props: {
      msg: String,
      isLoggedIn: {
        default: false,
      },
      contractAddress: {
        default: 'ST2DJVV0HNR22MEG5W22010FC2KAVH876025EC8M4',
      },
    },
    setup(props, ctx) {
      const finishedTxData = ref({} as FinishedTxData | null);
      const stxSession = inject('sessionService', new StxSessionService());
      const userSession = reactive(stxSession.userSession);
//      const address = ref(props.contractAddress);
      const contractOptions = reactive({
        contractAddress: props.contractAddress,
        contractName: 'test-contract-00000',
      });
      const txMonitor = new StxTransactionMonitor();

      watch( props, (value, prev) => {
        console.debug("watch props.contractAddress: " + props.contractAddress);
//        address.value = props.contractAddress;
        contractOptions.contractAddress = props.contractAddress;
      });
      
      const invokeContract = function(invoker: BaseContract) {
          invoker.invoke().then( () => {
            console.debug("invoke().then: " + 
              JSON.stringify(invoker.finishedTxData, (_, v) => typeof v === 'bigint' ? v.toString() : v, 1));
            if (invoker.finishedTxData)
              finishedTxData.value = invoker.finishedTxData;
          }).catch( (err) => {
            console.error("invoke err 0: " + err);
//            console.error("callContractObj err 1: " + JSON.stringify(err));
          });
      }

      return {
        // data
        userSession,
        finishedTxData,
//        address,
        contractOptions,

        // methods
        deploy() {
          const invoker = new ContractDeploy(contractOptions);
          invokeContract(invoker);
//          invoker.invoke();
//          deployContract();
        },
//        deployContract,
        callContractObj() {
          const invoker = new ContractCall(contractOptions);
          invokeContract(invoker);
/*
          invoker.invoke().then( () => {
            console.debug("invoke().then: " + 
              JSON.stringify(invoker.finishedTxData, (_, v) => typeof v === 'bigint' ? v.toString() : v, 1));
            if (invoker.finishedTxData)
              finishedTxData.value = invoker.finishedTxData;
          }).catch( (err) => {
            console.error("invoke err 0: " + err);
//            console.error("callContractObj err 1: " + JSON.stringify(err));
          })
*/
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
  });
</script>

<style scoped>
</style>
