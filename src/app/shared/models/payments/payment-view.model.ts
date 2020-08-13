export interface PaymentView {
    id: number
    batchId: number
    branchOfficeName: string
    accountingPointId: number
    accountingPointName: string
    payerInfo: string
    payDate: Date
    amount: number
    status: number
    type: number
}