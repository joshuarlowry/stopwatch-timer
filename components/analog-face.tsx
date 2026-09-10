"use client"

import type { Direction } from "@/hooks/use-stopwatch"
import { splitTime } from "@/lib/format-time"

function norm(value: number, mod: number) {
  return ((value % mod) + mod) % mod
}

export function AnalogFace({
  elapsed,
  direction,
  running,
}: {
  elapsed: number
  direction: Direction
  running: boolean
}) {
  const totalSeconds = elapsed / 1000
  const secAngle = (norm(totalSeconds, 60) / 60) * 360
  const minutesTotal = totalSeconds / 60
  const subAngle = (norm(minutesTotal, 30) / 30) * 360

  const active = direction === 1 ? "var(--color-accent-run)" : "var(--color-accent-reverse)"
  const t = splitTime(elapsed)

  const ticks = Array.from({ length: 60 }, (_, i) => i)

  return (
    <div className="relative aspect-square w-full max-w-[22rem]">
      <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Analog stopwatch face">
        <circle cx="100" cy="100" r="98" fill="var(--color-panel)" stroke="var(--color-border)" strokeWidth="1" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="var(--color-border)" strokeWidth="0.75" />

        {ticks.map((i) => {
          const angle = (i / 60) * 360
          const major = i % 5 === 0
          const inner = major ? 78 : 84
          const outer = 89
          const rad = (angle - 90) * (Math.PI / 180)
          return (
            <line
              key={i}
              x1={100 + inner * Math.cos(rad)}
              y1={100 + inner * Math.sin(rad)}
              x2={100 + outer * Math.cos(rad)}
              y2={100 + outer * Math.sin(rad)}
              stroke={major ? "var(--color-etch)" : "var(--color-muted-foreground)"}
              strokeWidth={major ? 1.5 : 0.6}
              strokeLinecap="round"
            />
          )
        })}

        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((n) => {
          const angle = (n / 60) * 360
          const rad = (angle - 90) * (Math.PI / 180)
          return (
            <text
              key={n}
              x={100 + 68 * Math.cos(rad)}
              y={100 + 68 * Math.sin(rad)}
              fill="var(--color-etch)"
              fontSize="8"
              fontFamily="var(--font-mono)"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {n}
            </text>
          )
        })}

        {/* minute subdial */}
        <g transform="translate(100 138)">
          <circle r="22" fill="none" stroke="var(--color-border)" strokeWidth="0.75" />
          {Array.from({ length: 30 }, (_, i) => i).map((i) => {
            const angle = (i / 30) * 360
            const rad = (angle - 90) * (Math.PI / 180)
            const inner = i % 5 === 0 ? 16 : 18.5
            return (
              <line
                key={i}
                x1={inner * Math.cos(rad)}
                y1={inner * Math.sin(rad)}
                x2={20 * Math.cos(rad)}
                y2={20 * Math.sin(rad)}
                stroke="var(--color-muted-foreground)"
                strokeWidth={i % 5 === 0 ? 0.8 : 0.4}
              />
            )
          })}
          <line
            x1="0"
            y1="4"
            x2="0"
            y2="-15"
            stroke="var(--color-etch)"
            strokeWidth="1.4"
            strokeLinecap="round"
            transform={`rotate(${subAngle})`}
            style={{ transition: running ? "none" : "transform 120ms linear" }}
          />
          <circle r="1.6" fill="var(--color-etch)" />
        </g>

        {/* center second hand */}
        <g transform={`rotate(${secAngle} 100 100)`} style={{ transition: running ? "none" : "transform 120ms linear" }}>
          <line x1="100" y1="118" x2="100" y2="22" stroke={active} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="100" cy="100" r="4.5" fill={active} />
        </g>
        <circle cx="100" cy="100" r="2" fill="var(--color-panel)" />
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-[14%] flex justify-center">
        <span className="font-mono text-xs tracking-widest text-muted-foreground tabular-nums">
          {t.sign}
          {t.showHours ? `${t.hours}:` : ""}
          {t.minutes}:{t.seconds}
          <span className="text-etch">.{t.centis}</span>
        </span>
      </div>
    </div>
  )
}
