import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider, createStore } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import type { ReactNode } from "react"
import App from "@/App"
import { pagesAtom, currentPageIdAtom, defaultTagTypeAtom } from "@/atoms"
import { TAG_TYPES } from "@/types"
import type { Page, TagType } from "@/types"

type InitialValues = {
  pages?: Page[]
  currentPageId?: string | null
  defaultTagType?: TagType
}

function HydrateAtoms({ initialValues, children }: { initialValues: InitialValues; children: ReactNode }) {
  const atoms: [typeof pagesAtom, Page[]][] | [typeof currentPageIdAtom, string | null][] | [typeof defaultTagTypeAtom, TagType][] = []
  if (initialValues.pages !== undefined) {
    atoms.push([pagesAtom, initialValues.pages] as never)
  }
  if (initialValues.currentPageId !== undefined) {
    atoms.push([currentPageIdAtom, initialValues.currentPageId] as never)
  }
  if (initialValues.defaultTagType !== undefined) {
    atoms.push([defaultTagTypeAtom, initialValues.defaultTagType] as never)
  }
  useHydrateAtoms(atoms as never)
  return children
}

function renderApp(initialValues: InitialValues = {}) {
  const store = createStore()
  const user = userEvent.setup()
  const utils = render(
    <Provider store={store}>
      <HydrateAtoms initialValues={{ pages: [], currentPageId: null, defaultTagType: TAG_TYPES.TIME, ...initialValues }}>
        <App />
      </HydrateAtoms>
    </Provider>,
  )
  return { user, store, ...utils }
}

beforeEach(() => {
  localStorage.clear()
})

describe("App - empty state", () => {
  it("shows create page prompt when no pages exist", () => {
    renderApp()
    expect(screen.getByText("Create a page to get started.")).toBeInTheDocument()
    expect(screen.getByText("New Page")).toBeInTheDocument()
  })

  it("creates a page when clicking New Page", async () => {
    const { user } = renderApp()
    await user.click(screen.getByText("New Page"))
    expect(screen.getByPlaceholderText("Give me a title.")).toBeInTheDocument()
    expect(screen.getByText("No notes yet. Add one to get started.")).toBeInTheDocument()
  })
})

describe("App - with a page", () => {
  const page: Page = {
    id: "test-page-1",
    title: "Test Page",
    notes: [],
  }

  it("shows the page title", () => {
    renderApp({ pages: [page], currentPageId: page.id })
    expect(screen.getByDisplayValue("Test Page")).toBeInTheDocument()
  })

  it("adds a note when clicking Add Note", async () => {
    const { user } = renderApp({ pages: [page], currentPageId: page.id })
    await user.click(screen.getByText("Add Note"))
    expect(screen.getByPlaceholderText("Write something here.")).toBeInTheDocument()
  })

  it("can type into a note body", async () => {
    const { user } = renderApp({ pages: [page], currentPageId: page.id })
    await user.click(screen.getByText("Add Note"))
    const textarea = screen.getByPlaceholderText("Write something here.")
    await user.type(textarea, "Hello world")
    expect(textarea).toHaveValue("Hello world")
  })

  it("can rename the page", async () => {
    const { user } = renderApp({ pages: [page], currentPageId: page.id })
    const titleInput = screen.getByDisplayValue("Test Page")
    await user.clear(titleInput)
    await user.type(titleInput, "Renamed")
    expect(titleInput).toHaveValue("Renamed")
  })

  it("shows page in sidebar", () => {
    renderApp({ pages: [page], currentPageId: page.id })
    expect(screen.getByText("Test Page")).toBeInTheDocument()
  })
})

describe("App - note deletion", () => {
  const page: Page = {
    id: "test-page-2",
    title: "Delete Test",
    notes: [
      { id: "note-1", body: "First note", tag: { type: TAG_TYPES.TIME, hours: 10, minutes: 30 } },
      { id: "note-2", body: "Second note", tag: { type: TAG_TYPES.TIME, hours: 11, minutes: 0 } },
    ],
  }

  it("deletes a note via settings", async () => {
    const { user } = renderApp({ pages: [page], currentPageId: page.id })
    expect(screen.getAllByPlaceholderText("Write something here.")).toHaveLength(2)

    // Click the first settings gear, then the trash icon
    const gearButtons = screen.getAllByRole("button").filter((btn) => btn.querySelector("svg.lucide-settings"))
    await user.click(gearButtons[0])

    const trashButtons = screen.getAllByRole("button").filter((btn) => btn.querySelector("svg.lucide-trash-2"))
    await user.click(trashButtons[0])

    expect(screen.getAllByPlaceholderText("Write something here.")).toHaveLength(1)
  })
})

describe("App - multiple pages", () => {
  const pages: Page[] = [
    { id: "p1", title: "Page One", notes: [] },
    { id: "p2", title: "Page Two", notes: [{ id: "n1", body: "Note in page 2", tag: { type: TAG_TYPES.CHECKBOX, checked: false } }] },
  ]

  it("switches between pages", async () => {
    const { user } = renderApp({ pages, currentPageId: "p1" })
    expect(screen.getByDisplayValue("Page One")).toBeInTheDocument()

    // Click Page Two in sidebar
    await user.click(screen.getByText("Page Two"))
    expect(screen.getByDisplayValue("Page Two")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Write something here.")).toHaveValue("Note in page 2")
  })
})
