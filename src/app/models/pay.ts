import { Customer } from "./customer";
import { Dto } from "./dto";

export class Pay {
    id?: string;
    reference?: string;
    customer?: Customer;
    plan?: Dto;
    company?: Dto;
    amount?: string;
    currency?: string;
    prefix?: string;
    signature?: string;
    publicKey?: string;
    status?: string;
} 