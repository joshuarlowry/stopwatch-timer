"use client"

import type { Direction } from "@/hooks/use-stopwatch"
import { splitTime } from "@/lib/format-time"

export function DigitalFace({
  elapsed,
  direction,
}: {
  elapsed: number
  direction: Direction
}) {
  const t = splitTime(elapsed)
  const negative = elapsed < 0
  const active = direction === 1 ? "text-accent-run" : "text-accent-reverse"

  return (
    <div
      className={`relative flex aspect-square w-full max-w-[22rem] flex-col items-center justify-center overflow-hidden rounded-3xl border bg-panel px-6 transition-colors ${
        negative ? "border-accent-reverse/40" : "border-border"
      }`}
    >
      {negative && <div aria-hidden className="pointer-events-none absolute inset-0 bg-accent-reverse/[0.06]" />}

      <div className="relative z-10 flex items-end justify-center">
        {/* ghost segments */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center font-mono text-6xl font-medium tabular-nums text-foreground/[0.06] sm:text-7xl">
          {t.showHours ? "88:" : ""}88:88
        </div>
        <div className={`flex items-end font-mono text-6xl font-medium tabular-nums ${active} sm:text-7xl`}>
          <span className="text-foreground">
            <span className="text-accent-reverse">{t.sign}</span>
            {t.showHours ? `${t.hours}:` : ""}
            {t.minutes}:{t.seconds}
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-1 flex items-center gap-1">
        <span className="font-mono text-2xl tabular-nums text-etch sm:text-3xl">.{t.centis}</span>
        <span className="ml-1 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">sec</span>
      </div>
    </div>
  )
}
