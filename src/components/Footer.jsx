import React from "react";
import { Box, Stack, VStack, Avatar, Text } from "@chakra-ui/react";


const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
      w={"full"}
    >
      <Stack direction={["column", "row"]} h={"full"} alinItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            India's number Trading Platform
          </Text>
        </VStack>
        <VStack>
          <Avatar boxSize="28" mt={["4", "0"]} />
          <Text>Our Founder</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
