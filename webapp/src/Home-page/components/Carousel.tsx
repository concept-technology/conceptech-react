import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import bgImage1 from '../../assets/img/bg1.jpg';
import bgImage2 from '../../assets/img/bg2.jpg';
import bgImage3 from '../../assets/img/bg4.jpg';
import {  Pagination, EffectFade, Autoplay } from 'swiper/modules';


const CarouselComponent = () => {
  return (
    <header className="header pos-re slider-fade" data-scroll-index="0" >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]} // Include modules
        slidesPerView={1} // Show one slide at a time
        loop={true}
        autoplay={{ delay: 4000 }}
        effect="fade" // Use fade effect
        pagination={{ clickable: true }} // Show pagination dots
        speed={1000} // Adjust the speed
        className="swiper-container"
        style={{ height: '100vh', width: '100%' }}
        
      >
        <div id='swiper'>
        <SwiperSlide>
          
          <div className="item bg-img" data-overlay-dark="5" style={{ backgroundImage: `url(${bgImage3})` }} >
            <div className="text-center v-middle caption mt-30" >
              <h4>We</h4>
              <h1>Drive Innovation</h1>
              <div className="row">
                <div className="offset-md-1 col-md-10 offset-lg-2 col-lg-8">
                  <p>Building seamless digital ecosystems to drive efficiency and growth.</p>
                </div>
              </div>
              <a href="#0" className="butn butn-light mt-30">
                <span>Explore Our Services</span>
              </a>
            </div>
          </div>
        </SwiperSlide>
        </div>

        <div id='swiper'>
        <SwiperSlide>
          <div className="item bg-img" data-overlay-dark="5" style={{ backgroundImage: `url(${bgImage1})` }}>
            <div className="text-center v-middle caption mt-30" >
              <h4>Empower Businesses</h4>
              <h1>Through Cutting-Edge Technologies</h1>
              <div className="row">
                <div className="offset-md-1 col-md-10 offset-lg-2 col-lg-8">
                  <p>Harnessing the latest in technology to elevate business performance.</p>
                </div>
              </div>
              <a href="#0" className="butn butn-light mt-30">
                <span>Explore Our Services</span>
              </a>
            </div>
          </div>
        </SwiperSlide>
        </div>

        <div id='swiper'>
        <SwiperSlide>
          <div className="item bg-img" data-overlay-dark="5" style={{ backgroundImage: `url(${bgImage2})` }}>
            <div className="text-center v-middle caption mt-30">
              <h4>Transforming Ideas</h4>
              <h1>into Digital Solutions with Advanced Technologies</h1>
              <div className="row">
                <div className="offset-md-1 col-md-10 offset-lg-2 col-lg-8">
                  <p>From concept to execution, delivering tailored software solutions for modern challenges.</p>
                </div>
              </div>
              <a href="#0" className="butn butn-light mt-30">
                <span>Explore Our Services</span>
              </a>
            </div>
          </div>
        </SwiperSlide>
        </div>
      </Swiper>
    </header>
  );
};

export default CarouselComponent;
