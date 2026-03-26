import { useCallback } from "react"
import { useAtom } from "jotai"
import { renamePageAtom } from "@/atoms"

export function PageTitle({ title }: { title: string }) {
  const [, rename] = useAtom(renamePageAtom)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      rename(e.target.value)
    },
    [rename],
  )

  return (
    <input
      type="text"
      value={title}
      onChange={handleChange}
      className="mb-6 w-full border-none bg-transparent text-center font-serif text-4xl tracking-wide text-foreground outline-none placeholder:text-muted-foreground focus:border-b-4 focus:border-dotted focus:border-primary"
      placeholder="Give me a title."
    />
  )
}
