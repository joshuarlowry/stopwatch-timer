"use client"

import { Play, Square, RefreshCw, RotateCcw } from "lucide-react"
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
  return (
    <div className="flex w-full max-w-[22rem] flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onStart}
          disabled={running}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-accent-run font-medium text-primary-foreground transition-opacity disabled:opacity-30"
        >
          <Play className="h-5 w-5 fill-current" />
          Start
        </button>
        <button
          type="button"
          onClick={onStop}
          disabled={!running}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-border bg-secondary font-medium text-secondary-foreground transition-opacity disabled:opacity-30"
        >
          <Square className="h-5 w-5 fill-current" />
          Stop
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onReverse}
          className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border font-medium transition-colors"
          style={{
            borderColor: direction === 1 ? "var(--color-accent-reverse)" : "var(--color-accent-run)",
            color: direction === 1 ? "var(--color-accent-reverse)" : "var(--color-accent-run)",
          }}
        >
          <RefreshCw className="h-5 w-5" />
          Reverse
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
