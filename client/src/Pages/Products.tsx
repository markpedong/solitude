import { Container, Grid, Image, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ProductContainer } from "../Styles/StyledComonents/Container";
import { TitleStyled } from "../Styles/StyledComonents/Text";
import { ProductStyles } from "../Styles/Theme/Product";

export const Products = () => {
  const { classes } = ProductStyles();
  const navigate = useNavigate();

  return (
    <Container fluid pt="4rem" px="0" className={classes.Container}>
      <ProductContainer>
        <Grid>
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
        <TitleStyled align="center" className={classes.ProductTitle}>
          All Products
        </TitleStyled>
        <Grid>
          <Grid.Col lg={2}>
            <Image
              height="100%"
              radius="md"
              src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              alt="Random unsplash image"
              onClick={() => navigate("/products/TEST_LINK")}
            />
            <Text
              weight="bolder"
              py="lg"
              onClick={() => navigate("/products/TEST_LINK")}
            >
              Lorem ipsum dolor sit.
            </Text>
            <Text size="sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reiciendis fugiat ullam,
            </Text>
          </Grid.Col>
        </Grid>
      </ProductContainer>
    </Container>
  );
};
