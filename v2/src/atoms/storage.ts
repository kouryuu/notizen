import type { Page } from "@/types"

const STORAGE_KEY = "notizen-pages"

export function loadPages(): Page[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Page[]
  } catch {
    return []
  }
}

export function savePages(pages: Page[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages))
}
