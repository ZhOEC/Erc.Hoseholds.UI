import { Commodity } from './commodity'
import { Period } from './period'

export interface BranchOffice {
    id: number
    name: string
    stringId: string
    address: string
    chiefName: string
    bookkeeperName: string
    bankFullName: string
    iban: string
    currentPeriod: Period
    availableCommodities: Commodity[]
}