import { useCallback, useRef } from "react"
import { useAtom } from "jotai"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { updateNoteBodyAtom } from "@/atoms"

export function CodeNoteBody({
  noteId,
  body,
  language,
}: {
  noteId: string
  body: string
  language: string
}) {
  const [, updateBody] = useAtom(updateNoteBodyAtom)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateBody({ noteId, body: e.target.value })
    },
    [noteId, updateBody],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault()
        const ta = textareaRef.current
        if (!ta) return
        const start = ta.selectionStart
        const end = ta.selectionEnd
        const newBody = body.substring(0, start) + "  " + body.substring(end)
        updateBody({ noteId, body: newBody })
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 2
        })
      }
    },
    [noteId, body, updateBody],
  )

  return (
    <div className="flex-1 relative font-mono text-sm">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "0.5rem",
          background: "transparent",
          fontSize: "inherit",
          lineHeight: "1.5",
          pointerEvents: "none",
          minHeight: "2.5rem",
        }}
        codeTagProps={{
          style: {
            fontSize: "inherit",
            lineHeight: "inherit",
          },
        }}
      >
        {body || " "}
      </SyntaxHighlighter>
      <textarea
        ref={textareaRef}
        className="absolute inset-0 w-full h-full resize-none border-none bg-transparent px-2 py-2 font-mono text-sm text-transparent caret-foreground outline-none [field-sizing:content] placeholder:text-muted-foreground focus:border-l-4 focus:border-dotted focus:border-primary"
        placeholder="Write code here..."
        value={body}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        rows={1}
        style={{ lineHeight: "1.5" }}
      />
    </div>
  )
}
