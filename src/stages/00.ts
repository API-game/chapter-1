import { Request, Response } from "express"
import { getRandomHint } from "../utils"

function sendRandomHint(hints: string[], res: Response) {
  const randomHint = getRandomHint(hints)
  if (randomHint) {
    res.setHeader("X-Hint", randomHint)
  }
}

export const beachRockHandler = (req: Request, res: Response) => {
  const hints = [
    `Look for an endpoint on each stage where you can find items.`,
    `Every endpoint you visit can give you clues about the next step.`,
    `Check the HTTP request method for each endpoint.`,
  ]

  sendRandomHint(hints, res)
  res.render("stages/00-beach", { title: "Beach - Rock" })
}

export const beachItemsHandler = (req: Request, res: Response) => {
  const hints: string[] = []

  sendRandomHint(hints, res)
  res.render("stages/00-beach-items", { title: "Beach - Items" })
}

export const beachItemNoteHandler = (req: Request, res: Response) => {
  const hints: string[] = [
    `There is an endpoint /inventory which you can use to add items to your inventory.`,
    `You need to send a POST request to the endpoint /inventory.`,
    `Include the item's resource path in the body of your request.`,
  ]

  sendRandomHint(hints, res)
  res.render("stages/00-beach-items-note", { title: "Beach - Items - note" })
}
