import * as path from "path"
import { indexHandler } from "./00"
import { stage1GetHandler, stage1PostHandler } from "./01"
import { stage2Handler } from "./02"

const express = require("express")
export const router = express.Router()

router.get("/", indexHandler)

router.get("/1", stage1GetHandler)
router.post("/1", stage1PostHandler)

router.get("/2", stage2Handler)
