import { MarkerBasic } from "src/app/shared/models/markers/marker-basic"

export interface Marker {
    id: number
    accountingPointId: number
    markerId: number
    note: string
    marker: MarkerBasic
}