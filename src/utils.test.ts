import { Request } from "express"
import { getHint, getRandomHint, getSlugFromItemResourcePath, isJsonRequired } from "./utils"

describe("isJsonRequired", () => {
  it("should return true for application/json", () => {
    const req = {
      headers: {
        "content-type": "application/json",
      },
    } as Request
    expect(isJsonRequired(req)).toBe(true)
  })

  it("should return true for application/json; charset=utf-8", () => {
    const req = {
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    } as Request
    expect(isJsonRequired(req)).toBe(true)
  })

  it("should return false for text/html", () => {
    const req = {
      headers: {
        "content-type": "text/html",
      },
    } as Request
    expect(isJsonRequired(req)).toBe(false)
  })
})

describe("Hints", () => {
  const hints = [
    `This is the first stage, so you should be looking for something related to the number "1".`,
    `"GET" is an HTTP method that indicates that you're retrieving information from a server.`,
  ]

  it("should return a hint", () => {
    expect(getHint(0, hints)).toBe(hints[0])
    expect(getHint(1, hints)).toBe(hints[1])
  })

  it("should return a random hint", () => {
    expect(hints).toContain(getRandomHint(hints))
  })

  it("should return undefined if no hints are available", () => {
    expect(getRandomHint([])).toBeUndefined()
  })
})

describe("getSlugFromItemResourcePath", () => {
  it("should return beach-note for the resource path /stages/beach/items/note", () => {
    const item = "/stages/beach/items/note"

    expect(getSlugFromItemResourcePath(item)).toBe("beach-note")
  })

  it("should throw if no stage nor items is found in the resource path", () => {
    const item = "/foo/bar"

    expect(() => getSlugFromItemResourcePath(item)).toThrow()
  })
})
