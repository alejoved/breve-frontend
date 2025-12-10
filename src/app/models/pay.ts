import { Customer } from "./customer";
import { Dto } from "./dto";

export class Pay {
    id?: string;
    reference?: string;
    customer?: Customer;
    plan?: Dto;
    business?: Dto;
    totalAmount?: number;
    feeAmount?: number;
    amount?: number;
    transactionDate?: Date;
    amountInCents?: string;
    currency?: string;
    prefix?: string;
    signature?: string;
    publicKey?: string;
    status?: string;
    type?: string;
} 