import { Request } from "express"
import { isJsonRequired } from "./utils"

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
