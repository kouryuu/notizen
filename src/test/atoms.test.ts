import { createStore } from "jotai"
import {
  pagesAtom,
  currentPageIdAtom,
  currentPageAtom,
  currentNotesAtom,
  defaultTagTypeAtom,
  addPageAtom,
  renamePageAtom,
  switchPageAtom,
  deletePageAtom,
  addNoteAtom,
  deleteNoteAtom,
  updateNoteBodyAtom,
  updateNoteTagAtom,
  changeNoteTagTypeAtom,
} from "@/atoms"
import { TAG_TYPES } from "@/types"

function freshStore() {
  const store = createStore()
  store.set(pagesAtom, [])
  store.set(currentPageIdAtom, null)
  store.set(defaultTagTypeAtom, TAG_TYPES.TIME)
  return store
}

beforeEach(() => {
  localStorage.clear()
})

describe("page management", () => {
  it("starts empty", () => {
    const store = freshStore()
    expect(store.get(pagesAtom)).toEqual([])
    expect(store.get(currentPageIdAtom)).toBeNull()
    expect(store.get(currentPageAtom)).toBeNull()
  })

  it("addPage creates a page and selects it", () => {
    const store = freshStore()
    store.set(addPageAtom)
    const pages = store.get(pagesAtom)
    expect(pages).toHaveLength(1)
    expect(store.get(currentPageIdAtom)).toBe(pages[0].id)
    expect(pages[0].notes).toEqual([])
  })

  it("addPage persists to localStorage", () => {
    const store = freshStore()
    store.set(addPageAtom)
    const stored = JSON.parse(localStorage.getItem("notizen-pages")!)
    expect(stored).toHaveLength(1)
  })

  it("renamePage updates the current page title", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(renamePageAtom, "My Notes")
    expect(store.get(currentPageAtom)!.title).toBe("My Notes")
  })

  it("switchPage changes the current page", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(addPageAtom)
    const pages = store.get(pagesAtom)
    store.set(switchPageAtom, pages[0].id)
    expect(store.get(currentPageIdAtom)).toBe(pages[0].id)
  })

  it("deletePage removes the page and selects another", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(addPageAtom)
    const pages = store.get(pagesAtom)
    const firstId = pages[0].id
    const secondId = pages[1].id
    store.set(switchPageAtom, firstId)
    store.set(deletePageAtom, firstId)
    expect(store.get(pagesAtom)).toHaveLength(1)
    expect(store.get(currentPageIdAtom)).toBe(secondId)
  })

  it("deletePage last page leaves null", () => {
    const store = freshStore()
    store.set(addPageAtom)
    const pageId = store.get(pagesAtom)[0].id
    store.set(deletePageAtom, pageId)
    expect(store.get(pagesAtom)).toHaveLength(0)
    expect(store.get(currentPageIdAtom)).toBeNull()
  })
})

describe("note management", () => {
  it("addNote adds a note to the current page", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(addNoteAtom)
    const notes = store.get(currentNotesAtom)
    expect(notes).toHaveLength(1)
    expect(notes[0].body).toBe("")
    expect(notes[0].tag.type).toBe(TAG_TYPES.TIME)
  })

  it("deleteNote removes a note", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(addNoteAtom)
    store.set(addNoteAtom)
    const noteId = store.get(currentNotesAtom)[0].id
    store.set(deleteNoteAtom, noteId)
    expect(store.get(currentNotesAtom)).toHaveLength(1)
  })

  it("updateNoteBody changes note text", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(addNoteAtom)
    const noteId = store.get(currentNotesAtom)[0].id
    store.set(updateNoteBodyAtom, { noteId, body: "Hello world" })
    expect(store.get(currentNotesAtom)[0].body).toBe("Hello world")
  })

  it("updateNoteTag replaces the tag", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(addNoteAtom)
    const noteId = store.get(currentNotesAtom)[0].id
    store.set(updateNoteTagAtom, {
      noteId,
      tag: { type: TAG_TYPES.COLOR, color: "#00FF00" },
    })
    const tag = store.get(currentNotesAtom)[0].tag
    expect(tag.type).toBe(TAG_TYPES.COLOR)
    if (tag.type === TAG_TYPES.COLOR) {
      expect(tag.color).toBe("#00FF00")
    }
  })

  it("changeNoteTagType replaces tag with new type and updates default", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(addNoteAtom)
    const noteId = store.get(currentNotesAtom)[0].id
    store.set(changeNoteTagTypeAtom, { noteId, tagType: TAG_TYPES.CHECKBOX })
    expect(store.get(currentNotesAtom)[0].tag.type).toBe(TAG_TYPES.CHECKBOX)
    expect(store.get(defaultTagTypeAtom)).toBe(TAG_TYPES.CHECKBOX)
  })

  it("changeNoteTagType supports CODE with language default", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(addNoteAtom)
    const noteId = store.get(currentNotesAtom)[0].id
    store.set(changeNoteTagTypeAtom, { noteId, tagType: TAG_TYPES.CODE })
    const tag = store.get(currentNotesAtom)[0].tag
    expect(tag.type).toBe(TAG_TYPES.CODE)
    if (tag.type === TAG_TYPES.CODE) {
      expect(tag.language).toBe("javascript")
    }
  })

  it("changeNoteTagType supports SECRET with unlocked default", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(addNoteAtom)
    const noteId = store.get(currentNotesAtom)[0].id
    store.set(changeNoteTagTypeAtom, { noteId, tagType: TAG_TYPES.SECRET })
    const tag = store.get(currentNotesAtom)[0].tag
    expect(tag.type).toBe(TAG_TYPES.SECRET)
    if (tag.type === TAG_TYPES.SECRET) {
      expect(tag.passwordHash).toBe("")
      expect(tag.unlocked).toBe(true)
    }
  })

  it("changeNoteTagType supports REMIND with 00:01 default", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(addNoteAtom)
    const noteId = store.get(currentNotesAtom)[0].id
    store.set(changeNoteTagTypeAtom, { noteId, tagType: TAG_TYPES.REMIND })
    const tag = store.get(currentNotesAtom)[0].tag
    expect(tag.type).toBe(TAG_TYPES.REMIND)
    if (tag.type === TAG_TYPES.REMIND) {
      expect(tag.minutes).toBe(0)
      expect(tag.seconds).toBe(1)
      expect(tag.fired).toBe(false)
    }
  })

  it("notes persist to localStorage", () => {
    const store = freshStore()
    store.set(addPageAtom)
    store.set(addNoteAtom)
    store.set(updateNoteBodyAtom, {
      noteId: store.get(currentNotesAtom)[0].id,
      body: "persisted",
    })
    const stored = JSON.parse(localStorage.getItem("notizen-pages")!)
    expect(stored[0].notes[0].body).toBe("persisted")
  })
})
