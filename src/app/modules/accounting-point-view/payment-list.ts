import { Invoice } from './invoice';
import { Payment } from './payment';

export interface InvoiceList {
    items: Payment[]
    totalCount: number
}