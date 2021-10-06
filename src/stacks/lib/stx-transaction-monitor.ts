import { connectWebSocketClient, StacksApiWebSocketClient } 
  from '@stacks/blockchain-api-client';

const STACKS_DOCS_API_WS_URL = 'ws://stacks-node-api.blockstack.org/';
const STACKS_CORE_API_WS_URL = 'wss://stacks-node-api.testnet.stacks.co/';

interface Subscription {
  unsubscribe(): Promise<void>;
}

// https://blockstack.github.io/stacks-blockchain-api/client/
export class StxTransactionMonitor {

  private client?: any;

  public async getClient(): Promise<StacksApiWebSocketClient> {
    return new Promise<StacksApiWebSocketClient>((resolve, reject) => {
      if (this.client)
        resolve(this.client);
      else {
        console.debug("Instantiating new WS client");
        connectWebSocketClient(STACKS_CORE_API_WS_URL).then((client) => {
          this.client = client;
          resolve(this.client);
        }).catch((err) => {
          reject(err);
        })
      }
    })
  }

  public subscribeNoError(txId: string) {
    let sub;
    const subCall = async (txId: string) => {
      // WebSocket connection to 'ws://stacks-node-api.blockstack.org/extended/v1/ws' failed
      const client = await connectWebSocketClient(STACKS_CORE_API_WS_URL);
      //      const client = this.getClient();
      sub = await client.subscribeTxUpdates(txId, (update: any) => {
        console.log("update: " + update);
      });
      console.log({ client, sub });
    };
    subCall(txId);
  }

  sub?: Subscription;

  public subscribe(txId: string) {
    if (!this.sub)
      this.getClient().then((client) => {
        console.debug('client: ' + JSON.stringify(client));
        const sub = client.subscribeTxUpdates(txId, (update: any) => {
          console.log("update: " + update);
        });
        sub.then((subscription: Subscription) => {
          console.debug("Obtained new subscription");
          this.sub = subscription;
        }).catch((err: any) => {
          console.error("sub err: " + JSON.stringify(err));
        });
      }).catch((err) => {
        console.error("subscribe getClient err: " + err);
      })
  }
  
  unsubscribe() {
    if (this.sub) {
      console.debug("Unsubscribing");
      this.sub.unsubscribe();
      this.sub = undefined;
    }
  }
}