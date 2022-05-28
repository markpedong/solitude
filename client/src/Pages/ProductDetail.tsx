import { Box, Container, Grid, Image, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import shopee from "../Images/shopee.svg";
import {
  FlexContainer,
  ProductContainer,
} from "../Styles/StyledComonents/Container";
import { TitleStyled } from "../Styles/StyledComonents/Text";
import { ProductDetails } from "../Styles/Theme/ProductDetail";

export const ProductDetail = () => {
  // const { id } = useParams();
  const { classes } = ProductDetails();
  const navigate = useNavigate();

  return (
    <Container fluid pt="4rem" px="0" className={classes.ProductContainer}>
      <ProductContainer size="lg">
        <Grid justify="center">
          <Grid.Col md={6}>
            <Image
              height={400}
              radius="md"
              src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              alt="Random unsplash image"
            />
          </Grid.Col>
          <Grid.Col md={6}>
            <TitleStyled mb="lg" style={{ lineHeight: "2.5rem" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              aperiam quas sequi eum
            </TitleStyled>
            <Text mb="lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              consectetur accusantium beatae sapiente autem aspernatur esse.
              Cupiditate, nihil odio. Sequi.
            </Text>

            <Text mb="xl">
              Original Price: ₽{" "}
              <span style={{ textDecoration: "line-through" }}>250-300</span>
            </Text>

            <Box className={classes.ProductPrice} mb="xl">
              <Image src={shopee} width={80} />
              <Text>₽155-215</Text>
              <Text>https://bit.ly/3JpoWvs</Text>
            </Box>

            <Text weight={700} style={{ fontFamily: "Poppins" }}>
              Share to Social Media:
            </Text>
            <FlexContainer>
              <FacebookShareButton>
                <FacebookIcon size={35} round={true} />
              </FacebookShareButton>
              <FacebookShareButton>
                <FacebookMessengerIcon size={35} round={true} />
              </FacebookShareButton>
              <TwitterShareButton>
                <TwitterIcon size={35} round={true} />
              </TwitterShareButton>
              <EmailShareButton>
                <EmailIcon size={35} round={true} />
              </EmailShareButton>
            </FlexContainer>
          </Grid.Col>
        </Grid>
        <Grid className={classes.ExtraProduct} justify="start" mt="4rem">
          <Grid.Col xs={3} sm={2}>
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
          <Grid.Col xs={3} sm={2}>
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
          <Grid.Col xs={3} sm={2}>
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
          <Grid.Col xs={3} sm={2}>
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
          <Grid.Col xs={3} sm={2}>
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
          <Grid.Col xs={3} sm={2}>
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
