import { Request } from "express"

export const isJsonRequired = (req: Request): boolean => !!req.headers["content-type"]?.includes("application/json")
