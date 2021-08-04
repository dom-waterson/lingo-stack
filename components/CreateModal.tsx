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
} from '@chakra-ui/react'

type CreateModalProps = {
  children: React.ReactNode
  handleCreate: () => void
  title: string
  handleClose: () => void
  isOpen: boolean
}

const CreateModal: React.FC<CreateModalProps> = ({
  children,
  handleCreate,
  title,
  handleClose,
  isOpen,
}) => (
  <Modal size="xl" isOpen={isOpen} onClose={handleClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
      <ModalFooter display="flex" justifyContent="space-between">
        <Button colorScheme="blue" mr={3} onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleCreate} variant="ghost">
          Create
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export default CreateModal
