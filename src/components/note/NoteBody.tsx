import { useCallback } from "react"
import { useAtom } from "jotai"
import { updateNoteBodyAtom } from "@/atoms"

export function NoteBody({ noteId, body }: { noteId: string; body: string }) {
  const [, updateBody] = useAtom(updateNoteBodyAtom)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateBody({ noteId, body: e.target.value })
    },
    [noteId, updateBody],
  )

  return (
    <div className="flex-1">
      <textarea
        className="w-full resize-none border-none bg-transparent px-2 py-1 text-lg tracking-wide text-foreground outline-none [field-sizing:content] placeholder:text-muted-foreground focus:border-l-4 focus:border-dotted focus:border-primary"
        placeholder="Write something here."
        value={body}
        onChange={handleChange}
        rows={1}
      />
    </div>
  )
}
