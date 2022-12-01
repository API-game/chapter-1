import { Request, Response } from "express"
import { SuccessJsonResponseDto } from "../types"

export const tutorial5GetHandler = (req: Request, res: Response) => {
  res.render("tutorials/05", { title: "Tutorial 5 - HTTP methods" })
}

export const tutorial5PostHandler = (req: Request, res: Response) => {
  const data: SuccessJsonResponseDto = {
    title: "Tutorial 5 - HTTP methods",
    message: "Great! Now you know how to send POST requests.",
    prevPage: "/tutorials/4",
    nextPage: "/tutorials/6",
  }

  res.send(data)
}
