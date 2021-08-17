import * as React from 'react'
import { Box, Heading, IconButton, SimpleGrid } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import Card from './Card'
import { Stack } from '@/types/index'

type LanguageStackItemProps = {
  stack: Stack
  removeStack?: (id: string) => void
}

const LanguageStackItem: React.FC<LanguageStackItemProps> = ({
  stack,
  removeStack,
}) => (
  <Box p="4">
    <Box d="flex" justifyContent="space-between">
      <Heading as="h3" size="lg">
        {stack.name}
      </Heading>
      {removeStack && (
        <IconButton
          onClick={() => removeStack(stack.id)}
          colorScheme="red"
          aria-label="Delete stack"
          icon={<DeleteIcon />}
        />
      )}
    </Box>
    <SimpleGrid minChildWidth="120px" spacing="40px" mt="8">
      {stack.words.map((word, index) => (
        <Card key={`${stack.id}-${index}`} data={word} />
      ))}
    </SimpleGrid>
  </Box>
)

export default LanguageStackItem
