import { Person } from './person.model'

export interface Exemption {
    id: number
    categoryId: number
    date: Date
    certificate: string
    personCount: number
    limit: boolean
    note: string
    person: Person
}
