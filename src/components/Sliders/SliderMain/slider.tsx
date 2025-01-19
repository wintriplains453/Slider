import React, { FC, useEffect, useRef, useState } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Controller  } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import gsap from "gsap";

import data from '../sliderData'
import SliderItem from './interfaceSlider';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/effect-fade';

import '../slider.scss';

interface ISliderProps {
  setChangeSliderId: React.Dispatch<React.SetStateAction<number>>,
  screenWidth: number
}

const Slider: FC<ISliderProps> = ({setChangeSliderId, screenWidth}) => {
  const [mainSliderState, setMainSliderState] = useState(0);
  const [selectedItem, setSelectedItem] = useState<SliderItem | null>(null);
  const [previousItem, setPreviousItem] = useState<SliderItem | null>(null);
  const [sliderItems] = useState(data.sliderDate);
  const [bulletLabels] = useState(data.bulletLabel)
  const [currentLabel, setCurrentLabel] = useState(0)

  const blueRef = useRef<HTMLDivElement | null>(null);
  const pinkRef = useRef<HTMLDivElement | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    let bullet = swiper.pagination.bullets
    let cyrcle = swiper.pagination.el

    bullet.forEach((item: HTMLElement, index: number) => { 
      if(item.classList.contains('bullet-wrapper-custom-active')) {
        bullet.forEach((elem: HTMLElement) => {
          const firstChild = elem.firstChild;

          if (firstChild instanceof HTMLElement) {
            firstChild.style.transform = `rotate(${index * 60}deg)`
          }           
        })
    
        cyrcle.style.transform = `translate(-50%, -50%) rotate(${360-index*60}deg)`
        setChangeSliderId(index)
        return;
      } else if(item.classList.contains("swiper-pagination-bullet-active")) {
        setCurrentLabel(index)
      }
    })

    setSelectedItem((previous) => {
      setPreviousItem(previous)
      return sliderItems[swiper.activeIndex]
    })
    setMainSliderState(swiper.activeIndex);
  };


  useEffect(() => {
    if (!previousItem || !selectedItem) return;

    const startValueBlue = previousItem.blueText;
    const endValueBlue = selectedItem.blueText;

    const startValuePink = previousItem.pinkText; 
    const endValuePink = selectedItem.pinkText;

    gsap.to({ value: startValueBlue }, {
      value: endValueBlue,
      duration: 0.7, 
      onUpdate: function () {
        if (blueRef.current) {
          blueRef.current.innerText = Math.round(this.targets()[0].value).toString();
        }
      },
    });
    gsap.to({ value: startValuePink }, {
      value: endValuePink,
      duration: 0.7, 
      onUpdate: function () {
        if (pinkRef.current) {
          pinkRef.current.innerText = Math.round(this.targets()[0].value).toString();
        }
      },
    });
    // eslint-disable-next-line
  }, [mainSliderState]);

  const createBullet = (swiper: SwiperType) => {
    let bullet = swiper.pagination.bullets

    bullet.forEach((item: HTMLElement, index: number) => {

      const p = document.createElement('p');
      p.textContent = (index+1).toString();
      p.className = "bullet-content"

      const text = document.createElement('p');
      text.textContent = bulletLabels[index].name;
      text.className = "bullet-text"

      const div = document.createElement('div');
      div.className = "bulletBox"

      div.appendChild(p)
      div.appendChild(text)

      item.appendChild(div)

      div.style.transform = `rotate(${(360-index*60*-1)}deg)`
    })
  }

  return (
    <div className="mainSlider">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Controller]}
        spaceBetween={50}
        slidesPerView={1}
        centeredSlides={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        effect="fade"
        loop={true}
        pagination={{
          clickable: true,
          bulletClass: screenWidth < 1024 ? 'swiper-pagination-bullet' : 'bullet-wrapper-custom', 
          bulletActiveClass: screenWidth < 1024 ? 'swiper-pagination-bullet-active' : 'bullet-wrapper-custom-active', 
        }}
        onSlideChange={handleSlideChange}
        onInit={createBullet}
      >
        {sliderItems ?
          <>
            {sliderItems.map((item, index) => (
              <SwiperSlide 
                key={index} 
              >
                <p ref={blueRef} className="blue_text">{item.blueText}</p>
                <p className="pink_text">{item.pinkText}</p>
              </SwiperSlide>
            ))}          
          </> : null
        }

      </Swiper> 
      <div className='labelSlider'>
        <p>{bulletLabels[currentLabel].name}</p>
      </div>
      <div className="custom-navigation">
        <div className="slide-indicator">
          0{mainSliderState + 1}/0{sliderItems.length}
        </div>
        <div className='custom-navigation-btn-wrapper'>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>          
        </div>
      </div>     
    </div>
  );
};

export default Slider
