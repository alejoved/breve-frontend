import { Dto } from "./dto";

export class Plan {
    id?: string;
    name?: string;
    features?: string[];
    price?: number;
    type?: string;
    popular?: boolean;
    company?: Dto;
}