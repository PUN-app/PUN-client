import { ContractCallRegularOptions, FinishedTxData, openContractCall } from "@stacks/connect";
import { stringUtf8CV } from "@stacks/transactions";

export const onFinishDefault = function(data: any) {
  console.log('Stacks Transaction:', data.stacksTransaction);
  console.log('Transaction ID:', data.txId);
  console.log('Raw transaction:', data.txRaw);
  console.log('contractCall onFinish data: ' +
    JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v, 1));
};

export const contractNameDefault = 'test-contract-00000';
export const contractAddressDefault = 'ST2DJVV0HNR22MEG5W22010FC2KAVH876025EC8M4';
export const functionArgsDefault = [
  stringUtf8CV('hey-utf8'),
];
export const functionNameDefault = 'say';
export const appNameDefault = 'My App';

type ContractCallExtendedOptions = ContractCallRegularOptions & {
  finishedTxData?: FinishedTxData;
}

export class ContractCall {

  private _finishedTxData?: FinishedTxData;
  public get finishedTxData(): FinishedTxData | undefined { 
    return this._finishedTxData ? this._finishedTxData : this.options.finishedTxData; 
  }
  public set finishedTxData(data: FinishedTxData | undefined) {
    console.debug("setting finishedTxData: " + JSON.stringify(data));
    this._finishedTxData = data;
  }
  
  public options: ContractCallExtendedOptions = {
    contractAddress: contractAddressDefault,
    contractName: contractNameDefault,
    functionName: functionNameDefault,
    functionArgs: functionArgsDefault,
    appDetails: {
      name: 'My App',
      icon: window.location.origin + '/my-app-logo.svg',
    },
    onFinish: this.onFinishMethod,
//    onFinish: onFinishDefault,
/*
    onFinish: (data: FinishedTxData) => {
        console.log('Stacks Transaction:', data.stacksTransaction);
        console.log('Transaction ID:', data.txId);
        console.log('Raw transaction:', data.txRaw);
        console.log('contractCall onFinish data: ' + 
          JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v, 1));
      },
*/
  };

  constructor() { }

  onFinishMethod(data: FinishedTxData) {
    console.debug('Stacks Transaction:', data.stacksTransaction);
    console.info('ContractCall Transaction ID:', data.txId);
    console.debug('Raw transaction:', data.txRaw);
    this.finishedTxData = data;
    console.debug('contractCall onFinish this.finishedTxData: ' +
      JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v, 1));
    console.debug('onFinishMethod this: ' + JSON.stringify(this, (_, v) => typeof v === 'bigint' ? v.toString() : v, 1));
  }

  call(): Promise<void> {
    console.debug("callContract...");
    const result = openContractCall(this.options);
    console.debug("callContract result: " + result);
/*
    result.then(() => {
      // This was invoked right after the onFinish
      console.debug("We know the user fired the contract call here, but no useful data passed.");
    }).catch((err) => {
      console.error("callContract err: " + JSON.stringify(err));
    })
*/
    return result;
  }
}