import { useAtom } from "jotai"
import { CheckSquare, Square } from "lucide-react"
import type { CheckboxTagData } from "@/types"
import { toggleCheckbox } from "@/lib/tags"
import { updateNoteTagAtom } from "@/atoms"

export function CheckboxTag({ noteId, tag }: { noteId: string; tag: CheckboxTagData }) {
  const [, updateTag] = useAtom(updateNoteTagAtom)

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={() => updateTag({ noteId, tag: toggleCheckbox(tag) })}
        className="transition-colors hover:text-primary"
      >
        {tag.checked ? (
          <CheckSquare className="size-6 text-accent" />
        ) : (
          <Square className="size-6 text-muted-foreground" />
        )}
      </button>
    </div>
  )
}
