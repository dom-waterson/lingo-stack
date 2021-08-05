import * as React from 'react'

type Stack = {
  id: string
  name: string
  words: string[]
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

  const addStack = (newStack: Stack) => {
    setStacks([...stacks, newStack])
  }

  const removeStack = (id: string) => {
    const filteredStacks = stacks.filter((stack) => stack.id !== id)
    setStacks(filteredStacks)
  }

  return (
    <StackContext.Provider value={{ stacks, addStack, removeStack }}>
      {children}
    </StackContext.Provider>
  )
}
