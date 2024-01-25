import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import { sliderItems } from "../../data";
import './slider.css';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <div className="container-slider">
      <div className="arrow arrow-left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div className="wrapper" style={{ transform: `translateX(${slideIndex * -100}vw)` }}>
        {sliderItems.map((item) => (
          <div className="slide" key={item.id} style={{ backgroundColor: `#${item.bg}` }}>
            <div className="img-container">
              <img src={item.img} alt="" className="image-slider" />
            </div>
            <div className="info-container-slider">
              <h1 className="title-slider">{item.title}</h1>
              <button className="button-slider">COMPRA AHORA</button>
            </div>
          </div>
        ))}
      </div>
      <div className="arrow arrow-right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;