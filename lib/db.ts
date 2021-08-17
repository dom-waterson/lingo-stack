import { v4 as uuidv4 } from 'uuid'

import { FormPayload } from '@/types/index'

const KEY = 'language-stacks'

function createStack(newStack: FormPayload) {
  const newStackWithId = { id: uuidv4(), ...newStack }

  window.localStorage.setItem(
    KEY,
    JSON.stringify([...getStacks(), newStackWithId])
  )

  return newStackWithId
}

// TODO
export function editStack() {}

function deleteStack(id: string) {
  const filteredStacks = getStacks().filter((stack) => stack.id !== id)
  window.localStorage.setItem('language-stacks', JSON.stringify(filteredStacks))

  return filteredStacks
}

function getStacks() {
  const storageValue = window.localStorage.getItem(KEY)

  console.log(storageValue)

  if (!storageValue) {
    return []
  } else {
    return [...JSON.parse(storageValue)]
  }
}

export { getStacks, deleteStack, createStack }
