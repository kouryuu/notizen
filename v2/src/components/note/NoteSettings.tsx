import { useState } from "react"
import { useAtom } from "jotai"
import { Settings, Trash2, Clock, Paintbrush, ListChecks } from "lucide-react"
import { TAG_TYPES } from "@/types"
import { deleteNoteAtom, changeNoteTagTypeAtom } from "@/atoms"

export function NoteSettings({ noteId }: { noteId: string }) {
  const [, deleteNote] = useAtom(deleteNoteAtom)
  const [, changeTagType] = useAtom(changeNoteTagTypeAtom)
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-start gap-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-muted-foreground/40 transition-colors hover:text-foreground"
      >
        <Settings className="size-4" />
      </button>
      {open && (
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => deleteNote(noteId)}
            className="text-muted-foreground/40 transition-colors hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => changeTagType({ noteId, tagType: TAG_TYPES.TIME })}
            className="text-muted-foreground/40 transition-colors hover:text-foreground"
          >
            <Clock className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => changeTagType({ noteId, tagType: TAG_TYPES.COLOR })}
            className="text-muted-foreground/40 transition-colors hover:text-foreground"
          >
            <Paintbrush className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => changeTagType({ noteId, tagType: TAG_TYPES.CHECKBOX })}
            className="text-muted-foreground/40 transition-colors hover:text-foreground"
          >
            <ListChecks className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}
