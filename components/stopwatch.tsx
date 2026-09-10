"use client"

import { useState } from "react"
import { useStopwatch } from "@/hooks/use-stopwatch"
import { AnalogFace } from "@/components/analog-face"
import { DigitalFace } from "@/components/digital-face"
import { RingFace } from "@/components/ring-face"
import { StopwatchControls } from "@/components/stopwatch-controls"

type FaceKey = "analog" | "digital" | "ring"

const FACES: { key: FaceKey; label: string }[] = [
  { key: "analog", label: "Analog" },
  { key: "digital", label: "Digital" },
  { key: "ring", label: "Ring" },
]

export function Stopwatch() {
  const { elapsed, running, direction, start, stop, reverse, reset } = useStopwatch()
  const [face, setFace] = useState<FaceKey>("analog")

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div
        role="tablist"
        aria-label="Clock face"
        className="flex gap-1 rounded-full border border-border bg-panel p-1"
      >
        {FACES.map((f) => {
          const selected = face === f.key
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={selected}
              type="button"
              onClick={() => setFace(f.key)}
              className={`min-h-[40px] rounded-full px-5 text-sm font-medium transition-colors ${
                selected ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      <div className="flex w-full justify-center">
        {face === "analog" && <AnalogFace elapsed={elapsed} direction={direction} running={running} />}
        {face === "digital" && <DigitalFace elapsed={elapsed} direction={direction} />}
        {face === "ring" && <RingFace elapsed={elapsed} direction={direction} />}
      </div>

      <StopwatchControls
        running={running}
        direction={direction}
        onStart={start}
        onStop={stop}
        onReverse={reverse}
        onReset={reset}
      />
    </div>
  )
}
