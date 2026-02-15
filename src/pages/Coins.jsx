import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../App";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  Button,
  useColorModeValue
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



  const changePage =(page)=>{
    setpage(page)
    setloading(true)
  }

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
          <HStack wrap={"wrap"}>
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

          <HStack>
            <Button bgColor={useColorModeValue("blackAlpha.900","white")} onClick={()=>changePage(2)}>
              <Text color={useColorModeValue("white","blackAlpha.900")}>2</Text>
              </Button>
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
