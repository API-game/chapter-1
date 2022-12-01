import { Request, Response } from "express"

export const tutorial3Handler = (req: Request, res: Response) => {
  res.header("X-My-Name", "Michal")
  res.render("tutorials/03", { title: "Tutorial 3 - Custom headers" })
}
