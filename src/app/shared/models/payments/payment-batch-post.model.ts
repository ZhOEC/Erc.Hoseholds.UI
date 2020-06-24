export interface PaymentBatchPost {
    branchOfficeId: number
    paymentChannelId: number
    incomingDate: Date
    uploadFile: File
}