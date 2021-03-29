import { Commodity } from 'src/app/shared/models/commodity'

export interface PrintBillsRequest {
    fileType: number
    commodity: Commodity
    branchOfficeId: number
    periodId: number
}
