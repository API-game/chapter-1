import { Request, Response } from "express"
import { SuccessJsonResponseDto } from "../types"

export const riddle2Handler = (req: Request, res: Response) => {
  const data: SuccessJsonResponseDto = {
    title: "Riddle 2",
    message: "That was the last riddle for now!",
  }
  res.send(data)
}
