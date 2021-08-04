import * as React from 'react'
import { Box, Container, SimpleGrid } from '@chakra-ui/react'

export default function Home() {
  let results: any = []

  return (
    <Container maxW="120ch" marginTop="20px">
      <SimpleGrid minChildWidth="120px" spacing="40px">
        {results?.map((result: string, index: number) => (
          <Box key={index} bg="tomato" height="80px">
            {result}
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}
