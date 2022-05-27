import {
  Box,
  Container,
  Grid,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { TitleContainer } from "../Styles/StyledComonents/Container";
import { TitleStyled } from "../Styles/StyledComonents/Text";
import { ProductStyles } from "../Styles/Theme/Product";

export const Products = () => {
  const { classes } = ProductStyles();
  return (
    <Container fluid pt="4rem" px="0" className={classes.Container}>
      <Container size="lg" pt="4rem">
        <Grid className={classes.ProductTitle}>
          <Grid.Col lg={6} style={{ paddingRight: "8rem" }}>
            <TitleStyled mb="lg">Products</TitleStyled>
            <Text>
              We find products that comes with discounted prices! This list of
              discount products will help you save money when shopping online.
              Go shopping for discounts, coupons and sales and find the best
              bargains in our site!
            </Text>
          </Grid.Col>
          <Grid.Col lg={6}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
            vitae nemo exercitationem eum nobis sit maiores sed in magni,
            obcaecati accusantium cupiditate quidem doloribus reprehenderit
            molestias corporis expedita ipsa minima. Accusantium eligendi illum
            sequi repellat architecto odit. Ex velit quasi architecto voluptas
            aperiam. Cupiditate aperiam magni iusto sapiente consequuntur amet.
          </Grid.Col>
        </Grid>
        <TitleStyled align="center">All Products</TitleStyled>
      </Container>
    </Container>
  );
};
