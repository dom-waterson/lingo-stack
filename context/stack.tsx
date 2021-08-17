import * as React from 'react'
import { FormPayload, Stack } from '@/types/index'
import { createStack, deleteStack, getStacks } from '@/lib/db'

type ContextProps = {
  stacks: Stack[]
  addStack: (newStack: FormPayload) => void
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
    setStacks(getStacks())
  }, [])

  const addStack = (newStack: FormPayload) => {
    const data = createStack(newStack)
    setStacks([...stacks, data])
  }

  const removeStack = (id: string) => {
    setStacks(deleteStack(id))
  }

  return (
    <StackContext.Provider value={{ stacks, addStack, removeStack }}>
      {children}
    </StackContext.Provider>
  )
}
