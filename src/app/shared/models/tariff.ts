import { TariffRate } from './tariff-rate';

export interface Tariff {
    id: number;
    name: string;
    rates:  Array<TariffRate>
}