import { Person } from 'src/app/shared/models/person.model';

export interface Exemption {
    effectiveDate: Date
    categoryName: string
    person: Person
}