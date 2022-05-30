import {
  Box,
  Button,
  Container,
  Group,
  Image,
  List,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { AddProductStyles } from "../Styles/Theme/AddProduct";
import { LoginProps } from "./Login";
import AddProductDark from "../Images/AddProductDark.svg";
import AddProductLight from "../Images/AddProductLight.svg";
import { BsCheckCircleFill } from "react-icons/bs";
import { LoginContext, useLoginContext } from "../Context/LoginContext";
import { useState } from "react";
import { useInputState } from "@mantine/hooks";

export const AddProduct = ({ authenticate }: LoginProps) => {
  const [focused, setFocused] = useState(false);
  const [product, setProduct] = useInputState("");
  const navigate = useNavigate();
  const { classes } = AddProductStyles();
  const { dark } = useLoginContext();

  return (
    <div>
      <Container className={classes.container}>
        <Box className={classes.Logout}>
          <Button
            onClick={() => {
              authenticate();
              navigate("/");
            }}
          >
            Logout
          </Button>
        </Box>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Add a new <span className={classes.highlight}>Product</span> to
              the Website!
            </Title>

            <List mt={30} spacing="sm" size="sm">
              <List.Item
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextInput
                  label="Product Name"
                  placeholder="Input Product Name"
                  required
                  classNames={classes}
                  value={product}
                  onChange={setProduct}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  mt="md"
                  autoComplete="nope"
                />
              </List.Item>
            </List>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Submit
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Remove Everything
              </Button>
            </Group>
          </div>
          <Image
            src={dark ? AddProductDark : AddProductLight}
            className={classes.image}
          />
        </div>
      </Container>
    </div>
  );
};
