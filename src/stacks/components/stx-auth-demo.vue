<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>
      <button @click="authenticate">Login</button>
    </p>
  </div>
  <div v-if="userData">
    <p>Username: {{ userData.username }}</p>
    <p v-if="userData.profile && userData.profile.stxAddress">STX Address (mainnet): {{ userData.profile.stxAddress.mainnet }}</p>
    <p v-if="userData.profile && userData.profile.stxAddress">STX Address (testnet): {{ userData.profile.stxAddress.testnet }}</p>
  </div>
</template>

<script>
import { ref, inject } from 'vue';
//import { /* AppConfig, UserSession, */ showConnect } from '@stacks/connect';
import { StxSessionService } from '@/services/stx-session.service';

/*

function authenticate(cbFunction, userSession) {
  showConnect({
    appDetails: {
      name: 'PUN',
//      icon: window.location.origin + '/my-app-logo.svg',
      icon: window.location.origin + '/images/logo.png',
    },
    redirectTo: '/',
    onFinish: () => {
      let userData = userSession.loadUserData();
//      console.debug("userData: " + JSON.stringify(userData, null, 1));
      cbFunction(userData);
      // Save or otherwise utilize userData post-authentication
    },
    userSession: userSession,
  });
}
*/

export default {
  name: 'stxAuthDemo',
  props: {
    msg: String
  },
  setup() {
    const userData = ref(null);
    const username = ref(null);
    const stxSession = inject('sessionService', new StxSessionService())

    const authCallback = function(data) {
      console.debug("userData: " + JSON.stringify(data, null, 1));
      userData.value = data;
      username.value = data.username;
    }
    
    const callAuth = function() {
      stxSession.authenticate(authCallback, stxSession.userSession);
    }

    return {
      userData,
      username,
      authenticate: callAuth,
      
      stxSession,
    }
  },
}
</script>
