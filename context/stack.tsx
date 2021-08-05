import * as React from 'react'

type Stack = {
  id: string
  name: string
  words: string[]
}

type ContextProps = {
  stacks: Stack[]
  addStack: (newStack: Stack) => void
}

export const StackContext = React.createContext<ContextProps>({
  addStack: () => {},
  stacks: [],
})

export const StackProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [stacks, setStacks] = React.useState<Stack[]>([])

  const addStack = (newStack: Stack) => {
    setStacks([...stacks, newStack])
  }

  return (
    <StackContext.Provider value={{ stacks, addStack }}>
      {children}
    </StackContext.Provider>
  )
}
