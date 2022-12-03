import { Request, Response } from "express"
import { TempUserDto } from "./types"
import { getStartApiUrl } from "./inventory"
import axios from "axios"

export const isJsonRequired = (req: Request): boolean => !!req.headers["content-type"]?.includes("application/json")

export const getHint = (index: number, hints: string[]): string => {
  const hint = hints[index]

  if (!hint) {
    throw new Error(`No hint found for index ${index}`)
  }

  return hint
}

export const getRandomHintNumber = (hints: string[]): number => {
  return Math.floor(Math.random() * hints.length)
}

export const getRandomHint = (hints: string[]): string | undefined => {
  const hintIndex = getRandomHintNumber(hints)

  try {
    return getHint(hintIndex, hints)
  } catch (e) {
    return undefined
  }
}

export const sendRandomHint = (hints: string[], res: Response) => {
  const randomHint = getRandomHint(hints)
  if (randomHint) {
    res.setHeader("X-Hint", randomHint)
  }
}

export const getUserLazily =
  (res: Response): (() => Promise<TempUserDto | undefined>) =>
  async (): Promise<TempUserDto | undefined> => {
    if (res.locals.token) {
      try {
        const baseUrl = getStartApiUrl()
        const url = `${baseUrl}/users/me`
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${res.locals.token}`,
          },
        })

        res.locals.user = response.data
      } catch (e) {
        console.warn(e)
      }
    }

    if (res.locals.user) {
      return res.locals.user
    }

    return undefined
  }
