import { useAtom } from "jotai"
import type { ColorTagData } from "@/types"
import { changeColor } from "@/lib/tags"
import { updateNoteTagAtom } from "@/atoms"

export function ColorTag({ noteId, tag }: { noteId: string; tag: ColorTagData }) {
  const [, updateTag] = useAtom(updateNoteTagAtom)

  return (
    <div className="flex items-center justify-center">
      <input
        type="color"
        value={tag.color}
        onChange={(e) => updateTag({ noteId, tag: changeColor(tag, e.target.value) })}
        className="h-7 w-7 cursor-pointer appearance-none rounded-full border-none bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-none"
      />
    </div>
  )
}
