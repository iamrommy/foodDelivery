import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaShare } from "react-icons/fa";
import copy from "copy-to-clipboard"
import { MdContentCopy } from "react-icons/md";
import toast from 'react-hot-toast';

const Home = () => {
  const [time, setTime] = useState(new Date());
  const [speedVal, setSpeedVal] = useState(1);
  const [quote, setQuote] = useState(true);
  const [shareUrl, setShareUrl] = useState('');

  const intervalRef = useRef(null);
  const { speed } = useParams();

  const fetchData = async () => {
    // const category = 'happiness';
    const apiKey = `${process.env.REACT_APP_API_KEY}`;
  
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        toast.error('Error fetching quotes')
      }
  
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Parse URL parameter and set initial speed on component mount
  useEffect(() => {
    const lastInteger = parseInt(speed.match(/\d+$/)[0], 10) || 1;
    setSpeedVal(lastInteger);

    const intervalId = setInterval(
      async () => {
      const quotesData = await fetchData();
      console.log(quotesData[0].quote)
      setQuote(quotesData[0]?.quote);
    }, 5000); // Run every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const updateClock = () => {
      setTime(prevTime => {
        const newTime = new Date(prevTime.getTime() - 1000 * speedVal);
        return newTime;
      });
    };

    clearInterval(intervalRef.current); // Clear previous interval
    intervalRef.current = setInterval(updateClock, 1000);

    return () => clearInterval(intervalRef.current); // Cleanup on component unmount
  }, [speedVal]);

  const handleSpeedChange = (e) => {
    const newSpeed = Number(e.target.value);
    setSpeedVal(newSpeed);
  };

  const getClockHandStyle = (degree) => ({
    transform: `rotate(${degree}deg)`,
  });

  const shareConfiguration = () => {
    const url = `${window.location.origin}/home/speed=${speedVal}`;
    setShareUrl(url);
    console.log('Share URL:', url);
  };

  const handlecopy = ()=>{
    copy(`${window.location.origin}/home/speed=${speedVal}`);
    toast.success('Copied to clipboard')
  }

  // Calculate degrees for clock hands (anticlockwise)
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const totalMinutes = hours * 60 + minutes; // Total minutes from the start of the day
  const countdownMinutes = 120 - totalMinutes; // Minutes remaining until 120 minutes earlier

  // Calculate the degree for each hand
  const hourDegrees = (countdownMinutes / 120) * 360 / 12; // Divide by 12 to scale to hours
  const minuteDegrees = (minutes / 60) * 360;
  const secondDegrees = (seconds / 60) * 360;

  return (
    <div className='h-screen w-full mt-8'>

    <div className="flex flex-col justify-center items-center space-y-10">
       <div className="w-36 h-10 flex items-center justify-center text-center border-2 border-black bg-[#FE8C00] text-lg font-bold">
        {hours} : {minutes} : {seconds}
       </div>
      <div className="relative w-64 h-64 bg-white border-4 border-black rounded-full">
        <div
          className="absolute bottom-1/2 left-1/2 w-2 h-24 bg-black origin-bottom"
          style={getClockHandStyle(hourDegrees)}
          ></div>
        <div
          className="absolute bottom-1/2 left-1/2 w-1 h-32 bg-black origin-bottom"
          style={getClockHandStyle(minuteDegrees)}
          ></div>
        <div
          className="absolute bottom-1/2 left-1/2 w-1 h-32 bg-[#FE8C00] origin-bottom"
          style={getClockHandStyle(secondDegrees)}
          ></div>
      </div>
      <input
        type="range"
        min="0.1"
        max="5"
        step="0.1"
        value={speedVal}
        onChange={handleSpeedChange}
        className="w-64 appearance-none bg-transparent rounded-full slider"
        style={{
          background: `linear-gradient(to right, #FE8C00 ${speedVal * 20}%, #d3d3d3 ${speedVal * 20}%)`,
        }}
        />
      <label className='text-xl font-bold'>Speed: {speedVal}x</label>
      <button onClick={shareConfiguration} className="bg-[#FE8C00] flex items-center gap-3 hover:bg-orange-500 text-black text-xl font-bold py-2 px-4 rounded">
        Share <FaShare />
      </button>
      {shareUrl && (
        <div className="mt-4">
          <div className='flex gap-3 items-center'><p className='text-lg font-medium'>Share this URL:</p> <MdContentCopy className='cursor-pointer' onClick={handlecopy}/></div>
          <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="underline text-base">{shareUrl}</a>
        </div>
      )}
    </div>
    {quote && 
      <div className='p-2 text-center flex flex-col justify-center items-center border-2 border-black bg-orange-100 rounded-lg my-5 mx-2'>
        <div className='text-2xl font-bold underline underline-offset-2'>
          Quote
        </div>
        <p className='text-lg'>
          {quote}
        </p>
      </div>
    }
      </div>
  );
};

export default Home;


