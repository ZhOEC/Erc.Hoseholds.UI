export interface TariffRate {
    id: number;
    startDate: Date;
    value: number;
    consumptionLimit?: number;
    heatingConsumptionLimit?: number;
    heatingStartDay?: Date;
    heatingEndDay?: Date;
    tariffId: number;
}