export interface PaymentBatchView {
    id: number,
    name: string,
    paymentChannelName: string,
    paymentChannelId: number,
    incomingDate: Date,
    totalCount: number,
    totalAmount: number,
    isClosed: boolean
}