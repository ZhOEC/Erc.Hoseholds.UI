export interface TariffRate {
    id: number;
    startDate: Date;
    value: number;
    consumptionLimit?: number;
    heatingConsumptionLimit?: number;
    heatingStartDay?: number;
    heatingStartMonth?: number;
    heatingEndDay?: number;
    heatingEndMonth?: number;
    tariffId: number;
}