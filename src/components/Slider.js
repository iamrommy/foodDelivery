import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Circle } from '../assets/circle.svg';
import { ReactComponent as Lightcircle } from '../assets/lightcircle.svg';
import { ReactComponent as Arrow } from '../assets/arrow.svg';

const Slider = ({slider, setSlider}) => {
    const arr = [1,2,3];

    const navigate = useNavigate();

    const cardContents = [
        {
          heading: "We serve incomparable delicacies",
          subheading: "All the best restaurants with their top menu waiting for you, they can’t wait for your order!!"
        },
        {
          heading: "Delight in Every Bite",
          subheading: "Discover a variety of dishes from the finest chefs, ready to be delivered to your doorstep!"
        },
        {
          heading: "Taste the Excellence",
          subheading: "Enjoy gourmet meals from top-rated restaurants, crafted to perfection and delivered with care."
        }
      ];
        
  return (
    <div className='absolute bottom-7 w-full'>
      <div className={`w-[311px] h-[400px] rounded-[48px] bg-[#FE8C00] mx-auto text-white flex flex-col ${slider !== 3 && 'justify-between'}`}>
        <div className='px-5 pt-5'>
            <div className='h-[200px]'>
                <div className='text-[32px] text-center mt-2 font-semibold font leading-tight'>
                    {cardContents[slider-1].heading}
                </div>
                <div className='text-[14px] m-3 text-center'>
                    {cardContents[slider-1].subheading}
                </div>
            </div>        
            <div className='flex gap-1 justify-center'>
                {arr.map((item, index) => (
                    <span className={`w-[24px] h-[6px] mt-2 rounded-[100px] transition-all duration-300 ease-in-out ${item === slider ? 'bg-white' : 'bg-[#C2C2C2]'}`} key={index}></span>
                ))}
            </div>
        </div>
        {
            slider === 3 ? (
            <div className='flex justify-center items-center h-40'>
                <Lightcircle className='absolute' onClick={()=>navigate('/login')}/>
                <Circle className='absolute cursor-pointer' onClick={()=>navigate('/login')}/>
                <div className='w-[62px] h-[62px] bg-white rounded-full absolute cursor-pointer' onClick={()=>navigate('/login')}></div>
                <Arrow className='z-20  cursor-pointer' onClick={()=>navigate('/login')}/>
            </div>
            ) : (
              <div className='flex justify-between text-[14px] items-center m-8 font-semibold'>
                <button onClick={()=>navigate('/login')}>
                    Skip
                </button>
                <button className='flex gap-2' onClick={()=>setSlider(slider + 1)}>
                    Next <FaArrowRightLong className='text-[18px] mt-[2px]'/>
                </button>
            </div>
            )
        }
        
      </div>
    </div>
  )
}

export default Slider
