export interface PaymentBatchView {
    id: number,
    name: string,
    date: Date,
    totalCount: number,
    totalMount: number,
    isClosed: boolean
}