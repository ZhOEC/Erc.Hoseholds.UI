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
}

export const taxInvoiceMap: Record<TaxInvoiceType, TaxInvoiceTypeData> = {
    [TaxInvoiceType.CompensationDso]: {
        title: "Компенсація",
        value: TaxInvoiceType.CompensationDso,
        productName: "Компенсація за недотримання гарантованих стандартів якості надання послуг ОСР",
        productCode: "35.13",
        unit: "грн",
        unitCode: "2454"
    },
    [TaxInvoiceType.Electricity]: { 
        title: "Електроенергія",
        value: TaxInvoiceType.Electricity,
        productName: "Електрична енергія",
        productCode: "2716000000",
        unit: "кВт·год",
        unitCode: "0415"
    },
    [TaxInvoiceType.NaturalGas]: {
        title: "Природний газ",
        value: TaxInvoiceType.NaturalGas,
        productName: "Природний газ",
        productCode: "2711210000",
        unit: "м³",
        unitCode: "0134"
    }
}