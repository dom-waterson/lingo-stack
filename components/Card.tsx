import * as React from 'react'
import { Stat, StatLabel, useColorModeValue } from '@chakra-ui/react'

type StatsCardProps = {
  word: string
}

const Card = ({ word }: StatsCardProps) => (
  <Stat
    px={{ base: 2, md: 4 }}
    py="5"
    shadow="xl"
    border="1px solid"
    borderColor={useColorModeValue('blue.800', 'blue.500')}
    rounded="lg"
    bg="blue.50"
  >
    <StatLabel fontSize="2xl" fontWeight="medium">
      {word}
    </StatLabel>
  </Stat>
)

export default Card
