import "bootstrap/dist/css/bootstrap.min.css";
import "open-props/normalize";
import "open-props/style";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavbarSec from "./components/Navbar";
import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarSec />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
