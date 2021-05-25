import { Person } from '../../shared/models/person.model';
import { Exemption } from './exemption';
import { Marker } from './marker'

export interface AccountingPointDetail {
    id: number
    branchOfficeName: string
    name: string
    distributionSystemOperatorName: string
    currentTarriffName: string
    addressCityName: string
    adressStreetLocation: string
    owner: Person
    eic: string
    currentContractStartDate: Date
    currentContractSendPaperBill: boolean
    debt: number
    exemption: Exemption
    markers: Marker[]
}