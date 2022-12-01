import { Request, Response } from "express"

const express = require("express")
const router = express.Router()

router.get("/", (req: Request, res: Response) => {
  const tutorials = [
    {
      id: 1,
      title: "How to get help?",
    },
    {
      id: 2,
      title: "Headers",
    },
    {
      id: 3,
      title: "Custom headers",
    },
    {
      id: 4,
      title: "Content-Type header",
    },
  ]
  const message = "This is a list of available tutorials"

  const contentType = req.headers["content-type"]
  if (contentType === "application/json") {
    res.send({
      message,
      tutorials: tutorials.map((tutorial) => ({
        ...tutorial,
        path: `/tutorials/${tutorial.id}`,
      })),
    })
  } else {
    res.send(message + ":\n\n" + tutorials.map((t) => `/tutorials/${t.id} ${t.title}`).join("\n"))
  }
})

router.get("/1", (req: Request, res: Response) => {
  res.send(
    "Awesome! Now you know how to navigate to the tutorials list.\n\nNow, how to get help?\n\nIn each chapter you'll find /help endpoint, which can be used to get some hints.\n\nGo to /help now.\n\nThen go to /tutorials/2."
  )
})

router.get("/2", (req: Request, res: Response) => {
  res.send(
    "Now, take a look at the headers I've sent you with this message (in Postman you will find it in `Headers` tab).\n\nYou should be able to headers there, like `Content-Type`, `X-Powered-By`, and so on.\n\nHeaders contain a lot of useful information and I will use it sometimes to send you some hints.\n\nNow, go to /tutorials/3."
  )
})

router.get("/3", (req: Request, res: Response) => {
  res.header("X-My-Name", "Michal")
  res.send(
    "You can also send custom headers in your response. For example, you can send `X-My-Name` header with your name in it.\n\nFor custom headers we usually use naming convention with the prefix `X-`.\n\nGo to /tutorials/4."
  )
})

router.get("/4", (req: Request, res: Response) => {
  const contentType = req.header("Content-Type")

  if (contentType === "application/json") {
    res.send({
      message: "Great! As you can see, you can use `Content-Type` to change the data format.",
      nextTutorial: "/tutorials/5",
      prevTutorial: "/tutorials/3",
    })
  } else {
    res.send(
      "Let's try to send some custom headers. In your request add `Content-Type` header with value `application/json`.\n\nThen send the request again."
    )
  }
})

router.get("/5", (req: Request, res: Response) => {
  res.send(
    "Now let's talk about HTTP methods.\n\nThere are 4 main HTTP methods:\n- GET\n- POST\n- PUT\n- DELETE\n\nTry to change the method of your request to `POST` and send it again."
  )
})

router.post("/5", (req: Request, res: Response) => {
  res.send({
    message: "Great! Now you know how to send POST requests.",
    prevTutorial: "/tutorials/4",
    nextTutorial: "/tutorials/6",
  })
})

router.get("/6", (req: Request, res: Response) => {
  res.send(
    'Now, let\'s try to send some data in the request body.\n\nIn Postman you can do it in `Body` tab.\n\nSelect raw, then JSON format.\n\nThen send the request with your name.\n\nSchema:\n```json\n{"name": "your name"}\n```'
  )
})

router.post("/6", (req: Request, res: Response) => {
  const body = req.body

  if (body && body.name) {
    res.send({
      message: `Great! Now you know how to send data in the request body. Your name is "${body.name}".`,
      prevTutorial: "/tutorials/5",
      nextTutorial: "/tutorials/7",
    })
  } else {
    res.send(
      'You need to send some data in the request body.\n\nIn Postman you can do it in `Body` tab.\n\nSelect raw, then JSON format.\n\nThen send the request with some data in the body.\n\nFor example:\n```json\n{"name": "your name"}\n```'
    )
  }
})

router.get("/7", (req: Request, res: Response) => {
  res.send({
    message: "Now you know the basics of REST API and using Postman.\n\nLet's start a game!",
    prevTutorial: "/tutorials/6",
    nextStep: "/riddles",
  })
})

module.exports = router
