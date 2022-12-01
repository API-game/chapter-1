import { Request, Response } from "express"

export const tutorial2Handler = (req: Request, res: Response) => {
  res.render("tutorials/02", { title: "Tutorial 2 - Headers" })
}
