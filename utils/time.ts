import dayjs, { ManipulateType } from 'dayjs'
const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export interface MyTime {
  day: number
  hour: number
  minute: number
  second: number
}
export const FormatTime = {
  format1: 'DD/MM/YYYY',
  format2: 'DD/MM/YYYY HH:mm:ss',
  format3: 'DD/MM/YYYY HH:mm',
  format4: 'DD/MM/YYYY, h:mmA',
}
export const countDownDateTime = (timeStamp: number): MyTime => {
  const now = dayjs().valueOf()
  const gap = timeStamp - now
  const test = new Date()

  const day = Math.floor(gap / DAY)
  const hour = Math.floor((gap % DAY) / HOUR)
  const minute = Math.floor((gap % HOUR) / MINUTE)
  const second = Math.floor((gap % MINUTE) / SECOND)
  // console.log(day, hour, minute, second)
  return { day, hour, minute, second }
}
export const countDownTime = (timeStamp: number) => {
  const gap = timeStamp - dayjs().valueOf()
  const day = Math.floor(gap / DAY)
  const hour = Math.floor((gap % DAY) / HOUR) + day * 24
  const minute = Math.floor((gap % HOUR) / MINUTE)
  const second = Math.floor((gap % MINUTE) / SECOND)
  return { hour, minute, second }
}
export const fixTime = (value: string | number): string => {
  let newValue: string = ''
  if (typeof value === 'number') newValue = value.toString()
  else newValue = value
  if (newValue.length === 1) return (newValue = '0' + newValue)
  else return newValue
}
export const convertTimeToString = (
  day: number,
  hour: number,
  minute: number,
  second: number
) => {
  if (day > 0) return `${day} days left`
  else if (hour > 0) return `${hour} hours left`
  else if (minute > 0) return `${minute} minutes left`
  else if (second > 0) return `${second} second left`
  else return 'expired'
}
export const getTimeWithFormat = (
  timeStamp: number,
  formatString: string = FormatTime.format3
) => {
  return dayjs(timeStamp).format(formatString)
}
export const getTimeStampFromFormSellNFT = (
  startingDate: string,
  expirationDate: string
) => {
  let startingTimestamp = 0
  let expirationTimestamp = 0
  if (startingDate === 'Right after listing') {
    startingTimestamp = dayjs().valueOf()
  } else {
    // ManipulateType
    const [value, unix] = startingDate.split(' ')
    console.log(dayjs().add(parseInt(value), unix as ManipulateType))
    startingTimestamp = dayjs()
      .add(parseInt(value), unix as ManipulateType)
      .valueOf()
  }
  if (expirationDate === 'Unlimit') {
    expirationTimestamp = -1
  } else {
    const [value, unix] = expirationDate.split(' ')
    console.log(dayjs().add(parseInt(value), unix as ManipulateType))
    expirationTimestamp =
      dayjs()
        .add(parseInt(value), unix as ManipulateType)
        .valueOf() +
      (startingTimestamp - dayjs().valueOf())
  }
  return {
    startingTimestamp,
    expirationTimestamp,
  }
}
