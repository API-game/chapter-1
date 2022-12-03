import "express"

interface Locals {
  token?: string
  user?: TempUserDto
  getUser: () => Promise<TempUserDto | undefined>
}

declare module "express" {
  export interface Response {
    locals: Locals
  }
}

export type SuccessJsonResponseDto = {
  title: string
  message: string
  nextPage?: string
  prevPage?: string
}

export type ErrorJsonResponseDto = {
  error: {
    code: string
    message: string
  }
}

export type TempUserDto = {
  id: number
  name: string
  apiKey: string
  createdAt: string
}

export type PlayerItem = {
  id: number
  slug: string
  name: string
  description: string
  resourcePath: string
  createdAt: string
}
