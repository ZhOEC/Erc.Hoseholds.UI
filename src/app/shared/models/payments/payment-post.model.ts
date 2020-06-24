export interface PaymentPost {
    id: number,
    paymentsBatchId: number,
    accountingPointId: number,
    payDate: Date,
    amount: number,
    payerInfo: string
}