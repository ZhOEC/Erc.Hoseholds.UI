import { Person } from './person';

export interface AccountingPoint {
    branchOfficeId: number
    name: string
    distributionSystemOperatorId: number
    tarrifId: number
    city: string
    street: string
    building: string
    appartament: string
    person: Person
}