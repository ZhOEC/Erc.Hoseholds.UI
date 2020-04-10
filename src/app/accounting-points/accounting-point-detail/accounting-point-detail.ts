import { Person } from '../shared/person';

export interface AccountingPointDetail {
    branchOfficeName: string
    name: string
    distributionSystemOperatorName: number
    tarriffName: string
    addressCityName: string
    adressStreetLocation: string
    owner: Person
    eic: string
    currentContractStartDate: Date
    debt: number
}