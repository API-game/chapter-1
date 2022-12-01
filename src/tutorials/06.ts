import { Request, Response } from "express"
import { ErrorJsonResponseDto, TutorialsSuccessJsonResponseDto } from "../types"

export const tutorial6GetHandler = (req: Request, res: Response) => {
  res.render("tutorials/06", { title: "Tutorial 6 - POST request" })
}

export const tutorial6PostHandler = (req: Request, res: Response) => {
  const body = req.body

  const isRequestValid = body && body.name

  if (isRequestValid) {
    const data: TutorialsSuccessJsonResponseDto = {
      title: "Tutorial 6 - POST request",
      message: `Awesome, ${body.name}! Now you know how to send data in the request body.`,
      prevTutorial: "/tutorials/5",
      nextTutorial: "/tutorials/7",
    }
    res.send(data)
  } else {
    const errorData: ErrorJsonResponseDto = {
      error: {
        message: "You need to send a name in the request body.",
        code: "NAME_NOT_FOUND",
      },
    }

    res.status(400).send(errorData)
  }
}
