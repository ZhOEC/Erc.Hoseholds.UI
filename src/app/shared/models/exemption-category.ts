export interface ExemptionCategory {
    id: number
    name: string
    coeff: number
    hasLimit: boolean
    effectiveDate: Date
    endDate: Date
}
