import {
  createTag,
  incrementHour,
  decrementHour,
  incrementMinute,
  decrementMinute,
  changeColor,
  toggleCheckbox,
  zeroPad,
} from "@/lib/tags"
import { TAG_TYPES } from "@/types"
import type { TimeTagData, ColorTagData, CheckboxTagData } from "@/types"

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
