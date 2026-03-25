import { PlusCircle, StickyNote } from "lucide-react"
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar placeholder */}
      <aside className="w-56 border-r border-border bg-sidebar p-4">
        <h2 className="mb-4 text-lg font-semibold text-sidebar-foreground">
          Pages
        </h2>
        <nav className="space-y-1">
          <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent">
            <StickyNote className="size-4" />
            {new Date().toDateString()}
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col p-8">
        <input
          type="text"
          defaultValue={new Date().toDateString()}
          className="mb-6 w-full border-none bg-transparent text-center font-serif text-4xl tracking-wide text-foreground outline-none placeholder:text-muted-foreground focus:border-b-4 focus:border-dotted focus:border-primary"
          placeholder="Give me a title."
        />

        {/* Empty state */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground">
          <StickyNote className="size-16 opacity-30" />
          <p className="text-lg">No notes yet. Add one to get started.</p>
        </div>

        {/* Add note button */}
        <div className="mt-auto flex justify-center pt-6">
          <Button variant="ghost" size="lg" className="gap-2 text-muted-foreground hover:text-foreground">
            <PlusCircle className="size-6" />
            Add Note
          </Button>
        </div>
      </main>
    </div>
  )
}

export default App
