import React from 'react'
import { Box, Button, useDisclosure } from '@chakra-ui/react'

import CreateModal from '@/components/CreateModal'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      d="flex"
      justifyContent="flex-end"
      bg="gray.700"
      w="100%"
      p={4}
      color="white"
    >
      <Button onClick={onOpen} colorScheme="teal" size="md">
        Create stack
      </Button>

      <CreateModal isOpen={isOpen} handleClose={onClose} title="Create stack" />
    </Box>
  )
}

export default Header
