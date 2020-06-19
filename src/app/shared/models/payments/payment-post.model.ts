export interface PaymentPost {
    paymentsBatchId: number,
    accountingPointId: number,
    payDate: Date,
    amount: number,
    payerInfo: string
}