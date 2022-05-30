import { Button, Container, Group, Text, Title } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorStyles } from "../Styles/Theme/Error";

export const Error = () => {
  const { classes } = ErrorStyles();
  const navigate = useNavigate();

  return (
    <Container size="lg">
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>
        <Group position="center">
          <Button variant="subtle" size="md" onClick={() => navigate("/")}>
            Take me back to home page
          </Button>
        </Group>
      </Container>
    </Container>
  );
};
