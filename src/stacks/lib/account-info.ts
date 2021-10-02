import {AccountDataResponse} from "@stacks/blockchain-api-client";

/* { "balance": "0x00000000000000000000000000000000", 
"locked": "0x00000000000000000000000000000000", 
"unlock_height": 0, "nonce": 0, 
"balance_proof": "", "nonce_proof": "" } */

export class AccountInfo {
  balance = "0x00000000000000000000000000000000";
  locked = "0x00000000000000000000000000000000";
  unlock_height = 0;
  nonce = 0;
  balance_proof: string | null = null;
  nonce_proof: string | null = null;
  
  constructor(other: AccountInfo | AccountDataResponse) {
    this.balance = other.balance;
    this.locked = other.locked;
    this.unlock_height = other.unlock_height;
    this.nonce = other.nonce;
    if (other.balance_proof)
      this.balance_proof = other.balance_proof;
    if (other.nonce_proof)
      this.nonce_proof = other.nonce_proof;
  }

  public get balanceAsInt(): number {
    let bal = 0;
    if (this.balance) {
      try {
        const parts = this.balance.split('x');
        console.debug("parts: " + parts.length);
        if (parts.length > 1) {
          console.debug("hex part " + parts[1]);
          bal = parseInt(parts[1], 16);
          console.debug("new bal " + bal);
        }
      } catch (err) {
        console.error("Cannot parse " + this.balance);
      }
    }
    return isNaN(bal) ? 0 : bal;
  }

  public get balanceAsNumber(): number {
    return this.balanceAsInt / 1000000;
  }  
}