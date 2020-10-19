import { Commodity } from './commodity';
import { TariffRate } from './tariff-rate';

export interface Tariff {
    id: number;
    name: string;
    commodity: Commodity
    rates:  Array<TariffRate>
}