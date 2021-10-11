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
}