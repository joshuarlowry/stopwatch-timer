"use client"

import type { Direction } from "@/hooks/use-stopwatch"

export function DirectionBadge({
  direction,
  negative,
}: {
  direction: Direction
  negative: boolean
}) {
  const reverse = direction === -1
  const color = reverse ? "text-accent-reverse" : "text-accent-run"
  const dot = reverse ? "bg-accent-reverse" : "bg-accent-run"

  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-panel px-3 py-1.5">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <span className={`font-mono text-[0.65rem] uppercase tracking-[0.3em] ${color}`}>
          {reverse ? "Rev" : "Fwd"}
        </span>
        <span aria-hidden className={`text-xs leading-none ${color}`}>
          {reverse ? "\u25C0" : "\u25B6"}
        </span>
      </span>
      {negative && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-reverse/40 bg-accent-reverse/10 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent-reverse">
          <span aria-hidden>{"\u2212"}</span>
          Negative
        </span>
      )}
    </div>
  )
}
