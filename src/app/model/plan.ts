import { Dto } from "./dto";

export class Plan {
    id: string;
    name: string;
    benefits: string[];
    price: number;
    type: string;
    popular: boolean;
    company: Dto;

    constructor(){
        this.id = "";
        this.name = "";
        this.benefits = [];
        this.price = 0;
        this.type = "",
        this.popular = false;
        this.company = new Dto();
    }
}