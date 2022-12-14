import { Request, Response } from "express"
import { SuccessJsonResponseDto } from "../types"

export const tutorial7Handler = (req: Request, res: Response) => {
  const data: SuccessJsonResponseDto = {
    title: "Tutorial 7",
    message: "Now you know the basics of REST API and using Postman. Let's start a game!",
    prevPage: "/tutorials/6",
    nextPage: "/stages",
  }

  res.send(data)
}
