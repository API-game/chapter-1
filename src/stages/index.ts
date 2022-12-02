import { beachItemNoteHandler, beachItemsHandler, beachRockHandler } from "./00"
import { Request, Response } from "express"

const express = require("express")
export const router = express.Router()

const stagesHandler = (req: Request, res: Response) => {
  res.redirect("/stages/beach")
}

router.get("/", stagesHandler)

router.get("/beach", beachRockHandler)
router.get("/beach/items", beachItemsHandler)
router.get("/beach/items/note", beachItemNoteHandler)
