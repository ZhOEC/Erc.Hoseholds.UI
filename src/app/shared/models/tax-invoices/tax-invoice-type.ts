export enum TaxInvoiceType {
    CompensationDso,
    Electricity,
    NaturalGas
}

export interface TaxInvoiceTypeData {
    title: string,
    value: TaxInvoiceType,
    productName: string,
    productCode: string,
    unit: string,
    unitCode: string,
    precision: number
}

export const taxInvoiceMap: Record<TaxInvoiceType, TaxInvoiceTypeData> = {
    [TaxInvoiceType.CompensationDso]: {
        title: "Компенсація",
        value: TaxInvoiceType.CompensationDso,
        productName: "Компенсація за недотримання гарантованих стандартів якості надання послуг ОСР",
        productCode: "35.13",
        unit: "грн",
        unitCode: "2454",
        precision: 0
    },
    [TaxInvoiceType.Electricity]: {
        title: "Електроенергія",
        value: TaxInvoiceType.Electricity,
        productName: "Електрична енергія",
        productCode: "2716000000",
        unit: "кВт·год",
        unitCode: "0415",
        precision: 0
    },
    [TaxInvoiceType.NaturalGas]: {
        title: "Газ природний",
        value: TaxInvoiceType.NaturalGas,
        productName: "Газ природний",
        productCode: "2711210000",
        unit: "м3",
        unitCode: "0134",
        precision: 3
    }
}