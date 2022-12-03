import { Request, Response } from "express"
import * as path from "path"

import * as tutorials from "./tutorials"
import * as stages from "./stages"
import * as inventory from "./inventory"
import { TempUserDto } from "./types"
import { getUserLazily } from "./utils"
import axios from "axios"
import { getStartApiUrl } from "./inventory"

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 3001

app.use(bodyParser.json())

app.use((req: Request, res: Response, next: any) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (token) {
    res.locals.token = token
  }

  res.locals.getUser = getUserLazily(res)

  next()
})

app.use((req: Request, res: Response, next: any) => {
  const baseUrl = getStartApiUrl()
  const url = `${baseUrl}/events`
  const data = {
    ip: req.ip,
    apiKey: res.locals.token,
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body,
  }

  axios
    .post(url, data)
    .then(() => {
      console.debug("Event sent to analytics")
    })
    .catch((err: any) => {
      console.warn("Failed to send event to analytics")
      console.error(err)
    })

  next()
})

app.use("/tutorials", tutorials.router)
app.use("/stages", stages.router)
app.use("/inventory", inventory.router)

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
export { TempUserDto } from "./types"
export { getSlugFromItemResourcePath } from "./utils"
