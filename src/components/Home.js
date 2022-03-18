import { Routes, Route } from "react-router-dom";
import "../styles/_home.scss";
import AllProducts from "./AllProducts";
import FeaturedProducts from "./FeaturedProducts";

const Home = () => {
  return (
    <div className="content container">
      <div className="home_title_container">
        <p className="home_title">Affiliate Marketing</p>
        <p className="home_description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          similique enim quia placeat optio delectus beatae, dolor voluptates
          natus inventore aperiam officia? Amet fugiat accusantium a natus,
          quidem ea et?
        </p>
      </div>

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

export default Home;
