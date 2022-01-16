import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);
//uses custom hook to
const Swipper = (props) => {
  const [documents] = props.documents;
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      className="mySwiper"
    >
      {!documents ? (
        <span>loading..</span>
      ) : (
        documents.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.data().image} key={item.id} alt="" />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default Swipper;
