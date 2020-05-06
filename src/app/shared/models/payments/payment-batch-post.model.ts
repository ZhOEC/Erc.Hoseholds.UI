export interface PaymentBatchPost {
    branchOfficeId: number
    paymentChannelId: number
    dateComing: Date
    uploadFile: File
}