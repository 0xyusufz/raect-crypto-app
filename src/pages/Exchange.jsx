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
} from "@chakra-ui/react";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Exchange = () => {
  const [exchanges, setexchanges] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchEchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setexchanges(data);
        setloading(false);
      } catch (e) {
        setloading(false);
        seterror(true);
      }
    };
    fetchEchanges();
  }, []);

  if (error) {
    return <Error message={"Error while fetching exchanges"} />;
  }

  return (
    <Container maxW="container.xl">
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justify={"space-evenly"}>
            {exchanges.map(function (elem) {
              return (
                <ExchangeCard
                  name={elem.name}
                  img={elem.image}
                  rank={elem.trust_score_rank}
                  url={elem.url}
                  key={elem.id}
                />
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchange;

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"coin"} />
        <Heading size={"md"} noOfLines={"1"}>
          {rank}
        </Heading>
        <Text noOfLines={"1"} textAlign={"center"}>
          {name}
        </Text>
      </VStack>
    </a>
  );
};
