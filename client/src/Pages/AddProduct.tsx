import {
  Box,
  Button,
  Container,
  Group,
  Image,
  List,
  TextInput,
  Title,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../Context/LoginContext";
import AddProductDark from "../Images/AddProductDark.svg";
import AddProductLight from "../Images/AddProductLight.svg";
import { AddProductStyles } from "../Styles/Theme/AddProduct";
import { LoginProps } from "./Login";

export const AddProduct = ({ authenticate }: LoginProps) => {
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
            <Title className={classes.title} order={2}>
              Add a new <span className={classes.highlight}>Product</span>{" "}
              (Short)
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
                  mt="md"
                  autoComplete="nope"
                />
              </List.Item>
              <List.Item
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextInput
                  label="Product Image"
                  placeholder="Input Product Image Link"
                  required
                  classNames={classes}
                  value={product}
                  onChange={setProduct}
                  mt="md"
                  autoComplete="nope"
                />
              </List.Item>
              <List.Item
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextInput
                  label="Product Description"
                  placeholder="Input Product Description"
                  required
                  classNames={classes}
                  value={product}
                  onChange={setProduct}
                  mt="md"
                  autoComplete="nope"
                />
              </List.Item>
            </List>

            <Group mt={30}>
              <Button radius="xl" size="sm" className={classes.control}>
                Submit
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="sm"
                className={classes.control}
              >
                Remove Everything
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  );
};
