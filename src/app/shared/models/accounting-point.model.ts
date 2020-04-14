import { IPerson } from './person.model';
import { IAddress } from './address.model';

export interface IAccountingPoint {
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
    address: IAddress
    owner: IPerson
}