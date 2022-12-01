import { Request, Response } from "express"
import { TutorialsSuccessJsonResponseDto } from "../types"

export const tutorial5GetHandler = (req: Request, res: Response) => {
  res.render("tutorials/05", { title: "Tutorial 5 - HTTP methods" })
}

export const tutorial5PostHandler = (req: Request, res: Response) => {
  const data: TutorialsSuccessJsonResponseDto = {
    title: "Tutorial 5 - HTTP methods",
    message: "Great! Now you know how to send POST requests.",
    prevTutorial: "/tutorials/4",
    nextTutorial: "/tutorials/6",
  }

  res.send(data)
}
