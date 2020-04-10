export interface IPerson {
    id: number
    firstName: string
    lastName: string
    patronymic: string
    taxCode: string
    idCardNumber: string
    idCardIssueDate: Date
    idCardExpDate: Date
}

export interface Person {
    id: number
    firstName: string
    lastName: string
    patronymic: string
    taxCode: string
    fullName: string
    idCardNumber: string
    idCardIssuanceDate: Date
    idCardExpDate: Date
    mobilePhones: string[]
}