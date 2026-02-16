import { Box, Text, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <VStack h={"90vh"} justifyContent={"center"}>
      <Box
        transform={"scale(3)"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Spinner size={"xl"} />
        <Text>Fetching please wait</Text>
      </Box>
    </VStack>
  );
};

export default Loader;
