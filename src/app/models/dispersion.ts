import { Dto } from "./dto";

export class Dispersion{
    id?: string;
    reference?: string;
    date?: Date;
    amount?: number;
    payIds?: string[];
    business?: Dto;
}