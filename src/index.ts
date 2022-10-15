import { Request, Response } from "express"

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

const tutorials = require("./tutorials")
const riddles = require("./riddles")

app.use(bodyParser.json())

app.use("/tutorials", tutorials)
app.use("/riddles", riddles)

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome to API game: chapter 1!\n\nLet's learn some REST API basics.\n\nGo to /tutorials to learn API and Postman basics and get familiar with the game.\nGo to /riddles to start a game!"
  )
})

app.get("/help", (req: Request, res: Response) => {
  res.send(
    "API game help\n\nIt is created to help you learn more about APIs.\n\nYou can start playing by going to /tutorials endpoint.\n\nYou can also learn more about APIs by going to /api-info endpoint.\n\nTo unlock the next riddle you need to solve the previous one.\n\nGood luck!"
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
