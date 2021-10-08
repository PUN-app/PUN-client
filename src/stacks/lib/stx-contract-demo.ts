import { 
  openContractDeploy, openContractCall, ContractCallRegularOptions, ContractDeployRegularOptions 
} from '@stacks/connect';
import {
  uintCV,
  intCV,
  bufferCV,
  stringAsciiCV,
  stringUtf8CV,
  standardPrincipalCV,
  trueCV,
} from '@stacks/transactions';
import { ContractBaseOptions, onFinishDefault } from "./stx-contract";

const codeBodyPrint = '(begin (print "hello, world"))';
const codeBodyInOut = '(say (input (string-utf8 100)))';
const contractName = 'test-contract-00000';

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

const contractDeployOptions: ContractDeployRegularOptions = 
{
    contractName: contractName,
    codeBody: codeBodyHW2,
    appDetails: {
      name: 'My App',
      icon: window.location.origin + '/my-app-logo.svg',
    },
    onFinish: data => {
      console.log('Stacks Transaction:', data.stacksTransaction);
      console.log('Transaction ID:', data.txId);
      console.log('Raw transaction:', data.txRaw);
    },
  }

export const deployContract = function(options?: ContractBaseOptions) {
  if (options) {
    if (options.contractName) contractDeployOptions.contractName = options.contractName;
  }
  openContractDeploy(contractDeployOptions);
}
