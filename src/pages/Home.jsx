import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import btc from "../assets/btc.png";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <motion.div style={{
        height:"80vh"
      }}
      animate={{

        translateY:"20px"
      }}
      transition={{
        duration:2,
        repeat:Infinity,
        repeatType:"reverse"
      }}
      >
        <Image
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          src={btc}
          filter={"grayscale(.5)"}
        />
      </motion.div>

      <Text
        fontSize={["4xl", "6xl"]}
        textAlign={"center"}
        fontweight={"thin"}
        color={"white"}
        mt={"-20"}
      >
        Crypto Space
      </Text>
    </Box>
  );
};

export default Home;
