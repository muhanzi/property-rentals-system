import React from "react";
import { Slide, Fade } from "react-slideshow-image";
import image1 from "../../pictures/image1.jpg";
import image2 from "../../pictures/image2.jpg";
import image3 from "../../pictures/image3.jpeg";
import image4 from "../../pictures/image4.jpg";
import "./styles/slider_styles.css";
import project from "./static";
import GoogleFont from "./fonts/googleFont";

const isSmallDevice = () => {
  if (!project().check_width) {
    return {
      span1: 40,
      span2: 25,
    };
  } else {
    return {
      span1: 30,
      span2: 18,
    };
  }
};

const styles = {
  color: "white",
  fontWeight: "bolder",
  fontSize: isSmallDevice().span1,
};
const styles_2 = {
  color: "white",
  fontWeight: "bolder",
  fontSize: isSmallDevice().span2,
};

const slideImages = [
  {
    img: image1,
    description: "Single Rooms",
  },
  {
    img: image2,
    description: "Double Rooms",
  },
  {
    img: image3,
    description: "Apartments",
  },
  {
    img: image4,
    description: "Houses",
  },
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};

function Slider() {
  return (
    <Slide {...properties}>
      {slideImages.map((slide) => {
        return (
          <div className="each-slide">
            <div
              style={{
                backgroundImage: `url(${slide.img})`,
                opacity: 1, // 0.7
              }}
            >
              <span style={{ opacity: 1 }}>
                {/* <span style={{ opacity: 0.8 }}> */}
                <h3 style={styles}>
                  <GoogleFont
                    text={slide.description}
                    fontfamily={"tangerine"}
                  />
                </h3>
              </span>
            </div>
          </div>
        );
      })}
    </Slide>
  );
}
export default Slider;
