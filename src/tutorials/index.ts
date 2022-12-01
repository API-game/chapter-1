import { Request, Response } from "express"
import { tutorial1Handler } from "./01"
import * as path from "path"
import { tutorial2Handler } from "./02"
import { tutorial3Handler } from "./03"
import { tutorial4Handler } from "./04"
import { isJsonRequired } from "../utils"
import { tutorial5GetHandler, tutorial5PostHandler } from "./05"
import { tutorial6GetHandler, tutorial6PostHandler } from "./06"
import { tutorial7Handler } from "./07"

const express = require("express")
const router = express.Router()

export const indexRoute = (req: Request, res: Response) => {
  const tutorials = [
    {
      id: 1,
      title: "How to get help?",
    },
    {
      id: 2,
      title: "Headers",
    },
    {
      id: 3,
      title: "Custom headers",
    },
    {
      id: 4,
      title: "Content-Type header",
    },
  ]
  const message = "This is a list of available tutorials"

  if (isJsonRequired(req)) {
    res.send({
      message,
      tutorials: tutorials.map((tutorial) => ({
        ...tutorial,
        path: `/tutorials/${tutorial.id}`,
      })),
    })
  } else {
    res.render("tutorials/index", { message, tutorials })
  }
}

router.get("/", indexRoute)

router.get("/1", tutorial1Handler)
router.get("/2", tutorial2Handler)
router.get("/3", tutorial3Handler)
router.get("/4", tutorial4Handler)

router.get("/5", tutorial5GetHandler)
router.post("/5", tutorial5PostHandler)

router.get("/6", tutorial6GetHandler)
router.post("/6", tutorial6PostHandler)

router.get("/7", tutorial7Handler)

const views = path.join(__dirname, "")

export { router, views }
