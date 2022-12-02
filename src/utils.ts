import { Request } from "express"

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
