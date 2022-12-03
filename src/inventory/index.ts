import { Request, Response } from "express"
import axios, { AxiosResponse } from "axios"
import { getSlugFromItemResourcePath, sendRandomHint } from "../utils"
import { PlayerItem, TempUserDto } from "../types"

const express = require("express")
export const router = express.Router()

export const getStartApiUrl = () => {
  return process.env.START_API_URL || ""
}

const getInventoryItems = async (token: string): Promise<PlayerItem[]> => {
  const baseUrl = getStartApiUrl()
  const url = `${baseUrl}/users/me/inventory`
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

const addMagicalMap = (items: PlayerItem[]) => {
  const map = {
    id: 1,
    slug: "map",
    name: "Map",
    resourcePath: "map",
    description: "A magical, interactive map of the island",
    createdAt: new Date().toString(),
  }

  return [map, ...items]
}

const getAllItems = async (token: string | undefined): Promise<PlayerItem[]> => {
  if (token) {
    try {
      const items = await getInventoryItems(token)
      return addMagicalMap(items)
    } catch (e: any) {
      console.error(e)
    }
  }

  return addMagicalMap([])
}

const getInventoryHandler = async (req: Request, res: Response) => {
  const title = "Inventory"

  const items = await getAllItems(res.locals.token)

  res.render("inventory/list", { title, items })
}

type CreateItemRequestDto = Pick<PlayerItem, "slug" | "resourcePath" | "name" | "description">

async function getItemByResourcePath(itemResourcePath: string): Promise<CreateItemRequestDto> {
  if (itemResourcePath === "/stages/beach/items/note") {
    return {
      slug: getSlugFromItemResourcePath(itemResourcePath),
      resourcePath: itemResourcePath,
      name: "Note",
      description:
        "A weird note from the beach. It says:\n\n" +
        "If you would like to take me with you,\n" +
        "Your inventory, you must pursue.\n" +
        "Send a request with the resource path,\n" +
        "And you'll have me in no time, alas!",
    }
  }

  throw new Error("Couldn't find item")
}

const postInventoryHandler = async (req: Request, res: Response) => {
  const token = res.locals.token

  if (!token) {
    res.status(401).send("Unauthorized")
    return
  }

  const baseUrl = getStartApiUrl()
  const url = `${baseUrl}/users/me/inventory`

  try {
    const item = await getItemByResourcePath(req.body.item)

    const response = await axios.post(url, item, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 201) {
      res.setHeader("Location", "/inventory/")
      res.status(201).send()
      return
    }
  } catch (e: any) {
    if (e.response.status === 409) {
      res.status(409).send("Item already exists")
      return
    }

    console.error(e)
  }

  res.status(500).render("500")
}

const deleteItemFromInventoryHandler = async (req: Request, res: Response) => {
  const token = res.locals.token
  const { item } = req.body

  if (!item) {
    res.status(400).send("Missing item")
    return
  }

  if (!token) {
    res.status(401).send("Unauthorized")
    return
  }

  const baseUrl = getStartApiUrl()
  const url = `${baseUrl}/api/users/me/inventory/${item}`

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 204) {
      res.status(204).send()
      return
    } else {
      res.status(500).render("500")
      return
    }
  } catch (e: any) {
    console.error(e)
    res.status(500).render("500")
  }
}

const getMapHandler = async (req: Request, res: Response) => {
  const title = "Inventory: Map"

  if (!res.locals.token) {
    const hints = [
      `The map needs a name - could it be your own?`,
      `A token is needed to travel far - what kind of request can you send to obtain one?`,
      `Don't forget to check the headers of the response - they might contain a clue!`,
    ]
    sendRandomHint(hints, res)
    res.render("inventory/map", { title, apiTokenHint: true })
  } else {
    const user = await res.locals.getUser()
    const name = user?.name || false

    res.render("inventory/map", { title, name })
  }
}

interface CreateTempUserResponseDto {
  payload: { tempUser: TempUserDto }
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

  try {
    const response = await axios.post<{ name: string }, AxiosResponse<CreateTempUserResponseDto>>(url, {
      name,
    })

    const {
      payload: {
        tempUser: { apiKey: token },
      },
    } = response.data

    res.setHeader("X-Token", token)
    res.render("inventory/map-obtained-token", { title: "Inventory: Map" })
  } catch (e: any) {
    console.error(e)
    res.status(500).render("500")
  }
}

const getItemHandler = async (req: Request, res: Response) => {
  // fetch item from api by its slug
  const { slug } = req.params
  if (!slug) {
    res.status(400).send("Missing slug")
    return
  }

  try {
    const baseUrl = getStartApiUrl()
    const url = `${baseUrl}/users/me/inventory/${slug}`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${res.locals.token}`,
      },
    })

    const item = response.data

    res.render("inventory/item", { title: `Inventory: ${item.name}`, item })
  } catch (e: any) {
    console.error(e)
    res.status(404).render("404")
  }
}

router.get("/", getInventoryHandler)
router.post("/", postInventoryHandler)
router.get("/map", getMapHandler)
router.post("/map", postMapHandler)
router.get("/:slug", getItemHandler)
