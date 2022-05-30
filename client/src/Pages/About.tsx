import { Box, Container, Grid, Image, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useLoginContext } from "../Context/LoginContext";
import logodark from "../Images/weblogo-dark.svg";
import logo from "../Images/weblogocircle-light.svg";
import {
  FlexContainer,
  ProductContainer,
} from "../Styles/StyledComonents/Container";
import { ProductDetails } from "../Styles/Theme/ProductDetail";

export const About = () => {
  const { dark } = useLoginContext();
  const { classes } = ProductDetails();

  return (
    <Container fluid pt="4rem" px="0" className={classes.ProductContainer}>
      <ProductContainer>
        <Grid style={{ marginBlockEnd: "15rem" }}>
          <Grid.Col span={4}>
            <Image
              src={dark ? logodark : logo}
              height="5rem"
              width="5rem"
              alt="logo"
            />
          </Grid.Col>
          <Grid.Col span={8}>
            <Text weight="bold" style={{ fontSize: "1.5rem" }}>
              Thank you for visiting Solitude! A place where you can be on your
              own.
            </Text>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col sm={4}>
            <Text weight="bolder" style={{ fontSize: "1.5rem" }}>
              CONNECT WITH ME
            </Text>
            <SimpleGrid cols={1} style={{ marginBlockStart: "1.5rem" }}>
              <Text>LinkedIn</Text>
              <Text>Github</Text>
              <Text>Instagram</Text>
              <Text>Twitter</Text>
            </SimpleGrid>
            <Box style={{ marginBlock: "5rem" }}>
              <Text
                component="a"
                href="https://markpedong.com"
                target="_blank"
                weight="bolder"
              >
                markpedong.com
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col sm={8} style={{ marginBlockEnd: "5rem" }}>
            <Text weight="bolder" style={{ fontSize: "1.5rem" }}>
              Location
            </Text>
            <FlexContainer style={{ marginBlockStart: "1.5rem" }}>
              <HiLocationMarker fontSize="1rem" />
              <Text weight="bold" style={{ fontSize: "1rem" }}>
                Cavite
              </Text>
            </FlexContainer>
          </Grid.Col>
        </Grid>
      </ProductContainer>
    </Container>
  );
};
