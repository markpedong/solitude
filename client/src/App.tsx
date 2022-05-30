import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginContext, useLoginContext } from "./Context/LoginContext";
import { About } from "./Pages/About";
import { AddProduct } from "./Pages/AddProduct";
import { Error } from "./Pages/Error";
import { Landing } from "./Pages/Landing";
import { Login } from "./Pages/Login";
import { Navbar } from "./Pages/Navbar";
import { ProductDetail } from "./Pages/ProductDetail";
import { Products } from "./Pages/Products";

export const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const [checked, setChecked] = useState(false);

  return (
    <div className="App">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            fontFamily: "Inter",
          }}
          defaultProps={{
            Container: {
              sizes: {
                xs: 576,
                sm: 768,
                md: 992,
                lg: 1200,
                xl: 1400,
              },
            },
          }}
        >
          <Navbar />
          <LoginContext>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              {!checked && (
                <Route
                  path="/login"
                  element={<Login authenticate={() => setChecked(true)} />}
                />
              )}
              {checked && (
                <Route
                  path="/add-product"
                  element={
                    checked && (
                      <AddProduct authenticate={() => setChecked(false)} />
                    )
                  }
                />
              )}
              <Route path="*" element={<Error />} />
            </Routes>
          </LoginContext>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default App;
