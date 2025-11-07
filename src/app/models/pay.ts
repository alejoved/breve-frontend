import { Customer } from "./customer";
import { Dto } from "./dto";

export class Pay {
    id?: string;
    customer?: Customer;
    plan?: Dto;
    company?: Dto;
    amount?: number;
    currency?: string;
    prefix?: string;
    signature?: string;
    publicKey?: string;
    status?: string;
} 