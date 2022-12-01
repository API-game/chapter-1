import * as path from "path"
import { indexHandler } from "./00"
import { riddle1GetHandler, riddle1PostHandler } from "./01"
import { riddle2Handler } from "./02"

const express = require("express")
export const router = express.Router()

router.get("/", indexHandler)

router.get("/1", riddle1GetHandler)
router.post("/1", riddle1PostHandler)

router.get("/2", riddle2Handler)
