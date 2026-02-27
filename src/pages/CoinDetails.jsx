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
  StatHelpText,
  StatArrow,
  Badge,
  useColorModeValue,
  Progress,
  Button,
} from "@chakra-ui/react";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../App";
import Error from "../components/Error";
import Chart from "../components/Chart";

const CoinDetails = () => {
  const param = useParams();
  const [coins, setcoins] = useState({});
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [currency, setcurrency] = useState("inr");
  const [days, setdays] = useState("24h");
  const [chartArray, setchartArray] = useState([]);
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];
  let switchchartstats = (key) => {
    switch (key) {
      case "24h":
        setdays("24h");
        setloading(true);
        break;
      case "7d":
        setdays("7d");
        setloading(true);
        break;
      case "14d":
        setdays("14d");
        setloading(true);
        break;
      case "30d":
        setdays("30d");
        setloading(true);
        break;
      case "60d":
        setdays("60d");
        setloading(true);
        break;
      case "200d":
        setdays("200d");
        setloading(true);
        break;
      case "1y":
        setdays("365d");
        setloading(true);
        break;
      case "max":
        setdays("max");
        setloading(true);
        break;
      default:
        setdays("24h");
        setloading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${param.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${param.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setcoins(data);
        setchartArray(chartData.prices);
        setloading(false);
      } catch (e) {
        setloading(false);
        seterror(true);
      }
    };
    fetchCoinDetails();
  }, [param.id, currency, days]);
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
            <Chart currency={currencySymbol} arr={chartArray} days={days} />
          </Box>
          <HStack p={"4"} overflowX={"auto"}>
            {btns.map((elem) => {
              return (
                <Button key={elem} onClick={() => switchchartstats(elem)}>
                  {elem}
                </Button>
              );
            })}
          </HStack>
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
              <StatNumber>
                {currencySymbol}
                {coins.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coins.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coins.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge
              fontSize={"2xl"}
              bgColor={useColorModeValue(["blackAlpha.900", "white"])}
              color={useColorModeValue(["white", "blackAlpha.900"])}
            >{`#${coins.market_cap_rank}`}</Badge>
            <CustomBar
              low={`${currencySymbol}${coins.market_data.high_24h[currency]}`}
              high={`${currencySymbol}${coins.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p={"4"}>
              <Item title={"Max Supply"} value={coins.market_data.max_supply} />
              <Item
                title={"circulating Supply"}
                value={coins.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All time low"}
                value={`${currencySymbol}${coins.market_data.atl[currency]}`}
              />{" "}
              <Item
                title={"All time high"}
                value={`${currencySymbol}${coins.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

let CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={"teal"} w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={high} colorScheme={"red"} />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={low} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

let Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};

export default CoinDetails;
