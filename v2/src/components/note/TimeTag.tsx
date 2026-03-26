import { useState } from "react"
import { useAtom } from "jotai"
import type { TimeTagData } from "@/types"
import { incrementHour, decrementHour, incrementMinute, decrementMinute, zeroPad } from "@/lib/tags"
import { updateNoteTagAtom } from "@/atoms"

export function TimeTag({ noteId, tag }: { noteId: string; tag: TimeTagData }) {
  const [, updateTag] = useAtom(updateNoteTagAtom)
  const [showControls, setShowControls] = useState(false)

  const update = (next: TimeTagData) => updateTag({ noteId, tag: next })

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={() => setShowControls((v) => !v)}
        className="text-lg font-mono text-foreground hover:text-primary transition-colors"
      >
        {zeroPad(tag.hours)}:{zeroPad(tag.minutes)}
      </button>
      {showControls && (
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <button type="button" onClick={() => update(incrementHour(tag))} className="rounded px-1 text-lg font-bold text-muted-foreground hover:text-foreground">+</button>
            <button type="button" onClick={() => update(decrementHour(tag))} className="rounded px-1 text-lg font-bold text-muted-foreground hover:text-foreground">-</button>
          </div>
          <div className="flex flex-col items-center">
            <button type="button" onClick={() => update(incrementMinute(tag))} className="rounded px-1 text-lg font-bold text-muted-foreground hover:text-foreground">+</button>
            <button type="button" onClick={() => update(decrementMinute(tag))} className="rounded px-1 text-lg font-bold text-muted-foreground hover:text-foreground">-</button>
          </div>
        </div>
      )}
    </div>
  )
}
