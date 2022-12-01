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
