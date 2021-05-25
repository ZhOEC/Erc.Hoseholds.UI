export enum MarkerType {
    Default,
    Payments,
    BranchOffice
}

export interface MarkerTypeData {
    value: MarkerType,
    title: string,
    style: string
}

export const markerTypesMap: Readonly<MarkerTypeData[]> = [
    {
        value: MarkerType.Default,
        title: "Загальний",
        style: "common"
    },
    {
        value: MarkerType.Payments,
        title: "Платежі",
        style: "payment"
    },
    {
        value: MarkerType.BranchOffice,
        title: "ЦОК",
        style: "branch-office"
    }
]