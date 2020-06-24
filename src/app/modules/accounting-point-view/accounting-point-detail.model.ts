import { Person } from '../../shared/models/person.model';
import { Exemption } from './exemption';

export interface AccountingPointDetail {
    id: number
    branchOfficeName: string
    name: string
    distributionSystemOperatorName: string
    tarriffName: string
    addressCityName: string
    adressStreetLocation: string
    owner: Person
    eic: string
    currentContractStartDate: Date
    debt: number
    exemption: Exemption
}