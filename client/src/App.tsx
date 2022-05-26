import React, { useState } from "react";
import "./App.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { Navbar } from "./Pages/Navbar";
import { Route, Routes } from "react-router-dom";
import { Landing } from "./Pages/Landing";
import { About } from "./Pages/About";
import { Products } from "./Pages/Products";

export const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

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
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default App;
