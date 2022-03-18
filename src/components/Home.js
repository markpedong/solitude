import "../styles/_home.scss";

const Home = () => {
  return (
    <div className="content container">
      <div className="home_title_container">
        <p className="home_title">Affiliate Marketing</p>
        <p className="home_description text-start fw-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aliquid
          alias autem.
        </p>
      </div>

      <div className="home_header_container">
        <p className="featured_title fw-bold">
          <span>Featured Products</span>
        </p>
      </div>

      <div className="home_header_container">
        <p className="featured_title fw-bold">
          <span>All Products</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
