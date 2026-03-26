import type {
  Tag,
  TagType,
  TimeTagData,
  ColorTagData,
  CheckboxTagData,
  CodeTagData,
  SecretTagData,
  RemindTagData,
} from "@/types"
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
    case TAG_TYPES.CODE:
      return {
        type: TAG_TYPES.CODE,
        language: "javascript",
      }
    case TAG_TYPES.SECRET:
      return {
        type: TAG_TYPES.SECRET,
        passwordHash: "",
        unlocked: true,
      }
    case TAG_TYPES.REMIND:
      return {
        type: TAG_TYPES.REMIND,
        minutes: 0,
        seconds: 1,
        fired: false,
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

export function changeLanguage(tag: CodeTagData, language: string): CodeTagData {
  return { ...tag, language }
}

export function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash |= 0
  }
  return hash.toString(36)
}

export function setSecretPassword(tag: SecretTagData, password: string): SecretTagData {
  return { ...tag, passwordHash: simpleHash(password), unlocked: false }
}

export function unlockSecret(tag: SecretTagData, password: string): SecretTagData {
  if (simpleHash(password) === tag.passwordHash) {
    return { ...tag, unlocked: true }
  }
  return tag
}

export function lockSecret(tag: SecretTagData): SecretTagData {
  if (tag.passwordHash === "") return tag
  return { ...tag, unlocked: false }
}

export function incrementRemindMinute(tag: RemindTagData): RemindTagData {
  return { ...tag, minutes: tag.minutes === 59 ? 0 : tag.minutes + 1, fired: false }
}

export function decrementRemindMinute(tag: RemindTagData): RemindTagData {
  return { ...tag, minutes: tag.minutes === 0 ? 59 : tag.minutes - 1, fired: false }
}

export function incrementRemindSecond(tag: RemindTagData): RemindTagData {
  return { ...tag, seconds: tag.seconds === 59 ? 0 : tag.seconds + 1, fired: false }
}

export function decrementRemindSecond(tag: RemindTagData): RemindTagData {
  return { ...tag, seconds: tag.seconds === 0 ? 59 : tag.seconds - 1, fired: false }
}

export function fireReminder(tag: RemindTagData): RemindTagData {
  return { ...tag, fired: true }
}

export function resetReminder(tag: RemindTagData): RemindTagData {
  return { ...tag, fired: false }
}

export function remindTotalSeconds(tag: RemindTagData): number {
  return tag.minutes * 60 + tag.seconds
}
