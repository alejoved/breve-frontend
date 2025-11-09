import { Dto } from "./dto";

export class Plan {
    id?: string;
    name?: string;
    description?: string;
    features?: string[];
    price?: number;
    type?: string;
    popular?: boolean;
    business?: Dto;
    active?: boolean;
}