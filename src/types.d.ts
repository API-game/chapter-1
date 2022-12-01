export type SuccessJsonResponseDto = {
  title: string
  message: string
}

export type TutorialsSuccessJsonResponseDto = SuccessJsonResponseDto & {
  prevTutorial: string
  nextTutorial: string
}

export type ErrorJsonResponseDto = {
  error: {
    code: string
    message: string
  }
}
