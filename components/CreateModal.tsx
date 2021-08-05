import * as React from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { uniqueWords } from 'foreign-text-parser'

type CreateModalProps = {
  title: string
  handleClose: () => void
  isOpen: boolean
}

type FormValues = {
  name: string
  text: string
  numberOfWords: number
}

const CreateModal: React.FC<CreateModalProps> = ({
  title,
  handleClose,
  isOpen,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleCreate = async ({ text, numberOfWords, name }: FormValues) => {
    const result = await uniqueWords(text, numberOfWords)

    const payload = { name, words: result }

    console.log(payload)
    handleClose()
  }

  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(handleCreate)}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl paddingBottom={4} isInvalid={errors.name}>
              <FormLabel htmlFor="name">Stack name</FormLabel>
              <Input
                id="name"
                placeholder="Harry Potter: chapter one paragraph words"
                {...register('name', {
                  required: 'This stack needs a name',
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl paddingBottom={4} isInvalid={errors.text}>
              <FormLabel htmlFor="text">
                Enter text to parse words from
              </FormLabel>
              <Textarea
                id="text"
                {...register('text', {
                  required: 'Need to include text to get words from',
                })}
                resize="none"
                placeholder="El señor y la señora Dursley ..."
                size="lg"
              />
              <FormErrorMessage>
                {errors.text && errors.text.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl paddingBottom={4} isInvalid={errors.numberOfWords}>
              <FormLabel htmlFor="numberOfWords">
                Enter number of words to find
              </FormLabel>
              <NumberInput min={1}>
                <NumberInputField
                  placeholder="10"
                  {...register('numberOfWords', {
                    required: 'Need to know the number of words to find',
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>
                {errors.numberOfWords && errors.numberOfWords.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button colorScheme="blue" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button isLoading={isSubmitting} type="submit" variant="ghost">
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default CreateModal
