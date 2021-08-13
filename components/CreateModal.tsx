import * as React from 'react'
// @ts-ignore
import translate from 'translate'
import { v4 as uuidv4 } from 'uuid'
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
  Select,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'

import { uniqueWords } from 'foreign-text-parser'
import { StackContext } from '@/context/stack'
import { getStackWords } from '../utils'

type CreateModalProps = {
  title: string
  handleClose: () => void
  isOpen: boolean
}

type FormValues = {
  name: string
  text: string
  numberOfWords: number
  ignoreStackId: string
}

const CreateModal: React.FC<CreateModalProps> = ({
  title,
  handleClose,
  isOpen,
}) => {
  const { stacks, addStack } = React.useContext(StackContext)
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleCreate = async ({
    text,
    numberOfWords,
    name,
    ignoreStackId,
  }: FormValues) => {
    //TODO find a better way
    const options = {
      wordLimit: numberOfWords && numberOfWords,
      ignoreWords: ignoreStackId
        ? getStackWords(
            stacks.find((stack) => stack.id === ignoreStackId)!.words
          )
        : [],
    }

    const result = await uniqueWords(text, options)

    const translatedWords = await translate(result.toString(), {
      from: 'es',
      engine: 'google',
      key: process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_KEY,
    })

    const stack = translatedWords
      .split(', ')
      .map((translation: string, index: number) => ({
        word: result[index],
        translation,
      }))

    addStack({ id: uuidv4(), name, words: stack })

    reset()
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
                <Controller
                  name="numberOfWords"
                  control={control}
                  rules={{
                    min: {
                      value: 1,
                      message: 'Minimum value is 1',
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <NumberInputField {...field} placeholder="10" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </>
                  )}
                />
              </NumberInput>
              <FormErrorMessage>
                {errors.numberOfWords && errors.numberOfWords.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl paddingBottom={4}>
              <FormLabel htmlFor="stacks">Exclude these words</FormLabel>
              <Select
                id="stacks"
                placeholder="Select stack of word"
                {...register('ignoreStackId')}
              >
                {stacks.map((stack) => (
                  <option key={stack.id} value={stack.id}>
                    {stack.name}
                  </option>
                ))}
              </Select>
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
