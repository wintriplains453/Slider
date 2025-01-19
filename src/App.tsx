import React, { useEffect, useState } from 'react';
import Slider from './components/Sliders/SliderMain/slider';
import SliderContent from './components/Sliders/SliderContent/sliderContent';

import './App.scss';

function App() {
  const [changeSliderId, setChangeSliderId] = useState(0)
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
        <div className="wrapper_content">
          <div className="history_date">
            <h1>Исторические даты</h1>
          </div>
          <Slider screenWidth={screenWidth} setChangeSliderId={setChangeSliderId}/>
          <SliderContent screenWidth={screenWidth} changeSliderId={changeSliderId}/>
        </div>
    </div>
  );
}

export default App;
