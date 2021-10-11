<template>
<div v-if="haveId">
Transaction
  <div v-if="txState && txState.tx_status">
    Status: {{txState.tx_status}}
    <div v-if="txState.tx_result && txState.tx_result.repr">
      {{txState.tx_result.repr}}
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, inject, ref } from "vue";
import { StxApiTransactionsService, TransactionState } from "@/services/stx-api-transactions.service";

export default defineComponent({
  name: "stxTransactionMonitor",
  props: {
    txId: {
      type: String,
    }
  },
  setup(props, ctx) {
    const txState = ref(null as TransactionState | null);
    const haveId = computed( () => {
      return props.txId ? true : false;
    } );
    const transactionService: StxApiTransactionsService | undefined = inject("transactionService");
    watch( props, (value, prev) => {
      console.debug("watch props.txId: " + props.txId);
      txState.value = null;
      if (transactionService && props.txId) {
        console.debug("call TS");
        transactionService.transactionStatus(props.txId).then( (result) => {
// "tx_status": "success",
// "tx_result": {
//  "hex": "0x070e000000086865792d75746638",
//  "repr": "(ok u\"hey-utf8\")"
// },
          console.debug("tx status: " + JSON.stringify(result, null, 1));
          txState.value = result;
        }).catch( (err) => {
          console.error("cannot get tx status for " + props.txId);
        })
      }
    });
    console.debug("stxTransactionMonitor " + props.txId);
    return {
      haveId,
      txState,
    }
  },
})
</script>
