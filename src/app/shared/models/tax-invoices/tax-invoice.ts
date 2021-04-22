import { TaxInvoiceTabLine } from './tax-invoice-tab-line'

export interface TaxInvoice {
    id?: number
    creationDate?: Date
    branchOfficeId: number
    periodId: number
    type: number
    liabilityDate: Date
    liabilitySum: number
    quantityTotal: number
    taxSum: number
    fullSum: number
    tabLines: TaxInvoiceTabLine[]
    isExpand?: boolean
}