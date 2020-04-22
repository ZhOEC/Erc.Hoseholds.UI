export interface PaymentChannel {
    id: number
    name: string
    recordpointFieldName: string
    sumFieldName: string
    dateFieldName: string
    textDateFormat: string
    personFieldName: string
    totalRecord: string
    type: number
}