export type TimeParts = {
  sign: string
  hours: string
  minutes: string
  seconds: string
  centis: string
  showHours: boolean
}

export function splitTime(ms: number): TimeParts {
  const sign = ms < 0 ? "\u2212" : ""
  const abs = Math.abs(ms)
  const totalCentis = Math.floor(abs / 10)
  const centis = totalCentis % 100
  const totalSeconds = Math.floor(totalCentis / 100)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)

  const pad = (n: number) => n.toString().padStart(2, "0")

  return {
    sign,
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    centis: pad(centis),
    showHours: hours > 0,
  }
}
