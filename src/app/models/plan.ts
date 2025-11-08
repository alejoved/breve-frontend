import { Dto } from "./dto";

export class Plan {
    id?: string;
    name?: string;
    description?: string;
    features?: string[];
    price?: number;
    type?: string;
    popular?: boolean;
    company?: Dto;
    active?: string;
}