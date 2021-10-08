<template>
  <stxAccountDemo msg="Account Demo"/>
  <stxAuthDemo msg="Authentication Demo" @loggedIn="loggedInEvent" @loggedOut="loggedOutEvent"/>
  <stxGaiaDemo msg="Gaia Demo" :isLoggedIn="isLoggedIn"/>
  <stxCipherDemo msg="Cipher Demo" :isLoggedIn="isLoggedIn"/>
  <stxContractsDemo msg="Contracts Demo" :isLoggedIn="isLoggedIn" :contractAddress="testnetAddress"/>
</template>

<script lang="ts">
import { inject, ref } from 'vue';
import { StxSessionService } from '@/services/stx-session.service';
import stxAccountDemo from '@/stacks/components/stx-account-demo.vue';
import stxAuthDemo from '@/stacks/components/stx-auth-demo.vue';
import stxGaiaDemo from '@/stacks/components/stx-gaia-demo.vue';
import stxCipherDemo from '@/stacks/components/stx-cipher-demo.vue';
import stxContractsDemo from '@/stacks/components/stx-contracts-demo.vue';

export default {
  name: "stxDemo",
  components: {
    stxAccountDemo,
    stxAuthDemo,
    stxGaiaDemo,
    stxCipherDemo,
    stxContractsDemo,
  },
  setup() {
    const stxSession = inject('sessionService', new StxSessionService());
    const isLoggedIn = ref(stxSession.isLoggedIn());
    const testnetAddress = ref('ST2DJVV0HNR22MEG5W22010FC2KAVH876025EC8M4');

    return {
      // data
      testnetAddress,
      isLoggedIn,

      // methods
      loggedInEvent(profile: any) {
        console.debug("loggedInEvent")
        isLoggedIn.value = stxSession.isLoggedIn();
        if (profile && profile.stxAddress)
          testnetAddress.value = profile.stxAddress.testnet;
        console.debug("loggedInEvent " + testnetAddress.value)
        //        ctx.emit('logged', data.profile.stxAddress.testnet)
      },
      loggedOutEvent() {
        console.debug("loggedOutEvent")
        isLoggedIn.value = stxSession.isLoggedIn();
      },
    }
  },
}
</script>

<style>
.stxAddress {
  width: 594px;
}
</style>

