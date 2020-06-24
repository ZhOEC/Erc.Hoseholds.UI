import { Invoice } from './invoice';

export interface InvoiceList {
    items: Invoice[]
    totalCount: number
}