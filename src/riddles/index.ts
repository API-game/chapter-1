import { Request, Response } from "express"
import * as path from "path"

const express = require("express")
const router = express.Router()

router.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome to the game!\n\nTo solve the riddle you need to send a request to the specific endpoint.\n\nFor example, to start solving the first riddle you need to send a GET request to `/riddles/1`.\n\nGood luck!"
  )
})

const riddle1answers = ["A duck's opinion.", "One leg is both the same."]
router.get("/1", (req: Request, res: Response) => {
  res.setHeader("X-Answer", riddle1answers[1])
  res.send("What is the difference between a duck?\n\nSend it over.")
})

router.post("/1", (req: Request, res: Response) => {
  const answer = req.body.answer

  // Check if there is an answer
  if (!answer) {
    res.status(400)
    res.setHeader("X-Hint", "Use `answer` key in the request body.")
    res.send({ error: { message: "You need to send an answer in the request body.", code: "NO_ANSWER" } })
    return
  }

  if (riddle1answers.includes(answer)) {
    res.send({
      message: "Great! You solved the first riddle!",
      nextStep: "/riddles/2",
    })
  } else {
    res.send({
      error: {
        message: "Sorry, that's not the right answer.",
        code: "WRONG_ANSWER",
      },
    })
  }
})

router.get("/2", (req: Request, res: Response) => {
  res.send({ message: "That was the last riddle for now!", nextStep: "/final" })
})

const views = path.join(__dirname, "")

export { router, views }
