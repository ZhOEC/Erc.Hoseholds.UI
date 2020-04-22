import { Person } from './person.model';
import { Address } from './address/address.model';

export interface AccountingPoint {
    branchOfficeId: number
    eic: string
    name: string
    dsoId: number
    tarrifId: number
    city: string
    street: string
    building: string
    appartament: string
    contractStartDate: Date
    address: Address
    owner: Person
}