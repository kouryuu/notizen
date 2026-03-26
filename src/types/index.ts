export const TAG_TYPES = {
  TIME: "TIME",
  COLOR: "COLOR",
  CHECKBOX: "CHECKBOX",
} as const

export type TagType = (typeof TAG_TYPES)[keyof typeof TAG_TYPES]

export type TimeTagData = {
  type: typeof TAG_TYPES.TIME
  hours: number
  minutes: number
}

export type ColorTagData = {
  type: typeof TAG_TYPES.COLOR
  color: string
}

export type CheckboxTagData = {
  type: typeof TAG_TYPES.CHECKBOX
  checked: boolean
}

export type Tag = TimeTagData | ColorTagData | CheckboxTagData

export type Note = {
  id: string
  body: string
  tag: Tag
}

export type Page = {
  id: string
  title: string
  notes: Note[]
}
