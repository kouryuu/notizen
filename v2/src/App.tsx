import { useAtomValue, useAtom } from "jotai"
import { PlusCircle, StickyNote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { currentPageAtom, currentNotesAtom, addNoteAtom, addPageAtom, pagesAtom } from "@/atoms"
import { PagesSidebar } from "@/components/note/PagesSidebar"
import { PageTitle } from "@/components/note/PageTitle"
import { NoteWrapper } from "@/components/note/NoteWrapper"

function App() {
  const pages = useAtomValue(pagesAtom)
  const currentPage = useAtomValue(currentPageAtom)
  const notes = useAtomValue(currentNotesAtom)
  const [, addNote] = useAtom(addNoteAtom)
  const [, addPage] = useAtom(addPageAtom)

  return (
    <div className="flex h-screen bg-background">
      <PagesSidebar />

      <main className="flex flex-1 flex-col overflow-y-auto p-8">
        {currentPage ? (
          <>
            <PageTitle title={currentPage.title} />

            {notes.length > 0 ? (
              <div className="flex flex-col">
                {notes.map((note) => (
                  <NoteWrapper key={note.id} note={note} />
                ))}
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground">
                <StickyNote className="size-16 opacity-30" />
                <p className="text-lg">No notes yet. Add one to get started.</p>
              </div>
            )}

            <div className="mt-auto flex justify-center pt-6">
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 text-muted-foreground hover:text-foreground"
                onClick={() => addNote()}
              >
                <PlusCircle className="size-6" />
                Add Note
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground">
            <StickyNote className="size-16 opacity-30" />
            <p className="text-lg">
              {pages.length === 0 ? "Create a page to get started." : "Select a page."}
            </p>
            {pages.length === 0 && (
              <Button
                variant="outline"
                onClick={() => addPage()}
                className="gap-2"
              >
                <PlusCircle className="size-4" />
                New Page
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
