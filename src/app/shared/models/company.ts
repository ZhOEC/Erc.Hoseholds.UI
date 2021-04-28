import { BranchOffice } from './branch-office'

export interface Company {
    id: number
    name: string
    shortName: string
    directorName: string
    address: string
    email: string
    www: string
    taxpayerPhone: string
    bookkeeperName: string
    bookkeeperTaxNumber: string
    branchOffices: BranchOffice[]
}