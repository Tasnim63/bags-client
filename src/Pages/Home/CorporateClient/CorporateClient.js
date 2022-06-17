import React from "react";
import "./CorporateClient.css";
import rei from "../../../Images/companies/rei.png";
import arcTeryx from "../../../Images/companies/arc-teryx.png";
import deutor from "../../../Images/companies/deutor.png";
import gragory from "../../../Images/companies/gragory.png";
import kelty from "../../../Images/companies/kelty.png";
import marmot from "../../../Images/companies/marmot.png";
import northFace from "../../../Images/companies/north-face.png";
import ospray from "../../../Images/companies/ospray.png";
import { Zoom } from "react-reveal";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

const InstallApp = () => {
  return (
    <div className="installation-content">
      <div className="text-center mt-10">
        <span className="text-center text-2xl font-bold">Corporate </span>
        <span className="text-center text-2xl font-bold text-blue-400">
          Clientele
        </span>
      </div>

      <Zoom bottom cascade>
        <div className="companies mt-5 mb-10">
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            loop={true}
            breakpoints={{
              768: {
                width: 768,
                slidesPerView: 2,
              },
              200: {
                width: 200,
                slidesPerView: 1,
              },
            }}
            slidesPerGroup={1}
            pagination={{
              clickable: true,
            }}
            loopedSlides={9999}
            navigation={true}
            scrollbar={{ draggable: true }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="phone-container mx-auto">
                <img src={arcTeryx} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="phone-container mx-auto">
                <img src={rei} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="phone-container mx-auto">
                <img src={deutor} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="phone-container mx-auto">
                <img src={gragory} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="phone-container mx-auto">
                <img src={kelty} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="phone-container mx-auto">
                <img src={marmot} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="phone-container mx-auto">
                <img src={northFace} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="phone-container mx-auto">
                <img src={ospray} alt="" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {/*         
          
          
          
          
          
          
          
          
        */}
      </Zoom>
    </div>
  );
};

export default InstallApp;
