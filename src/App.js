import "bootstrap/dist/css/bootstrap.min.css";
import "open-props/normalize";
import "open-props/style";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavbarSec from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarSec />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/*" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
