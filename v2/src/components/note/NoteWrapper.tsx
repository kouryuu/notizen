import type { Note } from "@/types"
import { TagDisplay } from "./TagDisplay"
import { NoteBody } from "./NoteBody"
import { NoteSettings } from "./NoteSettings"

export function NoteWrapper({ note }: { note: Note }) {
  return (
    <div className="flex items-start gap-2 border-b border-border py-4">
      <div className="w-36 shrink-0 pt-1 text-center">
        <TagDisplay noteId={note.id} tag={note.tag} />
      </div>
      <NoteBody noteId={note.id} body={note.body} />
      <NoteSettings noteId={note.id} />
    </div>
  )
}
