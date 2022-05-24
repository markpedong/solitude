import "bootstrap/dist/css/bootstrap.min.css";
import "open-props/normalize";
import "open-props/style";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import NavbarSec from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import ProductsData from "./data/products";
import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarSec placeholder={"Search"} data={ProductsData} />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/*" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
