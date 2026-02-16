import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../App";
import {
  Container,
  HStack,
  Text,
  Button,
  useColorModeValue,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import CoinCard from "../components/CoinCard";

const Coins = () => {
  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [page, setpage] = useState(1);
  const [currency, setcurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const changePage = (page) => {
    setpage(page);
    setloading(true);
  };

  const btn = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        console.log(data);
        setcoins(data);
        setloading(false);
      } catch (e) {
        setloading(false);
        seterror(true);
      }
    };
    fetchCoin();
  }, [currency, page]);
  if (error) {
    return <Error message={"Error while fetching coins"} />;
  }

  return (
    <Container maxW="container.xl">
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
            <HStack spacing={"4"} justifyContent={["center", "flex-start"]}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map(function (elem) {
              return (
                <CoinCard
                  id={elem.id}
                  name={elem.name}
                  price={elem.current_price}
                  img={elem.image}
                  symbol={elem.symbol}
                  key={elem.id}
                  currencySymbol={currencySymbol}
                />
              );
            })}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"} gap={"2"}>
            {btn.map(function (elem, idx) {
              return (
                <Button
                  key={idx + 1}
                  bgColor={useColorModeValue("blackAlpha.900", "white")}
                  onClick={() => changePage(idx + 1)}
                >
                  <Text color={useColorModeValue("white", "blackAlpha.900")}>
                    {idx + 1}
                  </Text>
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
