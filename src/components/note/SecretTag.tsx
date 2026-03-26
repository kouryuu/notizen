import { useState } from "react"
import { useAtom } from "jotai"
import { Lock, Unlock, KeyRound } from "lucide-react"
import type { SecretTagData } from "@/types"
import { setSecretPassword, unlockSecret, lockSecret } from "@/lib/tags"
import { updateNoteTagAtom } from "@/atoms"

export function SecretTag({ noteId, tag }: { noteId: string; tag: SecretTagData }) {
  const [, updateTag] = useAtom(updateNoteTagAtom)
  const [input, setInput] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  // First-time setup: set password
  if (tag.passwordHash === "") {
    return (
      <div className="flex flex-col items-center gap-1">
        <KeyRound className="size-5 text-muted-foreground" />
        <input
          type="password"
          placeholder="Password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-28 rounded border border-border bg-transparent px-1.5 py-0.5 text-xs text-foreground outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="Confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-28 rounded border border-border bg-transparent px-1.5 py-0.5 text-xs text-foreground outline-none focus:border-primary"
        />
        {error && <span className="text-xs text-destructive">{error}</span>}
        <button
          type="button"
          onClick={() => {
            if (input.length === 0) {
              setError("Enter a password")
              return
            }
            if (input !== confirm) {
              setError("Passwords don't match")
              return
            }
            updateTag({ noteId, tag: setSecretPassword(tag, input) })
            setInput("")
            setConfirm("")
            setError("")
          }}
          className="rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Set
        </button>
      </div>
    )
  }

  // Locked: show unlock input
  if (!tag.unlocked) {
    return (
      <div className="flex flex-col items-center gap-1">
        <Lock className="size-5 text-destructive" />
        <input
          type="password"
          placeholder="Password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const result = unlockSecret(tag, input)
              if (result.unlocked) {
                updateTag({ noteId, tag: result })
                setInput("")
                setError("")
              } else {
                setError("Wrong password")
              }
            }
          }}
          className="w-28 rounded border border-border bg-transparent px-1.5 py-0.5 text-xs text-foreground outline-none focus:border-primary"
        />
        {error && <span className="text-xs text-destructive">{error}</span>}
        <button
          type="button"
          onClick={() => {
            const result = unlockSecret(tag, input)
            if (result.unlocked) {
              updateTag({ noteId, tag: result })
              setInput("")
              setError("")
            } else {
              setError("Wrong password")
            }
          }}
          className="rounded bg-primary px-2 py-0.5 text-xs text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Unlock
        </button>
      </div>
    )
  }

  // Unlocked: show lock button
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={() => updateTag({ noteId, tag: lockSecret(tag) })}
        className="transition-colors hover:text-primary"
      >
        <Unlock className="size-5 text-accent" />
      </button>
      <span className="text-xs text-muted-foreground">Unlocked</span>
    </div>
  )
}
