"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type Direction = 1 | -1

export function useStopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [direction, setDirection] = useState<Direction>(1)

  const elapsedRef = useRef(0)
  const lastRef = useRef(0)
  const directionRef = useRef<Direction>(1)
  const runningRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  const tick = useCallback(() => {
    const now = performance.now()
    const delta = now - lastRef.current
    lastRef.current = now
    elapsedRef.current += delta * directionRef.current
    setElapsed(elapsedRef.current)
    if (runningRef.current) {
      rafRef.current = requestAnimationFrame(tick)
    }
  }, [])

  const start = useCallback(() => {
    if (runningRef.current) return
    runningRef.current = true
    setRunning(true)
    lastRef.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stop = useCallback(() => {
    if (!runningRef.current) return
    runningRef.current = false
    setRunning(false)
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])

  const toggle = useCallback(() => {
    if (runningRef.current) stop()
    else start()
  }, [start, stop])

  const reverse = useCallback(() => {
    directionRef.current = (directionRef.current * -1) as Direction
    setDirection(directionRef.current)
  }, [])

  const reset = useCallback(() => {
    runningRef.current = false
    setRunning(false)
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    elapsedRef.current = 0
    setElapsed(0)
    directionRef.current = 1
    setDirection(1)
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { elapsed, running, direction, start, stop, toggle, reverse, reset }
}
