import { Business } from "./business";
import { Customer } from "./customer";
import { Pay } from "./pay";
import { Plan } from "./plan";

export class Subscription {
    id?: string;
    customer?: Customer;
    plan?: Plan;
    business?: Business;
    pay?: Pay;
    startDate?: Date;
    endDate?: Date;
    status?: string;
    //TEMP
    renewalDate?: Date;
}