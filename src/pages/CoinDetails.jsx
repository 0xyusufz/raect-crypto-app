import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../App";
import Error from "../components/Error";

const CoinDetails = () => {
  const param = useParams();
  const [coins, setcoins] = useState({});
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [currency, setcurrency] = useState("inr");

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${param.id}`);
        console.log(data);
        setcoins(data);
        setloading(false);
      } catch (e) {
        setloading(false);
        seterror(true);
      }
    };
    fetchCoinDetails();
  }, [param.id]);
  if (error) {
    return <Error message={"Error while fetching coins"} />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} borderWidth={"1"}>
            erfgr4
          </Box>

          {/* button */}

          <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
            <HStack spacing={"4"} justifyContent={["center", "flex-start"]}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
              Last Updated on{" "}
              {Date(coins.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coins.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coins.name}</StatLabel>
              <StatNumber>2345</StatNumber>
            </Stat>
          </VStack>
        </>
      )}
    </Container>
  );
};

export default CoinDetails;
