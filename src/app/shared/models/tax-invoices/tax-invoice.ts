import { TaxInvoiceTabLine } from './tax-invoice-tab-line'
import { TaxInvoiceType } from './tax-invoice-type'

export interface TaxInvoice {
    id?: number
    creationDate?: Date
    branchOfficeId: number
    periodId: number
    type: TaxInvoiceType
    liabilityDate: Date
    liabilitySum: number
    quantityTotal: number
    taxSum: number
    fullSum: number
    tabLines: TaxInvoiceTabLine[]
    isExpand?: boolean
}