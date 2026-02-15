import React from 'react'
import { HStack, useColorModeValue ,Button} from "@chakra-ui/react";
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <HStack p={"4"} shadow={"base"} bgColor={useColorModeValue("white", "blackAlpha.900")}>
      <Button variant={"unstyled"} color={useColorModeValue("blackAlpha.900","white")}>
        <Link to={"/"}>Home</Link>
      </Button>
      <Button variant={"unstyled"} color={useColorModeValue("blackAlpha.900","white")}>
        <Link to={"/exchange"}>exchange</Link>
      </Button>
      <Button variant={"unstyled"} color={useColorModeValue("blackAlpha.900","white")}>
        <Link to={"/coins"}>Coins</Link>
      </Button>
    </HStack>
  )
}

export default Header
