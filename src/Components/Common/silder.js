import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { SVG } from "../../Helpers/svgFiles";

// Import Swiper styles
// import './swiper/swiper.scss';
import "./owl.css";
const OwlDemo = () => {
  return (
    <div>
      <div class="container-fluid">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          direction="vertical"
          mousewheel={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <img src={SVG.Bangaloreone} />{" "}
          </SwiperSlide>
          <SwiperSlide>
            <img src={SVG.Bangaloretwo} />{" "}
          </SwiperSlide>
          <SwiperSlide>
            <img src={SVG.Bangalorethree} />{" "}
          </SwiperSlide>
          <SwiperSlide>
            <img src={SVG.Bangalorefour} />{" "}
          </SwiperSlide>
          <SwiperSlide>
            <img src={SVG.Bangaloreone} />{" "}
          </SwiperSlide>
          <SwiperSlide>
            <img src={SVG.Bangaloretwo} />{" "}
          </SwiperSlide>
          <SwiperSlide>
            <img src={SVG.Bangalorethree} />{" "}
          </SwiperSlide>
          <SwiperSlide>
            <img src={SVG.Bangalorefour} />{" "}
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default OwlDemo;
