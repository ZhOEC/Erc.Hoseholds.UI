import { TaxInvoiceType } from './tax-invoice-type'

export interface TaxInvoice {
    id: number
    liabilityDate: Date // Last date month
    liabilitySum: number
    energyAmount: number
    tariffValue: number
    taxSum: number
    creationDate: Date
    operatorName: string
    fullSum: number
    type: TaxInvoiceType
}