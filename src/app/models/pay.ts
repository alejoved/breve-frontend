import { Customer } from "./customer";
import { Dto } from "./dto";

export class Pay {
    id?: string;
    reference?: string;
    customer?: Customer;
    plan?: Dto;
    business?: Dto;
    amount?: string;
    currency?: string;
    prefix?: string;
    signature?: string;
    publicKey?: string;
    status?: string;
} 