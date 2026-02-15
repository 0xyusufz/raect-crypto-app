import React from 'react'
import {Box,Heading} from '@chakra-ui/react'

const Error = ({message}) => {
  return (
    <Box w={"full"} flex={"1"} bgColor={"red"}>
        <Heading size={"xl"}>{message}</Heading>
    </Box>
  )
}

export default Error
