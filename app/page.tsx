import { Stopwatch } from "@/components/stopwatch"

export default function Page() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-5 py-10">
      <header className="mb-10 flex flex-col items-center gap-2 text-center">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-muted-foreground">
          Precision Timing
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Chronometer</h1>
      </header>
      <Stopwatch />
    </main>
  )
}
