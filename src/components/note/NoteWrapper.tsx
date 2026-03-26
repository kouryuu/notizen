import { Lock } from "lucide-react"
import type { Note } from "@/types"
import { TAG_TYPES } from "@/types"
import { TagDisplay } from "./TagDisplay"
import { NoteBody } from "./NoteBody"
import { CodeNoteBody } from "./CodeNoteBody"
import { NoteSettings } from "./NoteSettings"

function NoteBodySwitch({ note }: { note: Note }) {
  if (note.tag.type === TAG_TYPES.SECRET && (!note.tag.unlocked || note.tag.passwordHash === "")) {
    return (
      <div className="flex flex-1 items-center gap-2 px-2 py-1 text-muted-foreground">
        <Lock className="size-4" />
        <span className="text-sm italic">This note is locked</span>
      </div>
    )
  }

  if (note.tag.type === TAG_TYPES.CODE) {
    return <CodeNoteBody noteId={note.id} body={note.body} language={note.tag.language} />
  }

  return <NoteBody noteId={note.id} body={note.body} />
}

export function NoteWrapper({ note }: { note: Note }) {
  return (
    <div className="flex items-start gap-2 border-b border-border py-4">
      <div className="w-36 shrink-0 pt-1 text-center">
        <TagDisplay noteId={note.id} tag={note.tag} />
      </div>
      <NoteBodySwitch note={note} />
      <NoteSettings noteId={note.id} />
    </div>
  )
}
