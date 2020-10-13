export interface ConsumptionRecord {
  row: number
  eic: string
  previousMeterReadingT1: string
  previousMeterReadingT2: string
  previousMeterReadingT3: string
  presentMeterReadingT1: string
  presentMeterReadingT2: string
  presentMeterReadingT3: string
  usageT1: string
  usageT2: string
  usageT3: string
  meterNumber: string
}
