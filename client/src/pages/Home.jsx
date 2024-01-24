import React from "react";
import Newsletter from "../components/Newsletter/Newsletter";
import Products from "../components/Products/Products";
import Slider from "../components/Slider/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <Products />
      <Newsletter />
    </div>
  );
};

export default Home;
