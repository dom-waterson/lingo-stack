import * as React from 'react'
import {
  Box,
  Container,
  Divider,
  Heading,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import { StackContext } from '@/context/stack'
import Card from '@/components/Card'

export default function Home() {
  const { stacks, removeStack } = React.useContext(StackContext)

  return (
    <Container maxW="120ch" marginTop="20px">
      {stacks.map((stack) => (
        <Box key={stack.id} paddingBottom={10}>
          <Box d="flex" justifyContent="space-between">
            <Heading paddingBottom={4} as="h3" size="lg">
              {stack.name}
            </Heading>
            <IconButton
              onClick={() => removeStack(stack.id)}
              colorScheme="red"
              aria-label="Delete stack"
              icon={<DeleteIcon />}
            />
          </Box>
          <SimpleGrid paddingBottom={8} minChildWidth="120px" spacing="40px">
            {stack.words.map((word, index) => (
              <Card key={`${stack.id}-${index}`} data={word} />
            ))}
          </SimpleGrid>
          <Divider />
        </Box>
      ))}
    </Container>
  )
}
