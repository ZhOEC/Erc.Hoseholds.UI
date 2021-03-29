import { Commodity } from './commodity'

export interface BranchOffice {
    id: number
    name: string
    stringId: string
    address: string
    currentPeriodName: string
    availableCommodities: Commodity[]
    chiefName: string
    bookkeeperName: string
    bankFullName: string
    iban: string
}