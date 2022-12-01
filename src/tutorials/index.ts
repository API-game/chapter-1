import { Request, Response } from "express"
import { tutorial1Handler } from "./01"
import * as path from "path"
import { tutorial2Handler } from "./02"
import { tutorial3Handler } from "./03"
import { tutorial4Handler } from "./04"

const express = require("express")
const router = express.Router()

const isJsonRequired = (req: Request) => req.headers["content-type"] === "application/json"

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

router.get("/5", (req: Request, res: Response) => {
  res.send(
    "Now let's talk about HTTP methods.\n\nThere are 4 main HTTP methods:\n- GET\n- POST\n- PUT\n- DELETE\n\nTry to change the method of your request to `POST` and send it again."
  )
})

router.post("/5", (req: Request, res: Response) => {
  res.send({
    message: "Great! Now you know how to send POST requests.",
    prevTutorial: "/tutorials/4",
    nextTutorial: "/tutorials/6",
  })
})

router.get("/6", (req: Request, res: Response) => {
  res.send(
    'Now, let\'s try to send some data in the request body.\n\nIn Postman you can do it in `Body` tab.\n\nSelect raw, then JSON format.\n\nThen send the request with your name.\n\nSchema:\n```json\n{"name": "your name"}\n```'
  )
})

router.post("/6", (req: Request, res: Response) => {
  const body = req.body

  if (body && body.name) {
    res.send({
      message: `Great! Now you know how to send data in the request body. Your name is "${body.name}".`,
      prevTutorial: "/tutorials/5",
      nextTutorial: "/tutorials/7",
    })
  } else {
    res.send(
      'You need to send some data in the request body.\n\nIn Postman you can do it in `Body` tab.\n\nSelect raw, then JSON format.\n\nThen send the request with some data in the body.\n\nFor example:\n```json\n{"name": "your name"}\n```'
    )
  }
})

router.get("/7", (req: Request, res: Response) => {
  res.send({
    message: "Now you know the basics of REST API and using Postman.\n\nLet's start a game!",
    prevTutorial: "/tutorials/6",
    nextStep: "/riddles",
  })
})

const views = path.join(__dirname, "")

export { router, views }
