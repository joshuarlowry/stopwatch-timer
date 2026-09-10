"use client"

import { Play, Square, Rewind, RotateCcw } from "lucide-react"
import type { Direction } from "@/hooks/use-stopwatch"

export function StopwatchControls({
  running,
  direction,
  onStart,
  onStop,
  onReverse,
  onReset,
}: {
  running: boolean
  direction: Direction
  onStart: () => void
  onStop: () => void
  onReverse: () => void
  onReset: () => void
}) {
  const forwardActive = running && direction === 1
  const backwardActive = running && direction === -1

  return (
    <div className="flex w-full max-w-[22rem] flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onReverse}
          aria-pressed={backwardActive}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border font-medium transition-colors"
          style={{
            borderColor: "var(--color-accent-reverse)",
            backgroundColor: backwardActive ? "var(--color-accent-reverse)" : "transparent",
            color: backwardActive ? "var(--color-primary-foreground)" : "var(--color-accent-reverse)",
          }}
        >
          <Rewind className="h-5 w-5 fill-current" />
          Reverse
        </button>
        <button
          type="button"
          onClick={onStart}
          aria-pressed={forwardActive}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border font-medium transition-colors"
          style={{
            borderColor: "var(--color-accent-run)",
            backgroundColor: forwardActive ? "var(--color-accent-run)" : "transparent",
            color: forwardActive ? "var(--color-primary-foreground)" : "var(--color-accent-run)",
          }}
        >
          <Play className="h-5 w-5 fill-current" />
          Start
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onStop}
          disabled={!running}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-border bg-secondary font-medium text-secondary-foreground transition-opacity disabled:opacity-30"
        >
          <Square className="h-5 w-5 fill-current" />
          Stop
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-border bg-transparent font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-5 w-5" />
          Reset
        </button>
      </div>
    </div>
  )
}
