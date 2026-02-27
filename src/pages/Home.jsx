import React from 'react'
import {Box,Image,Text} from '@chakra-ui/react'
import btc from '../assets/btc.png'
const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>


    <Image w={"full"} h={"full"} objectFit={"contain"} src={btc} filter={"grayscale(.5)"}/>

    <Text fontSize={["4xl","6xl"]} textAlign={"center"} fontweight={"thin"} color={"white"} mt={"-20"}>Crypto Space</Text>


    </Box>

  )
}

export default Home
