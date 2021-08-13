//TODO create global export of types

type StackWords = {
  word: string
  translation: string
}

export const getStackWords = (stackWords: StackWords[]): string[] =>
  stackWords.reduce<string[]>(
    (previous, current) => previous.concat(current.word),
    []
  )
