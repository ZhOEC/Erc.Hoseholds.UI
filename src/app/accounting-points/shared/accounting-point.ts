import { IPerson } from './person';

export interface IAccountingPoint {
    branchOfficeId: number
    name: string
    distributionSystemOperatorId: number
    tarrifId: number
    city: string
    street: string
    building: string
    appartament: string
    person: IPerson
}