import { ApiClient } from './api-client';

export {
  TransactionState,
} from '../types/transactions';

export class StxApiTransactionsService extends ApiClient {
  constructor() {
    super();
  }

  // @overrides used to setup axios 
  protected get baseUrl() {
    return this.baseApiHostUrl + "/extended/v1/tx";
  }
  
  // {{baseUrl}}/extended/v1/tx/:tx_id?event_offset=0&event_limit=96&unanchored=false
  transactionStatus(txId: string): Promise<any> {
    const promise: Promise<any> = new Promise( (resolve, reject) => {
      const url = this.baseUrl + "/" + txId;
          this.axios
            .get(url, {
              params: { },
              headers: { },
            })
            .then((response) => {
              console.log("transactionStatus response resolving")
//              this.printResponse("requestDomain", response);
              resolve(response.data);
            })
            .catch((err) => {
              console.log("requestDomain err rejecting: " + JSON.stringify(err))
              reject(this.toServiceError(err));
            });

//      resolve(true);
    } );
    return promise;
  }
}