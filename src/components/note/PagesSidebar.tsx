import { useAtomValue, useAtom } from "jotai"
import { StickyNote, Plus, Trash2 } from "lucide-react"
import { pagesAtom, currentPageIdAtom, addPageAtom, switchPageAtom, deletePageAtom } from "@/atoms"
import { cn } from "@/lib/utils"

export function PagesSidebar() {
  const pages = useAtomValue(pagesAtom)
  const currentPageId = useAtomValue(currentPageIdAtom)
  const [, addPage] = useAtom(addPageAtom)
  const [, switchPage] = useAtom(switchPageAtom)
  const [, deletePage] = useAtom(deletePageAtom)

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center justify-between p-4 pb-2">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Pages</h2>
        <button
          type="button"
          onClick={() => addPage()}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4">
        {pages.map((page) => (
          <div
            key={page.id}
            className={cn(
              "group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
              page.id === currentPageId
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50",
            )}
          >
            <button
              type="button"
              onClick={() => switchPage(page.id)}
              className="flex flex-1 items-center gap-2 text-left"
            >
              <StickyNote className="size-4 shrink-0" />
              <span className="truncate">{page.title}</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                deletePage(page.id)
              }}
              className="hidden text-muted-foreground transition-colors hover:text-destructive group-hover:block"
            >
              <Trash2 className="size-3" />
            </button>
          </div>
        ))}
        {pages.length === 0 && (
          <p className="px-2 py-4 text-center text-xs text-muted-foreground">
            No pages yet
          </p>
        )}
      </nav>
    </aside>
  )
}
