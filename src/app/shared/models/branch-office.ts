import { Commodity } from './commodity'

export interface BranchOffice {
    id: number
    name: string
    stringId: string
    address: string
    currentPeriodName: string
    chiefName: string
    bookkeeperName: string
    bankFullName: string
    iban: string
    availableCommodities: Commodity[]
}