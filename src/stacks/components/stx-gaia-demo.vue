<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-if="!stxSession.userSession.isUserSignedIn()">Please log in.</p>
    <div v-if="stxSession.userSession.isUserSignedIn()">
      <button @click="onSave()" >Save</button>
      <button @click="onLoad()" >Load</button>
      <p>{{form.fileData}}</p>
      <p>Color: <input type="text" v-model="form.fileData.color"/></p>
      <p>(coming soon)</p>
    </div>
  </div>
</template>

<script>
import { inject, reactive } from 'vue';
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
    let form = reactive({
      fileData: fileData,
    })

    const options = {
      encrypt: true,
    };

    return {
//      fileData,
      form,
      onSave() {
//        let putPromise = storage.putFile(fileName, JSON.stringify(fileData), options).then((fileUrl) => {
        console.debug("Saving " + JSON.stringify(form.fileData));
        storage.putFile(fileName, JSON.stringify(form.fileData), options).then((fileUrl) => {
          console.debug("Saved! fileUrl=" + fileUrl);
          // Handle any execution after data has been saved
        });
      },
      onLoad() {
        storage.getFile(fileName, options).then(data => {
          form.fileData = JSON.parse(data);
//          console.debug("loaded data.color " + data["color"]);
          // Handle any execution that uses decrypted fileData
          console.debug("loaded " + data);
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
