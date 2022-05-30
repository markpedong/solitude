import { useMantineColorScheme } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import React, { createContext, useState } from "react";

type ChildType = {
  children: React.ReactNode;
};

type LoginContext = {
  userName: string;
  setUserName: (
    value: string | React.ChangeEvent<any> | null | undefined
  ) => void;
  password: string;
  setPassword: (
    value: string | React.ChangeEvent<any> | null | undefined
  ) => void;
  colorScheme: string;
  dark: boolean;
};

const LoginInterface = createContext({} as LoginContext);

export const LoginContext = ({ children }: ChildType) => {
  const [userName, setUserName] = useInputState("");
  const [password, setPassword] = useInputState("");

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <LoginInterface.Provider
      value={{
        userName,
        setUserName,
        password,
        setPassword,
        colorScheme,
        dark,
      }}
    >
      {children}
    </LoginInterface.Provider>
  );
};

export const useLoginContext = () => {
  return React.useContext(LoginInterface);
};
