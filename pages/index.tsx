import * as React from 'react'
import { Box, Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react'

import { StackContext } from '@/context/stack'
import Card from '@/components/Card'

export default function Home() {
  const { stacks } = React.useContext(StackContext)

  return (
    <Container maxW="120ch" marginTop="20px">
      {stacks.map((stack) => (
        <Box key={stack.id} paddingBottom={10}>
          <Heading paddingBottom={4} as="h3" size="lg">
            {stack.name}
          </Heading>
          <SimpleGrid paddingBottom={8} minChildWidth="120px" spacing="40px">
            {stack.words.map((word, index) => (
              <Card key={`${stack.id}-${index}`} word={word} />
            ))}
          </SimpleGrid>
          <Divider />
        </Box>
      ))}
    </Container>
  )
}
