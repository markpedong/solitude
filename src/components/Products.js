import { Route, Routes } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";
import AllProducts from "./AllProducts";

const Products = () => {
  return (
    <div className="container" id="products_container">
      <h1>Products</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus
        illo nobis expedita, quia nemo illum ipsum sequi, nisi et aut earum ex,
        ea dolores molestias non rem provident adipisci quae.
      </p>

      <div className="home_header_container">
        <p className="featured_title">
          <span>Featured Products</span>
        </p>
        <Routes>
          <Route path="*" element={<FeaturedProducts />} />
        </Routes>
      </div>

      <div className="home_header_container">
        <p className="featured_title">
          <span>All Products</span>
        </p>

        <Routes>
          <Route path="*" element={<AllProducts />} />
        </Routes>
      </div>
    </div>
  );
};

export default Products;
