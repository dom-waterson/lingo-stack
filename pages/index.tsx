import * as React from 'react'
import { Container, Stack, StackDivider } from '@chakra-ui/react'

import { StackContext } from '@/context/stack'
import LanguageStackItem from '@/components/LanguageStack'

export default function Home() {
  const { stacks, removeStack } = React.useContext(StackContext)
  console.log(stacks)

  return (
    <Container maxW="120ch" marginTop="20px">
      <Stack divider={<StackDivider borderColor="gray.200" />} spacing={8}>
        {stacks.map((stack) => (
          <LanguageStackItem
            key={stack.id}
            stack={stack}
            removeStack={removeStack}
          />
        ))}
      </Stack>
    </Container>
  )
}
