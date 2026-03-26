import {
  createTag,
  incrementHour,
  decrementHour,
  incrementMinute,
  decrementMinute,
  changeColor,
  toggleCheckbox,
  zeroPad,
  changeLanguage,
  simpleHash,
  setSecretPassword,
  unlockSecret,
  lockSecret,
  incrementRemindMinute,
  decrementRemindMinute,
  incrementRemindSecond,
  decrementRemindSecond,
  fireReminder,
  resetReminder,
  remindTotalSeconds,
} from "@/lib/tags"
import { TAG_TYPES } from "@/types"
import type {
  TimeTagData,
  ColorTagData,
  CheckboxTagData,
  CodeTagData,
  SecretTagData,
  RemindTagData,
} from "@/types"

describe("createTag", () => {
  it("creates a TIME tag with current hours/minutes", () => {
    const tag = createTag(TAG_TYPES.TIME)
    expect(tag.type).toBe(TAG_TYPES.TIME)
    expect((tag as TimeTagData).hours).toBeGreaterThanOrEqual(0)
    expect((tag as TimeTagData).minutes).toBeGreaterThanOrEqual(0)
  })

  it("creates a COLOR tag with default pink", () => {
    const tag = createTag(TAG_TYPES.COLOR)
    expect(tag.type).toBe(TAG_TYPES.COLOR)
    expect((tag as ColorTagData).color).toBe("#FF69B4")
  })

  it("creates a CHECKBOX tag unchecked", () => {
    const tag = createTag(TAG_TYPES.CHECKBOX)
    expect(tag.type).toBe(TAG_TYPES.CHECKBOX)
    expect((tag as CheckboxTagData).checked).toBe(false)
  })

  it("creates a CODE tag with javascript default", () => {
    const tag = createTag(TAG_TYPES.CODE)
    expect(tag.type).toBe(TAG_TYPES.CODE)
    expect((tag as CodeTagData).language).toBe("javascript")
  })

  it("creates a SECRET tag unlocked with empty hash", () => {
    const tag = createTag(TAG_TYPES.SECRET)
    expect(tag.type).toBe(TAG_TYPES.SECRET)
    expect((tag as SecretTagData).passwordHash).toBe("")
    expect((tag as SecretTagData).unlocked).toBe(true)
  })

  it("creates a REMIND tag with 00:01 default", () => {
    const tag = createTag(TAG_TYPES.REMIND)
    expect(tag.type).toBe(TAG_TYPES.REMIND)
    expect((tag as RemindTagData).minutes).toBe(0)
    expect((tag as RemindTagData).seconds).toBe(1)
    expect((tag as RemindTagData).fired).toBe(false)
  })
})

describe("TimeTag helpers", () => {
  const base: TimeTagData = { type: TAG_TYPES.TIME, hours: 10, minutes: 30 }

  it("incrementHour wraps at 23", () => {
    expect(incrementHour(base).hours).toBe(11)
    expect(incrementHour({ ...base, hours: 23 }).hours).toBe(0)
  })

  it("decrementHour wraps at 0", () => {
    expect(decrementHour(base).hours).toBe(9)
    expect(decrementHour({ ...base, hours: 0 }).hours).toBe(23)
  })

  it("incrementMinute wraps at 59", () => {
    expect(incrementMinute(base).minutes).toBe(31)
    expect(incrementMinute({ ...base, minutes: 59 }).minutes).toBe(0)
  })

  it("decrementMinute wraps at 0", () => {
    expect(decrementMinute(base).minutes).toBe(29)
    expect(decrementMinute({ ...base, minutes: 0 }).minutes).toBe(59)
  })

  it("does not mutate the original tag", () => {
    const result = incrementHour(base)
    expect(result).not.toBe(base)
    expect(base.hours).toBe(10)
  })
})

describe("ColorTag helpers", () => {
  const base: ColorTagData = { type: TAG_TYPES.COLOR, color: "#FF69B4" }

  it("changes color", () => {
    expect(changeColor(base, "#00FF00").color).toBe("#00FF00")
  })

  it("does not mutate the original", () => {
    changeColor(base, "#000000")
    expect(base.color).toBe("#FF69B4")
  })
})

describe("CheckboxTag helpers", () => {
  const base: CheckboxTagData = { type: TAG_TYPES.CHECKBOX, checked: false }

  it("toggles checked", () => {
    expect(toggleCheckbox(base).checked).toBe(true)
    expect(toggleCheckbox({ ...base, checked: true }).checked).toBe(false)
  })

  it("does not mutate the original", () => {
    toggleCheckbox(base)
    expect(base.checked).toBe(false)
  })
})

describe("CodeTag helpers", () => {
  const base: CodeTagData = { type: TAG_TYPES.CODE, language: "javascript" }

  it("changes language", () => {
    expect(changeLanguage(base, "python").language).toBe("python")
  })

  it("does not mutate the original", () => {
    changeLanguage(base, "rust")
    expect(base.language).toBe("javascript")
  })
})

describe("SecretTag helpers", () => {
  it("simpleHash produces consistent output", () => {
    expect(simpleHash("test")).toBe(simpleHash("test"))
    expect(simpleHash("a")).not.toBe(simpleHash("b"))
  })

  it("simpleHash returns empty string hash for empty input", () => {
    expect(simpleHash("")).toBe("0")
  })

  it("setSecretPassword hashes and locks", () => {
    const base: SecretTagData = { type: TAG_TYPES.SECRET, passwordHash: "", unlocked: true }
    const result = setSecretPassword(base, "mypass")
    expect(result.passwordHash).not.toBe("")
    expect(result.unlocked).toBe(false)
  })

  it("unlockSecret with correct password unlocks", () => {
    const base: SecretTagData = { type: TAG_TYPES.SECRET, passwordHash: "", unlocked: true }
    const locked = setSecretPassword(base, "mypass")
    const unlocked = unlockSecret(locked, "mypass")
    expect(unlocked.unlocked).toBe(true)
  })

  it("unlockSecret with wrong password stays locked", () => {
    const base: SecretTagData = { type: TAG_TYPES.SECRET, passwordHash: "", unlocked: true }
    const locked = setSecretPassword(base, "mypass")
    const still = unlockSecret(locked, "wrong")
    expect(still.unlocked).toBe(false)
  })

  it("lockSecret locks a tag with a password", () => {
    const tag: SecretTagData = { type: TAG_TYPES.SECRET, passwordHash: "abc", unlocked: true }
    expect(lockSecret(tag).unlocked).toBe(false)
  })

  it("lockSecret does nothing when no password set", () => {
    const tag: SecretTagData = { type: TAG_TYPES.SECRET, passwordHash: "", unlocked: true }
    expect(lockSecret(tag).unlocked).toBe(true)
  })

  it("does not mutate the original", () => {
    const base: SecretTagData = { type: TAG_TYPES.SECRET, passwordHash: "", unlocked: true }
    setSecretPassword(base, "pass")
    expect(base.passwordHash).toBe("")
    expect(base.unlocked).toBe(true)
  })
})

describe("RemindTag helpers", () => {
  const base: RemindTagData = { type: TAG_TYPES.REMIND, minutes: 5, seconds: 30, fired: false }

  it("incrementRemindMinute wraps at 59", () => {
    expect(incrementRemindMinute(base).minutes).toBe(6)
    expect(incrementRemindMinute({ ...base, minutes: 59 }).minutes).toBe(0)
  })

  it("decrementRemindMinute wraps at 0", () => {
    expect(decrementRemindMinute(base).minutes).toBe(4)
    expect(decrementRemindMinute({ ...base, minutes: 0 }).minutes).toBe(59)
  })

  it("incrementRemindSecond wraps at 59", () => {
    expect(incrementRemindSecond(base).seconds).toBe(31)
    expect(incrementRemindSecond({ ...base, seconds: 59 }).seconds).toBe(0)
  })

  it("decrementRemindSecond wraps at 0", () => {
    expect(decrementRemindSecond(base).seconds).toBe(29)
    expect(decrementRemindSecond({ ...base, seconds: 0 }).seconds).toBe(59)
  })

  it("increment/decrement resets fired flag", () => {
    const fired = { ...base, fired: true }
    expect(incrementRemindMinute(fired).fired).toBe(false)
    expect(decrementRemindSecond(fired).fired).toBe(false)
  })

  it("fireReminder sets fired to true", () => {
    expect(fireReminder(base).fired).toBe(true)
  })

  it("resetReminder clears fired", () => {
    const fired = { ...base, fired: true }
    expect(resetReminder(fired).fired).toBe(false)
  })

  it("remindTotalSeconds calculates correctly", () => {
    expect(remindTotalSeconds(base)).toBe(330)
    expect(remindTotalSeconds({ ...base, minutes: 0, seconds: 0 })).toBe(0)
    expect(remindTotalSeconds({ ...base, minutes: 1, seconds: 0 })).toBe(60)
  })

  it("does not mutate the original", () => {
    fireReminder(base)
    expect(base.fired).toBe(false)
    incrementRemindMinute(base)
    expect(base.minutes).toBe(5)
  })
})

describe("zeroPad", () => {
  it("pads single digits", () => {
    expect(zeroPad(0)).toBe("00")
    expect(zeroPad(5)).toBe("05")
    expect(zeroPad(9)).toBe("09")
  })

  it("does not pad double digits", () => {
    expect(zeroPad(10)).toBe("10")
    expect(zeroPad(23)).toBe("23")
  })
})
