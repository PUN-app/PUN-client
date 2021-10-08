import { ContractCallRegularOptions, ContractDeployRegularOptions, 
  openContractDeploy, FinishedTxData, openContractCall, RegularOptionsBase, TxBase } from "@stacks/connect";
import { ClarityValue, stringUtf8CV } from "@stacks/transactions";

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

const codeBodyHW2 = `
(define-data-var hello (string-utf8 100) u"say hello 2")

;; private functions
;;
(define-read-only (say-hello)
    (ok (var-get hello))
)
(define-public (say (something (string-utf8 255)))
    (ok something)
)
`;

export interface ContractBaseOptions {
    contractName?: string;
}

export interface ContractCallBaseOptions extends TxBase, RegularOptionsBase, ContractBaseOptions {
    contractAddress?: string;
    functionName?: string;
    functionArgs?: (string | ClarityValue)[];
}

export type ContractCallExtendedOptions = ContractCallRegularOptions & {
  finishedTxData?: FinishedTxData;
}

export type ContractDeployExtendedOptions = ContractDeployRegularOptions & {
  finishedTxData?: FinishedTxData;
}

export abstract class BaseContract {
  private _finishedTxData?: FinishedTxData;
  public get finishedTxData(): FinishedTxData | undefined { 
    return this._finishedTxData ? this._finishedTxData : this.options.finishedTxData; 
  }
  public set finishedTxData(data: FinishedTxData | undefined) {
    console.debug("setting finishedTxData: " + JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v, 1));
    this._finishedTxData = data;
  }

  public abstract options: ContractDeployExtendedOptions | ContractCallExtendedOptions;

  public abstract invoke(): Promise<void>;

  onFinishMethod(data: FinishedTxData) {
    console.debug('Stacks Transaction:', data.stacksTransaction);
    console.info('ContractCall Transaction ID:', data.txId);
    console.debug('Raw transaction:', data.txRaw);
    this.finishedTxData = data;
    console.debug('contractCall onFinish this.finishedTxData: ' +
      JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v, 1));
    console.debug('onFinishMethod this: ' + JSON.stringify(this, (_, v) => typeof v === 'bigint' ? v.toString() : v, 1));
  }

}

export class ContractDeploy extends BaseContract {
  
  public options: ContractDeployRegularOptions = {
    contractName: contractNameDefault,
    codeBody: codeBodyHW2,
    appDetails: {
      name: 'My App',
      icon: window.location.origin + '/my-app-logo.svg',
    },
    onFinish: this.onFinishMethod,
  };
  
  constructor(options: ContractBaseOptions) {
    super();
    if (options) {
      if (options.contractName)
        this.options.contractName = options.contractName;
    }
  }

  invoke(): Promise<void> {
    console.debug("ContractDeploy.invoke...");
    const result = openContractDeploy(this.options);
    console.debug("ContractDeploy.invoke result: " + result);
    return result;
  }
}

export class ContractCall extends BaseContract {

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

  constructor(options?: ContractCallExtendedOptions | ContractCallBaseOptions) { 
    super();
    if (options) {
      if (options.contractAddress)
        this.options.contractAddress = options.contractAddress;
      if (options.contractName)
        this.options.contractName = options.contractName;
      if (options.functionName)
        this.options.functionName = options.functionName;
      if (options.functionArgs)
        this.options.functionArgs = options.functionArgs;
      if (options.appDetails)
        this.options.appDetails = options.appDetails;
      if (options.onFinish)
        this.options.onFinish = options.onFinish;
    }
  }

  invoke(): Promise<void> {
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