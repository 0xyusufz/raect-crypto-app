import React from "react";
import { Alert, AlertIcon, Box, Heading } from "@chakra-ui/react";

const Error = ({ message }) => {
  return (
    <Alert
      status={"error"}
      position={"fixed"}
      bottom={"4"}
      left={"50%"}
      transform={"translateX(-50%)"}
      w={"container.lg"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default Error;
