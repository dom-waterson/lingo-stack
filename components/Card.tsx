import * as React from 'react'
import { Stat, StatLabel } from '@chakra-ui/react'

type StatsCardProps = {
  data: {
    word: string
    translation: string
  }
}

const Card = ({ data: { word, translation } }: StatsCardProps) => (
  <Stat
    px={{ base: 2, md: 4 }}
    py="5"
    shadow="xl"
    border="1px solid"
    rounded="lg"
  >
    <StatLabel fontSize="2xl" fontWeight="bold">
      {word}
    </StatLabel>
    <StatLabel fontSize="1xl" fontWeight="medium">
      {translation}
    </StatLabel>
  </Stat>
)

export default Card
