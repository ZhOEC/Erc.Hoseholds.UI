export interface PaymentBatchView {
    id: number,
    paymentChannelName: string,
    totalCount: number,
    totalMount: number,
    isClosed: boolean
}