export type TransactionState = {
    "tx_id": string,
    "nonce": number,
    "fee_rate": string,
    "sender_address": string,
    "sponsored": boolean,
    "post_condition_mode": string,
    "post_conditions": [],
    "anchor_mode": string,
    "tx_status": string,
    "receipt_time": number,
    "receipt_time_iso": string,
    "tx_type": string,
    "contract_call"?: any,
    "tx_result"?: any,
}
