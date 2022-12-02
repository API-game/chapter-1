import { Request, Response } from "express"
import axios from "axios"

const express = require("express")
export const router = express.Router()

export const getStartApiUrl = () => {
  return process.env.START_API_URL || ""
}

const getInventoryItems = async (token: string) => {
  const baseUrl = getStartApiUrl()
  const url = `${baseUrl}/api/users/me/inventory`
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.items
}

type InventoryItem = {
  slug: string
  name: string
  description: string
}

const getInventoryHandler = async (req: Request, res: Response) => {
  const title = "Inventory"

  const token = res.locals.token
  if (token) {
    const items = await getInventoryItems(token)
    res.render("inventory/list", { title, items })
  } else {
    const items: InventoryItem[] = [
      {
        slug: "map",
        name: "Map",
        description: "A magical, interactive map of the island",
      },
    ]

    res.render("inventory/list", { title, items })
  }
}

const postInventoryHandler = (req: Request, res: Response) => {
  // TODO: validate if has token
  const token = res.locals.token

  if (!token) {
    res.status(401).send("Unauthorized")
    return
  }

  const baseUrl = getStartApiUrl()
  const url = `${baseUrl}/api/users/me/inventory`

  res.status(201).send()
}

const getMapHandler = async (req: Request, res: Response) => {
  const title = "Inventory: Map"

  res.render("inventory/map", { title })
}

const postMapHandler = async (req: Request, res: Response) => {
  const token = res.locals.token
  const { name } = req.body

  if (!name) {
    res.status(400).send("Missing name")
    return
  }

  if (token) {
    return await getMapHandler(req, res)
  }

  const baseUrl = getStartApiUrl()
  const url = `${baseUrl}/users`

  const currentIp = req.ip

  try {
    const response = await axios.post(url, { ip: currentIp, name })

    const {
      payload: { token },
    } = response.data

    res.setHeader("X-Token", token)
    await getMapHandler(req, res)
  } catch (e: any) {
    // TODO: Send error to sentry or Datadog or something to let know something is wrong
    console.error(e)
    res.status(500).render("500")
  }
}

router.get("/", getInventoryHandler)
router.post("/", postInventoryHandler)
router.get("/map", getMapHandler)
router.post("/map", postMapHandler)
