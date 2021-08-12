import * as React from 'react'

type Stack = {
  id: string
  name: string
  words: Word[]
}

type Word = {
  word: string
  translation: string
}

type ContextProps = {
  stacks: Stack[]
  addStack: (newStack: Stack) => void
  removeStack: (id: string) => void
}

export const StackContext = React.createContext<ContextProps>({
  addStack: () => {},
  removeStack: () => {},
  stacks: [],
})

export const StackProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [stacks, setStacks] = React.useState<Stack[]>([])

  React.useEffect(() => {
    const storageValue = window.localStorage.getItem('language-stacks')
    if (!storageValue) return
    setStacks(JSON.parse(storageValue))
  }, [])

  const addStack = (newStack: Stack) => {
    const updatedStacks = [...stacks, newStack]
    window.localStorage.setItem(
      'language-stacks',
      JSON.stringify(updatedStacks)
    )
    setStacks(updatedStacks)
  }

  const removeStack = (id: string) => {
    const filteredStacks = stacks.filter((stack) => stack.id !== id)
    window.localStorage.setItem(
      'language-stacks',
      JSON.stringify(filteredStacks)
    )
    setStacks(filteredStacks)
  }

  return (
    <StackContext.Provider value={{ stacks, addStack, removeStack }}>
      {children}
    </StackContext.Provider>
  )
}
