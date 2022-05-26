import { Box, Container, Image, Text } from "@mantine/core";
import React from "react";
import LandingPage from "../Images/LandingPage.jpg";
import { LandingStyles } from "../Styles/Theme/Landing";

export const Landing = () => {
  const { classes } = LandingStyles();
  return (
    <Container fluid px="0">
      <Image
        src={LandingPage}
        className={classes.LandingImage}
        height="100vh"
      />
      <Box className={classes.LandingImageText}>
        <Text className={classes.LandingTitle} align="center" mb="xl">
          SOLITUDE
        </Text>
        <Text weight={600}>
          Where you can find discounted prices for your favorite online
          products!
        </Text>
      </Box>
    </Container>
  );
};
