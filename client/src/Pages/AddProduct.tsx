import { Button, Container, Select, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { AddProductStyles } from "../Styles/Theme/AddProduct";
import { LoginProps } from "./Login";

export const AddProduct = ({ authenticate }: LoginProps) => {
  const navigate = useNavigate();
  const { classes } = AddProductStyles();
  return (
    <Container pt="4rem">
      {/* <Button
        onClick={() => {
          authenticate();
          navigate("/");
        }}
      >
        Logout
      </Button> */}
      <div>
        <TextInput
          label="Shipping address"
          placeholder="15329 Huston 21st"
          classNames={classes}
        />

        <Select
          style={{ marginTop: 20, zIndex: 2 }}
          data={["React", "Angular", "Svelte", "Vue"]}
          placeholder="Pick one"
          label="Your favorite library/framework"
          classNames={classes}
        />
      </div>
    </Container>
  );
};
