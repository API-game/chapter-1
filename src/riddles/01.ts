import { Request, Response } from "express"
import { ErrorJsonResponseDto, SuccessJsonResponseDto } from "../types"

export const riddle1answers = ["A duck's opinion.", "One leg is both the same."]

export const riddle1GetHandler = (req: Request, res: Response) => {
  const answer = riddle1answers[Math.floor(Math.random() * riddle1answers.length)]

  res.setHeader("X-Answer", answer)
  res.setHeader("Content-Type", "plain/text")
  res.send("What is the difference between a duck?")
}

export const riddle1PostHandler = (req: Request, res: Response) => {
  const answer = req.body.answer

  if (!answer) {
    res.status(400)
    res.setHeader("X-Hint", "Use `answer` key in the request body.")
    const errorData: ErrorJsonResponseDto = {
      error: { message: "You need to send an answer in the request body.", code: "NO_ANSWER" },
    }
    res.send(errorData)
    return
  }

  if (riddle1answers.includes(answer)) {
    const data: SuccessJsonResponseDto = {
      title: "Riddle 1",
      message: "Congratulations! You have solved the first riddle!",
      nextPage: "/riddles/2",
    }
    res.send(data)
  } else {
    const errorData: ErrorJsonResponseDto = {
      error: {
        message: "Sorry, that's not the right answer.",
        code: "WRONG_ANSWER",
      },
    }
    res.status(400).send(errorData)
  }
}
