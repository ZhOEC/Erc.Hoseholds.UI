import { Person } from './person.model'
import { Address } from './address/address.model'

export interface AccountingPoint {
    id: number
    branchOfficeId: number
    eic: string
    name: string
    distributionSystemOperatorId: number
    tarrifId: number
    buildingTypeId: number
    usageCategoryId: number
    sendPaperBill: boolean
    contractStartDate: Date
    address: Address
    owner: Person
}