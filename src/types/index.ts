export const TAG_TYPES = {
  TIME: "TIME",
  COLOR: "COLOR",
  CHECKBOX: "CHECKBOX",
  CODE: "CODE",
  SECRET: "SECRET",
  REMIND: "REMIND",
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

export type CodeTagData = {
  type: typeof TAG_TYPES.CODE
  language: string
}

export type SecretTagData = {
  type: typeof TAG_TYPES.SECRET
  passwordHash: string
  unlocked: boolean
}

export type RemindTagData = {
  type: typeof TAG_TYPES.REMIND
  minutes: number
  seconds: number
  fired: boolean
}

export type Tag =
  | TimeTagData
  | ColorTagData
  | CheckboxTagData
  | CodeTagData
  | SecretTagData
  | RemindTagData

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
