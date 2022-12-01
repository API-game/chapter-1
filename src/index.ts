import { Request, Response } from "express"
import * as path from "path"

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 3001

import * as tutorials from "./tutorials"
import * as riddles from "./riddles"

app.use(bodyParser.json())

app.use("/tutorials", tutorials.router)
app.use("/riddles", riddles.router)

app.set("view engine", "pug")
app.set("views", [path.join(__dirname, "views"), tutorials.views, riddles.views])

app.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Home" })
})

app.get("/help", (req: Request, res: Response) => {
  res.render("help", { title: "Help" })
})

app.get("/final", (req: Request, res: Response) => {
  res.render("final", { title: "Finished Chapter 1" })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
