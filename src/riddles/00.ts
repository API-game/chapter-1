import { Request, Response } from "express"

export const indexHandler = (req: Request, res: Response) => {
  res.render("riddles/index", { title: "Riddles" })
}
