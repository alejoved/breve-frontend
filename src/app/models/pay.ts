import { Customer } from "./customer";
import { Dto } from "./dto";

export class Pay {
    id?: string;
    reference?: string;
    customer?: Customer;
    plan?: Dto;
    business?: Dto;
    amount?: number;
    feeAmount?: number;
    breveAmount?: number;
    totalAmount?: number;
    transactionDate?: Date;
    amountInCents?: string;
    currency?: string;
    prefix?: string;
    signature?: string;
    publicKey?: string;
    status?: string;
    type?: string;
} 