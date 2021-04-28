import { Commodity } from './commodity'
import { Period } from './period'

export interface BranchOffice {
    id: number
    name: string
    stringId: string
    address: string
    currentPeriodName: string // TODO: remove after done with create tax invoice
    chiefName: string
    bookkeeperName: string
    bankFullName: string
    iban: string
    currentPeriod: Period
    availableCommodities: Commodity[]
}