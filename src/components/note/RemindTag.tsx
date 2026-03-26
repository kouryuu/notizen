import { useEffect, useRef, useState } from "react"
import { useAtom } from "jotai"
import { Bell, BellRing, Pause, Play, RotateCcw } from "lucide-react"
import type { RemindTagData } from "@/types"
import {
  decrementRemindMinute,
  decrementRemindSecond,
  incrementRemindMinute,
  incrementRemindSecond,
  remindTotalSeconds,
  resetReminder,
  zeroPad,
} from "@/lib/tags"
import { updateNoteTagAtom } from "@/atoms"

export function RemindTag({ noteId, tag }: { noteId: string; tag: RemindTagData }) {
  const [, updateTag] = useAtom(updateNoteTagAtom)
  const [running, setRunning] = useState(false)
  const latestTagRef = useRef(tag)

  useEffect(() => {
    latestTagRef.current = tag
  }, [tag])

  useEffect(() => {
    if (!running) return

    const intervalId = window.setInterval(() => {
      const current = latestTagRef.current
      const total = remindTotalSeconds(current)

      if (total <= 0) {
        setRunning(false)
        return
      }

      const nextTotal = total - 1
      const next = {
        ...current,
        minutes: Math.floor(nextTotal / 60),
        seconds: nextTotal % 60,
        fired: nextTotal === 0,
      }

      if (nextTotal === 0) {
        setRunning(false)
        void new Audio("/remind.mp3").play().catch(() => undefined)
      }

      updateTag({ noteId, tag: next })
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [noteId, running, updateTag])

  const updateAndStop = (next: RemindTagData) => {
    setRunning(false)
    updateTag({ noteId, tag: next })
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={() => {
          if (remindTotalSeconds(tag) === 0) return
          setRunning((v) => !v)
        }}
        className="flex items-center gap-1 font-mono text-lg text-foreground transition-colors hover:text-primary"
      >
        {tag.fired ? <BellRing className="size-4 text-accent" /> : <Bell className="size-4" />}
        {zeroPad(tag.minutes)}:{zeroPad(tag.seconds)}
      </button>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (remindTotalSeconds(tag) === 0) return
            setRunning((v) => !v)
          }}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false)
            updateTag({ noteId, tag: { ...resetReminder(tag), minutes: 0, seconds: 1 } })
          }}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => updateAndStop(incrementRemindMinute(tag))}
            className="rounded px-1 text-lg font-bold text-muted-foreground hover:text-foreground"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => updateAndStop(decrementRemindMinute(tag))}
            className="rounded px-1 text-lg font-bold text-muted-foreground hover:text-foreground"
          >
            -
          </button>
        </div>
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => updateAndStop(incrementRemindSecond(tag))}
            className="rounded px-1 text-lg font-bold text-muted-foreground hover:text-foreground"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => updateAndStop(decrementRemindSecond(tag))}
            className="rounded px-1 text-lg font-bold text-muted-foreground hover:text-foreground"
          >
            -
          </button>
        </div>
      </div>
    </div>
  )
}
