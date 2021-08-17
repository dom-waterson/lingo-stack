export type Stack = {
  id: string
  name: string
  words: Word[]
}

export type Word = {
  word: string
  translation: string
}

export type FormPayload = {
  name: string
  words: Word[]
}
