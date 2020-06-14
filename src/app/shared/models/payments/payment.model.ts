export interface Payment {
    id: number
    accountingPointName: string
    payerInfo: string
    payDate: Date
    amount: number
    status: string
    type: string
}