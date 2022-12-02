import { Request, Response } from "express"
import * as path from "path"

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 3001

import * as tutorials from "./tutorials"
import * as stages from "./stages"

app.use(bodyParser.json())

app.use("/tutorials", tutorials.router)
app.use("/stages", stages.router)

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "/../views"))

app.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Home" })
})

app.get("/help", (req: Request, res: Response) => {
  res.render("help", { title: "Help" })
})

app.get("/final", (req: Request, res: Response) => {
  res.render("final", { title: "Finished Chapter 1" })
})

app.get("*", (req: Request, res: Response) => {
  res.setHeader("X-Hint", "Go to `/help` to see the available endpoints.")
  res.status(404).render("404", { title: "404" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export { isJsonRequired } from "./utils"

process.on("SIGINT", () => {
  console.log("Bye bye!")
  process.exit()
})
