import { atom } from "jotai"
import type { Page, TagType, Note } from "@/types"
import { TAG_TYPES } from "@/types"
import { createTag } from "@/lib/tags"
import { loadPages, savePages } from "@/atoms/storage"

// --- Persistence helper ---
function generateId(): string {
  return crypto.randomUUID()
}

// --- Base atoms ---
const storedPages = loadPages()

export const pagesAtom = atom<Page[]>(storedPages)

export const currentPageIdAtom = atom<string | null>(
  storedPages.length > 0 ? storedPages[0].id : null,
)

export const defaultTagTypeAtom = atom<TagType>(TAG_TYPES.TIME)

// --- Derived atoms ---
export const currentPageAtom = atom((get) => {
  const pages = get(pagesAtom)
  const id = get(currentPageIdAtom)
  return pages.find((p) => p.id === id) ?? null
})

export const currentNotesAtom = atom((get) => {
  const page = get(currentPageAtom)
  return page?.notes ?? []
})

// --- Write atoms (actions) ---

export const addPageAtom = atom(null, (get, set) => {
  const pages = get(pagesAtom)
  const newPage: Page = {
    id: generateId(),
    title: new Date().toDateString(),
    notes: [],
  }
  const next = [...pages, newPage]
  set(pagesAtom, next)
  set(currentPageIdAtom, newPage.id)
  savePages(next)
})

export const renamePageAtom = atom(null, (get, set, title: string) => {
  const pageId = get(currentPageIdAtom)
  if (!pageId) return
  const next = get(pagesAtom).map((p) => (p.id === pageId ? { ...p, title } : p))
  set(pagesAtom, next)
  savePages(next)
})

export const switchPageAtom = atom(null, (_get, set, pageId: string) => {
  set(currentPageIdAtom, pageId)
})

export const deletePageAtom = atom(null, (get, set, pageId: string) => {
  const pages = get(pagesAtom).filter((p) => p.id !== pageId)
  set(pagesAtom, pages)
  if (get(currentPageIdAtom) === pageId) {
    set(currentPageIdAtom, pages.length > 0 ? pages[0].id : null)
  }
  savePages(pages)
})

// --- Note actions ---

function updateCurrentPage(
  get: (a: typeof pagesAtom) => Page[],
  set: (a: typeof pagesAtom, v: Page[]) => void,
  pageId: string | null,
  updater: (page: Page) => Page,
) {
  if (!pageId) return
  const next = get(pagesAtom).map((p) => (p.id === pageId ? updater(p) : p))
  set(pagesAtom, next)
  savePages(next)
}

export const addNoteAtom = atom(null, (get, set) => {
  const pageId = get(currentPageIdAtom)
  const tagType = get(defaultTagTypeAtom)
  const newNote: Note = {
    id: generateId(),
    body: "",
    tag: createTag(tagType),
  }
  updateCurrentPage(get, set, pageId, (page) => ({
    ...page,
    notes: [...page.notes, newNote],
  }))
})

export const deleteNoteAtom = atom(null, (get, set, noteId: string) => {
  const pageId = get(currentPageIdAtom)
  updateCurrentPage(get, set, pageId, (page) => ({
    ...page,
    notes: page.notes.filter((n) => n.id !== noteId),
  }))
})

export const updateNoteBodyAtom = atom(
  null,
  (get, set, { noteId, body }: { noteId: string; body: string }) => {
    const pageId = get(currentPageIdAtom)
    updateCurrentPage(get, set, pageId, (page) => ({
      ...page,
      notes: page.notes.map((n) => (n.id === noteId ? { ...n, body } : n)),
    }))
  },
)

export const updateNoteTagAtom = atom(
  null,
  (get, set, { noteId, tag }: { noteId: string; tag: Note["tag"] }) => {
    const pageId = get(currentPageIdAtom)
    updateCurrentPage(get, set, pageId, (page) => ({
      ...page,
      notes: page.notes.map((n) => (n.id === noteId ? { ...n, tag } : n)),
    }))
  },
)

export const changeNoteTagTypeAtom = atom(
  null,
  (get, set, { noteId, tagType }: { noteId: string; tagType: TagType }) => {
    const pageId = get(currentPageIdAtom)
    const newTag = createTag(tagType)
    updateCurrentPage(get, set, pageId, (page) => ({
      ...page,
      notes: page.notes.map((n) => (n.id === noteId ? { ...n, tag: newTag } : n)),
    }))
    set(defaultTagTypeAtom, tagType)
  },
)
