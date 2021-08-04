import React from 'react'
import {
  Box,
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { uniqueWords } from 'foreign-text-parser'

import CreateModal from '@/components/CreateModal'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  let [value, setValue] = React.useState<string>()
  let [results, setResults] = React.useState<string[]>()
  let [num, setNum] = React.useState<number>(15)

  let handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  let handleNumChange = (_: string, result: number) => {
    setNum(result)
  }

  let handleCreate = async () => {
    if (!value) return

    const result = await uniqueWords(value, num)

    setResults(result)
    onClose()
  }
  return (
    <Box
      d="flex"
      justifyContent="flex-end"
      bg="tomato"
      w="100%"
      p={4}
      color="white"
    >
      <Button onClick={onOpen} colorScheme="teal" size="md">
        Create stack
      </Button>

      <CreateModal
        isOpen={isOpen}
        handleCreate={handleCreate}
        handleClose={onClose}
        title="Create stack"
      >
        <Textarea
          value={value}
          onChange={handleInputChange}
          resize="none"
          placeholder="Text to generate word stack"
          size="lg"
        />
        <NumberInput value={num} onChange={handleNumChange}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </CreateModal>
    </Box>
  )
}

export default Header
