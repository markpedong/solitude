import "../styles/_productdetails.scss";
import amazon from "../images/amazon.svg";
import lazada from "../images/lazada.svg";
import shopee from "../images/shopee.svg";

const ProductDetails = () => {
  return (
    <div className="content container">
      <div className="product_details_container row">
        <div className="col-6">
          <img src={require("../images/food.jpg")} className="img_product" />
        </div>
        <div className="details_container col-6">
          <p className="details_title">
            Yummy Foods with vegetables and many more Items
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
            explicabo enim eligendi doloremque assumenda recusandae ab corrupti,
            est perferendis nihil, in velit laboriosam sunt animi ullam placeat
            perspiciatis voluptate atque incidunt dolores! Dolores sequi
            accusamus, repudiandae voluptate ad dolore quo aut quia, sunt,
            aperiam vel nulla deleniti dicta temporibus nostrum!
          </p>
        </div>
        <div className="details_links col-12 row justify-content-center">
          <div className="col-4" id="links_img_container">
            <img src={amazon} className="link_img" alt="img_product" />
          </div>
          <div className="col-8" id="links_details">
            <p className="link_price">Price:</p>
            <p className="link_price">₱ 3,900.00</p>
            <p className="link_site">https://lazada.ph/TEST-3123213</p>
          </div>
        </div>
        <div className="details_links col-12 row justify-content-center">
          <div className="col-4" id="links_img_container">
            <img src={lazada} className="link_img" alt="img_product" />
          </div>
          <div className="col-8" id="links_details">
            <p className="link_price">Price:</p>
            <p className="link_price">₱ 3,900.00</p>
            <p className="link_site">https://amazon.ph/TEST-12312312312</p>
          </div>
        </div>
        <div className="details_links col-12 row justify-content-center">
          <div className="col-4" id="links_img_container">
            <img src={shopee} className="link_img" alt="img_product" />
          </div>
          <div className="col-8" id="links_details">
            <p className="link_price">Price:</p>
            <p className="link_price">₱ 3,900.00</p>
            <p className="link_site">
              https://shopee.ph/TEST-LINK3123213213123123213123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
