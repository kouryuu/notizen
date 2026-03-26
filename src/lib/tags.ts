import type { Tag, TagType, TimeTagData, ColorTagData, CheckboxTagData } from "@/types"
import { TAG_TYPES } from "@/types"

export function createTag(type: TagType): Tag {
  switch (type) {
    case TAG_TYPES.TIME:
      return {
        type: TAG_TYPES.TIME,
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
      }
    case TAG_TYPES.COLOR:
      return {
        type: TAG_TYPES.COLOR,
        color: "#FF69B4",
      }
    case TAG_TYPES.CHECKBOX:
      return {
        type: TAG_TYPES.CHECKBOX,
        checked: false,
      }
  }
}

export function incrementHour(tag: TimeTagData): TimeTagData {
  return { ...tag, hours: tag.hours === 23 ? 0 : tag.hours + 1 }
}

export function decrementHour(tag: TimeTagData): TimeTagData {
  return { ...tag, hours: tag.hours === 0 ? 23 : tag.hours - 1 }
}

export function incrementMinute(tag: TimeTagData): TimeTagData {
  return { ...tag, minutes: tag.minutes === 59 ? 0 : tag.minutes + 1 }
}

export function decrementMinute(tag: TimeTagData): TimeTagData {
  return { ...tag, minutes: tag.minutes === 0 ? 59 : tag.minutes - 1 }
}

export function changeColor(tag: ColorTagData, color: string): ColorTagData {
  return { ...tag, color }
}

export function toggleCheckbox(tag: CheckboxTagData): CheckboxTagData {
  return { ...tag, checked: !tag.checked }
}

export function zeroPad(n: number): string {
  return n > 9 ? String(n) : `0${n}`
}
