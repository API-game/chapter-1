import { Request, Response } from "express"
import { TutorialsSuccessJsonResponseDto } from "../types"

export const tutorial4Handler = (req: Request, res: Response) => {
  const contentType = req.header("Content-Type")
  const title = "Tutorial 4 - Content-Type header"

  if (contentType === "application/json") {
    const data: TutorialsSuccessJsonResponseDto = {
      title,
      message: "Great! As you can see, you can use `Content-Type` to change the data format.",
      nextTutorial: "/tutorials/5",
      prevTutorial: "/tutorials/3",
    }
    res.send(data)
  } else {
    res.render("tutorials/04", { title })
  }
}
