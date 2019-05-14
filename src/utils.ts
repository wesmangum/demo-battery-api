export function toTime (secondsStr: string): string {
  const sec = parseInt(secondsStr, 10)
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec - hours * 3600) / 60)

  const hoursLabel:string = hours < 10 ? '0' + hours : String(hours)

  const minutesLabel: string = minutes < 10 ? '0' + minutes : String(minutes)

  return hoursLabel + ':' + minutesLabel
}

export function batteryStats (battery) {
  const percentage = parseFloat((battery.level * 100).toFixed(2)) + '%'
  let fully
  let remaining
  let charging = battery.charging

  if (charging && battery.chargingTime === Infinity) {
    fully = 'Calculating...'
  } else if (battery.chargingTime !== Infinity) {
    fully = toTime(battery.chargingTime)
  } else {
    fully = '---'
  }

  if (!battery.charging && battery.dischargingTime === Infinity) {
    remaining = 'Calculating...'
  } else if (battery.dischargingTime !== Infinity) {
    remaining = toTime(battery.dischargingTime)
  } else {
    remaining = '---'
  }

  return { percentage, fully, remaining, charging }
}
