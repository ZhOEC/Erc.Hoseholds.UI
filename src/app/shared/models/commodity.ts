 export enum Commodity {
    ElectricPower = 1,
    NaturalGas
}
export interface CommodityData
{
    title:string,
    value:Commodity
}
export const commodityMap: Record<Commodity, CommodityData> = {
    [Commodity.ElectricPower]: { title: "Електрична енергія", value: Commodity.ElectricPower },
    [Commodity.NaturalGas]: { title: "Природний газ", value: Commodity.NaturalGas}
  };