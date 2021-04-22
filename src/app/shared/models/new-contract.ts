import { Person } from './person.model'

export interface NewContract {
    contractStartDate: Date
    sendPaperBill: boolean
    owner: Person
}