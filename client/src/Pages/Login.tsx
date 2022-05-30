import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Password, UserName } from "../Config/LoginDetails";
import { useLoginContext } from "../Context/LoginContext";
import { AddProductStyled } from "../Styles/Theme/Login";

export type LoginProps = {
  authenticate: () => void;
};

export const Login = ({ authenticate }: LoginProps) => {
  const { userName, password, setUserName, setPassword } = useLoginContext();
  const { classes } = AddProductStyled();
  const navigate = useNavigate();
  const LoginHandler = () => {
    if (userName === UserName && password === Password) {
      authenticate();
      navigate("/add-product");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <Container size="lg">
      <div className={classes.Wrapper}>
        <Paper className={classes.Form} radius={0} px={30}>
          <Title
            order={2}
            className={classes.Title}
            align="center"
            mt="md"
            mb={50}
          >
            Enter Login Detais:
          </Title>

          <TextInput
            label="Username"
            placeholder="Enter Username:"
            size="sm"
            onChange={setUserName}
            value={userName}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter Password:"
            mt="md"
            size="sm"
            onChange={setPassword}
            value={password}
          />
          <Button fullWidth mt="xl" size="sm" onClick={LoginHandler}>
            Login
          </Button>
        </Paper>
      </div>
    </Container>
  );
};
