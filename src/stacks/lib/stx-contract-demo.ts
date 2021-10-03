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

const functionArgs = [
  stringUtf8CV('hey-utf8'),
];

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

export const deployContract = function() {
  openContractDeploy(contractDeployOptions);
}

const options: ContractCallRegularOptions = {
  contractAddress: 'ST2DJVV0HNR22MEG5W22010FC2KAVH876025EC8M4',
  contractName: contractName,
  functionName: 'say',
  functionArgs: functionArgs,
  appDetails: {
    name: 'My App',
    icon: window.location.origin + '/my-app-logo.svg',
  },
  onFinish: (data: any) => {
    console.log('Stacks Transaction:', data.stacksTransaction);
    console.log('Transaction ID:', data.txId);
    console.log('Raw transaction:', data.txRaw);
    console.log('contractCall onFinish data: ' + 
      JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v, 1));
  },
};

export const callContract = function() {
  console.debug("callContract...");
  const result = openContractCall(options);
  console.debug("callContract result: " + result);
}