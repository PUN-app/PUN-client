<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Stacks Address: {{ stacksAddress }}</p>
    <p>Accounts: {{ accounts }}</p>
    <p>Account Info: {{ accountInfo }}</p>
    <p>Account Info no proof: {{ accountInfoNoProof }}</p>
    <p>Faucet Tx: {{ faucetTx }}</p>
  </div>
  <button @click="refreshBalance()" >Refresh Balance</button>
</template>

<script>
import { ref } from "vue";
import { fetch } from "cross-fetch";
import { makeRandomPrivKey, privateKeyToString, getAddressFromPrivateKey, TransactionVersion} from "@stacks/transactions";
import {AccountsApi, FaucetsApi, Configuration} from "@stacks/blockchain-api-client";
//import {AccountsApi, Configuration} from "@stacks/blockchain-api-client";

const apiConfig = new Configuration({
  fetchApi: fetch,
  // for mainnet, replace `testnet` with `mainnet`
  basePath: 'https://stacks-node-api.testnet.stacks.co',
});

const privateKey = makeRandomPrivKey();

const stacksAddress = getAddressFromPrivateKey(
  privateKeyToString(privateKey),
  TransactionVersion.Testnet // remove for Mainnet addresses
);

const accounts = new AccountsApi(apiConfig);
async function getAccountInfo() {
  const accountInfo = await accounts.getAccountInfo({
    principal: stacksAddress,
  });

  return accountInfo;
}

async function getAccountInfoWithoutProof() {
  const accountInfo = await accounts.getAccountInfo({
    principal: stacksAddress,
    proof: 0,
  });

  return accountInfo;
}

async function runFaucetStx() {
  const faucets = new FaucetsApi(apiConfig);

  const faucetTx = await faucets.runFaucetStx({
    address: stacksAddress,
  });

  return faucetTx;
}
/*
*/

export default {
  name: 'stxAccountDemo',
  props: {
    msg: String
  },
  setup() {
    // https://stacks-node-api.testnet.stacks.co/v2/accounts/STVFY496XWC84SRCMZFXX8NXN5WVJGSD35PBWYH6
    const accountInfo = ref(null);
    const accountInfoNoProof = ref(null);
//    const faucetTx = runFaucetStx();
    const faucetTx = ref(null);
    
    getAccountInfo().then( (result) => {
      console.debug('getAccountInfo ' + JSON.stringify(result));
      accountInfo.value = result;
    }).catch ( (err) => {
      console.error("error " + err);
    })

    const refreshBalance = function() {
      getAccountInfoWithoutProof().then( (result) => {
        console.debug('getAccountInfoWithoutProof ' + JSON.stringify(result));
        accountInfoNoProof.value = result;
      }).catch ( (err) => {
        console.error("error " + err);
      })
    }
    
    refreshBalance();

    runFaucetStx().then( (result) => {
      console.debug('runFaucetStx ' + JSON.stringify(result));
      faucetTx.value = result;
      refreshBalance();
    }).catch ( (err) => {
      console.error("error " + err);
    })

    return {
      accountInfo,
      accountInfoNoProof,
      faucetTx,
      
      refreshBalance,
      getAccountInfoWithoutProof,
      runFaucetStx,
      stacksAddress,
      accounts,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
