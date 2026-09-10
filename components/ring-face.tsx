"use client"

import type { Direction } from "@/hooks/use-stopwatch"
import { splitTime } from "@/lib/format-time"

function norm(value: number, mod: number) {
  return ((value % mod) + mod) % mod
}

export function RingFace({
  elapsed,
  direction,
}: {
  elapsed: number
  direction: Direction
}) {
  const totalSeconds = elapsed / 1000
  const fraction = norm(totalSeconds, 60) / 60
  const t = splitTime(elapsed)
  const active = direction === 1 ? "var(--color-accent-run)" : "var(--color-accent-reverse)"

  const R = 88
  const C = 2 * Math.PI * R

  return (
    <div className="relative aspect-square w-full max-w-[22rem]">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" role="img" aria-label="Ring stopwatch face">
        <circle cx="100" cy="100" r="98" fill="var(--color-panel)" stroke="var(--color-border)" strokeWidth="1" />
        <circle cx="100" cy="100" r={R} fill="none" stroke="var(--color-border)" strokeWidth="6" />
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke={active}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - fraction)}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-medium tabular-nums text-foreground sm:text-5xl">
          {t.sign}
          {t.showHours ? `${t.hours}:` : ""}
          {t.minutes}:{t.seconds}
        </span>
        <span className="mt-2 font-mono text-lg tabular-nums text-etch">.{t.centis}</span>
      </div>
    </div>
  )
}
