export interface PaymentView {
    id: number
    branchOfficeName: string
    accountingPointName: string
    payerInfo: string
    payDate: Date
    amount: number
    status: string
    type: string
}