import { Request, Response } from "express"

export const tutorial1Handler = (req: Request, res: Response) => {
  res.render("tutorials/01", { title: "Tutorial 1 - How to get help?" })
}
