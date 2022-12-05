export interface PeriodTime {
  text: string
  value?: number
  unix?: 'days' | 'months' | 'years' | 'hours' | 'minutes' | 'seconds' | 'weeks'
}
