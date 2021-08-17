import * as React from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

import CreateModal from '@/components/CreateModal'

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box>
      <Container d="flex" justifyContent="space-between" p={4} maxW="120ch">
        <Heading as="h1" size="xl">
          Lingo Stack
        </Heading>
        <Box>
          <IconButton
            variant="outline"
            onClick={toggleColorMode}
            aria-label="Toggle light/dark mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            mr="4"
          />

          <Button onClick={onOpen} size="md">
            Create stack
          </Button>
        </Box>

        <CreateModal
          isOpen={isOpen}
          handleClose={onClose}
          title="Create stack"
        />
      </Container>
    </Box>
  )
}

export default Header
