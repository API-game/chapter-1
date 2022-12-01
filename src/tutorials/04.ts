import { Request, Response } from "express"

export const tutorial4Handler = (req: Request, res: Response) => {
  const contentType = req.header("Content-Type")
  const title = "Tutorial 4 - Content-Type header"

  if (contentType === "application/json") {
    res.send({
      title,
      message: "Great! As you can see, you can use `Content-Type` to change the data format.",
      nextTutorial: "/tutorials/5",
      prevTutorial: "/tutorials/3",
    })
  } else {
    res.render("tutorials/04", { title })
  }
}
