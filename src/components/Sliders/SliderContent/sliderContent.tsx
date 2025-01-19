import React, { FC, useEffect, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import data from '../sliderData'

import { Swiper, SwiperSlide } from 'swiper/react';

import gsap from "gsap";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import '../slider.scss'

interface ISliderContentProps {
  changeSliderId: number,
  screenWidth: number
}

const SliderContent: FC<ISliderContentProps> = ({changeSliderId, screenWidth}) => {
  const [dataSlider, setDataSlider] = useState(data.dataContent[0].posts)

  useEffect(() => {
    const sliderInfo = document.querySelector('#sliderInfo')
    gsap.to(sliderInfo, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          console.log(data.dataContent[changeSliderId])
            if(data.dataContent[changeSliderId] !== undefined) {
              setDataSlider(data.dataContent[changeSliderId].posts)
            }
            gsap.to(sliderInfo, {
                duration: 1,
                opacity: 1
            });
        }
    });
  }, [changeSliderId])



  return (
    <div className="sliderContent">
      {screenWidth > 1024 ?
        <div className="swiper-content-prev">
          <IoIosArrowBack className='swiper-content-arrow'/>
        </div> : null
      }
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        id='sliderInfo'
        slidesPerView={screenWidth > 1600 ? 4 : screenWidth > 1200 ? 3 : 2}
        navigation={{
          nextEl: '.swiper-content-next',
          prevEl: '.swiper-content-prev',
        }}
        effect="fade"
      >
        {dataSlider.map((item, index) => (
          <SwiperSlide key={index} className="cardSlider">
            <p className="sliderDate">{item.title}</p>
            <p className="sliderDescription">{item.description}</p>
          </SwiperSlide>          
        ))}

      </Swiper>  
      {screenWidth > 1024 ?
        <div className="swiper-content-next">
          <IoIosArrowForward className='swiper-content-arrow'/>  
        </div> : null
      }
  
    </div>

  );
};

export default SliderContent