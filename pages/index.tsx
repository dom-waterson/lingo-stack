import * as React from 'react'
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Textarea,
  Container,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { uniqueWords } from 'foreign-text-parser'

export default function Home() {
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
    <>
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

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create stack</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
            </ModalBody>

            <ModalFooter display="flex" justifyContent="space-between">
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleCreate} disabled={!value} variant="ghost">
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <Container maxW="120ch" marginTop="20px">
        <SimpleGrid minChildWidth="120px" spacing="40px">
          {results?.map((result, index) => (
            <Box key={index} bg="tomato" height="80px">
              {result}
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}
