import React, { useState } from "react";
import Slider from "../components/Slider";
import bg1 from "../assets/bg-1.png";
import bg2 from "../assets/bg-2.png";
import bg3 from "../assets/bg-3.png";

const Onboard = () => {
  const [slider, setSlider] = useState(1);
  const bg = [bg1, bg2, bg3];
  return (
    <div className="">

      {bg.map((item, index) => (
                      <div
                      className={`absolute ${"-z-"+index+"0"} top-0 w-full h-full bg-cover bg-center transition-all duration-300 ease-in-out ${(slider > index+1) && "opacity-0"}`}
                      style={{ backgroundImage: `url(${item})` }} key={index}
                    ></div>  
                ))}
      {/* <div
        className={`absolute -z-10 top-0 w-full h-full bg-cover bg-center transition-all duration-300 ease-in-out ${slider > 1 && "opacity-0"}`}
        style={{ backgroundImage: `url(${bg1})` }}
      ></div>
      <div
        className={`absolute -z-20 top-0 w-full h-full bg-cover bg-center transition-all duration-300 ease-in-out ${slider > 2 && "opacity-0"}`}
        style={{ backgroundImage: `url(${bg2})` }}
      ></div>
      <div
        className="absolute -z-30 top-0 w-full h-full bg-cover bg-center transition-all duration-300 ease-in-out"
        style={{ backgroundImage: `url(${bg3})` }}
      ></div> */}
      <Slider slider={slider} setSlider={setSlider} />
    </div>
  );
};

export default Onboard;
