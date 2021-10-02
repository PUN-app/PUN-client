<template>
  <div>
    <h1>{{ msg }}</h1>
    <p v-if="!userSession.isUserSignedIn()">Please log in.</p>
    <div v-if="userSession.isUserSignedIn()">
      <p>
        Input
        <input type="text" v-model="input" />
      </p>
      <p>
        <button @click="encrypt">Encrypt</button>
      </p>
      <p v-if="cipherText">
        Cipher Text:
      {{cipherText}}
      </p>
      <p v-if="cipherText">
        <button @click="decrypt">Decrypt</button>
      </p>
      <p v-if="decrypted">
        Decrypted: {{decrypted}}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import {inject, ref, reactive} from "vue";
  import {StxSessionService} from '@/services/stx-session.service';

  export default {
    name: "stxCipherDemo",
    props: {
      msg: String,
      isLoggedIn: {
        default: false,
      },
    },
    setup() {
      const stxSession = inject('sessionService', new StxSessionService());
      const userSession = reactive(stxSession.userSession);
      const input = ref("ham");
      const encrypted = ref(null);
      const cipherText = ref(null);
      const decrypted = ref(null as string | null | Buffer);

      return {
        userSession,
        input,
        encrypted,
        cipherText,
        decrypted,
        encrypt() {
          stxSession.encryptContent(input.value).then((result) => {
            console.debug("encrypt result: " + result);
            cipherText.value = result;
            result = JSON.parse(result);
            //          console.debug("result.cipherText: " + result.cipherText);
//            if (result)
//              cipherText.value = result.cipherText;
          }).catch((err) => {
            console.error("encrypt error: " + JSON.stringify(err));
          })
        },
        decrypt() {
          if (cipherText.value)
            stxSession.decryptContent(cipherText.value).then((result) => {
              console.debug("decryptContent result: " + result);
              //            result = JSON.parse(result);
              //          console.debug("result.cipherText: " + result.cipherText);
              if (result)
                decrypted.value = result;
            }).catch((err) => {
              console.error("encrypt error: " + JSON.stringify(err));
            })
        },
      }
    },
  }
</script>