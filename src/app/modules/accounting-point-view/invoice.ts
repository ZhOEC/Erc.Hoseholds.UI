import { ZoneUsage } from './zone-usage';

export interface Invoice {
    id: number;
    name: string;
    fromDate: Date
    toDate: Date
    totalUnits: number
    totalDiscount: number
    totalAmountDue: number
    totalCharge: number
    incomingBalance: number
    counterSerialNumber: string
    isPaid: boolean
    note: string
    periodName: string
    type: string
    zoneUsages: ZoneUsage[]
    isExpand: boolean;
}