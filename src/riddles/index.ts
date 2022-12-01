import { Request, Response } from "express"
import * as path from "path"
import { indexHandler } from "./00"
import { riddle1GetHandler, riddle1PostHandler } from "./01"

const express = require("express")
const router = express.Router()

router.get("/", indexHandler)

router.get("/1", riddle1GetHandler)
router.post("/1", riddle1PostHandler)

router.get("/2", (req: Request, res: Response) => {
  res.send({ message: "That was the last riddle for now!", nextStep: "/final" })
})

const views = path.join(__dirname, "")

export { router, views }
