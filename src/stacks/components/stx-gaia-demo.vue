<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-if="!stxSession.userSession.isUserSignedIn()">Please log in.</p>
    <div v-if="stxSession.userSession.isUserSignedIn()">
      <button @click="onSave()" >Save</button>
      <button @click="onLoad()" >Load</button>
      <p>{{fileData}}</p>
      <p>(coming soon)</p>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import { Storage } from '@stacks/storage';
import { StxSessionService } from '@/services/stx-session.service';

export default {
  name: 'stxGaiaDemo',
  props: {
    msg: String
  },
  setup() {
    const stxSession = inject('sessionService', new StxSessionService());

    let storage;
    if (stxSession.userSession) {
      const userSession = stxSession.userSession;
      storage = new Storage({ userSession });
    }

    let fileName = 'car.json';
    let fileData = {
      color: 'blue',
      electric: true,
      purchaseDate: '2019-04-03',
    };

    const options = {
      encrypt: true,
    };

    return {
      fileData,
      onSave() {
//        let putPromise = storage.putFile(fileName, JSON.stringify(fileData), options).then((fileUrl) => {
        storage.putFile(fileName, JSON.stringify(fileData), options).then((fileUrl) => {
          console.debug("Saved! fileUrl=" + fileUrl);
          // Handle any execution after data has been saved
        });
      },
      onLoad() {
        storage.getFile(fileName, options).then(fileData => {
          // Handle any execution that uses decrypted fileData
          console.debug("loaded " + fileData);
        });
      },
      stxSession,
      // temp
    }
  },
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
