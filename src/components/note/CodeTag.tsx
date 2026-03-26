import { useState } from "react"
import { useAtom } from "jotai"
import { ChevronDown } from "lucide-react"
import type { CodeTagData } from "@/types"
import { changeLanguage } from "@/lib/tags"
import { updateNoteTagAtom } from "@/atoms"

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "rust",
  "go",
  "java",
  "c",
  "cpp",
  "csharp",
  "html",
  "css",
  "json",
  "bash",
  "sql",
  "ruby",
  "php",
  "swift",
  "kotlin",
  "yaml",
  "markdown",
] as const

export function CodeTag({ noteId, tag }: { noteId: string; tag: CodeTagData }) {
  const [, updateTag] = useAtom(updateNoteTagAtom)
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 font-mono text-sm text-foreground transition-colors hover:text-primary"
      >
        {tag.language}
        <ChevronDown className="size-3" />
      </button>
      {open && (
        <div className="max-h-40 overflow-y-auto rounded border border-border bg-card p-1 shadow-sm">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                updateTag({ noteId, tag: changeLanguage(tag, lang) })
                setOpen(false)
              }}
              className={`block w-full rounded px-2 py-0.5 text-left font-mono text-xs transition-colors hover:bg-muted ${
                lang === tag.language ? "text-primary" : "text-foreground"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
