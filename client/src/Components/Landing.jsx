import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useState } from 'react';
import MainPage from './MainPage';
gsap.registerPlugin(ScrollTrigger);

function Landing() {
  const [Load,setLoad] = useState(false);
  const [start,setstart] = useState(false);
  useEffect(() => {
    if(start){
      gsap.to("#main", {
        z:1,
        duration: 1,
        left:"-5vw",
        top:"10vh",
        width:"80vw",
        height:"80vh",
      });
      gsap.to(".hid",{
        duration:0.7,
        opacity:0,
      });

      if(Load){
          gsap.to("#mainPage",{
             display:"block",
             y:-"100vh",
             z:10
        });
      }
    }
  }, [start,Load]);



  return (<>
    <div className="bg-[#D9B7EE] w-full h-[100vh] px-[120px] relative overflow-hidden">
      <div className="py-5 flex flex-row justify-between relative z-10 hid">
        <h1 className="text-[#7251B5] text-[90px] underline font-bold">CollaborateX</h1>
        <div className="flex flex-col p-0 hid">
          <h1 className="text-[#7251B5] text-[22px] hover:underline font-medium">Home</h1>
          <h1 className="text-[#7251B5] text-[22px] hover:underline font-medium">Boards</h1>
          <h1 className="text-[#7251B5] text-[22px] hover:underline font-medium">Explore</h1>
          <h1 className="text-[#7251B5] text-[22px] hover:underline font-medium">About</h1>
        </div>
      </div>

      <div className="relative z-10 hid">
        <h1 className="text-[#7251B5] text-[80px] leading-17 mt-10 font-semibold">
          Give Your <br /> Ideas the <br /> Space They <br /> Deserve !
        </h1>
      </div>

      <div
        id="main"
        className="absolute z-0 w-[50vw] h-[68vh] bottom-0 mx-55 bg-[#F4F4F4] opacity-80"
      ></div>

      <div className="relative z-10 flex flex-col justify-center px-100 pt-15 hid">
        <p className="text-[#5A3FA3] w-[400px] text-lg leading-relaxed">
          our collaborative whiteboard provides the <br />
          perfect space for every concept to grow.
        </p>
        <button className="mt-6 w-12 h-12 rounded-full bg-[#6C4CD4] hid cursor-pointer mx-40" onClick={()=>{
            setstart(true);
            setLoad(true);
        }}>
          <span className="text-white text-2xl">→</span>
        </button>
      </div>
    </div>
    <div
        id='mainPage' 
        className='display-none relative z-10'>
       <MainPage/>
    </div>
    </>
    );
}

export default Landing;
