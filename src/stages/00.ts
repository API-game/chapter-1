import { Request, Response } from "express"

export const indexHandler = (req: Request, res: Response) => {
  res.render("stages/index", { title: "stages" })
}
