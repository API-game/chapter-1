import { Request, Response } from "express"
import { SuccessJsonResponseDto } from "../types"

export const stage2Handler = (req: Request, res: Response) => {
  const data: SuccessJsonResponseDto = {
    title: "stage 2",
    message: "That was the last stage for now!",
  }
  res.send(data)
}
