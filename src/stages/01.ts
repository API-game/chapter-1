import { Request, Response } from "express"
import { ErrorJsonResponseDto, SuccessJsonResponseDto } from "../types"

const question = ""
const hints = []
const answer = ""

export const stage1GetHandler = (req: Request, res: Response) => {
  res.setHeader("X-Answer", answer)
  res.setHeader("Content-Type", "plain/text")
  res.send(question)
}

export const stage1PostHandler = (req: Request, res: Response) => {
  const userAnswer = req.body.answer

  if (!userAnswer) {
    res.status(400)
    res.setHeader("X-Hint", "Use `answer` key in the request body.")
    const errorData: ErrorJsonResponseDto = {
      error: { message: "You need to send an answer in the request body.", code: "NO_ANSWER" },
    }
    res.send(errorData)
    return
  }

  if (answer === userAnswer) {
    const data: SuccessJsonResponseDto = {
      title: "stage 1",
      message: "Congratulations! You have solved the first stage!",
      nextPage: "/stages/2",
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
