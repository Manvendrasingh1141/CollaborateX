import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import MainPage from '../MainPage/MainPage';
gsap.registerPlugin(ScrollTrigger);
function Landing() {
  const [start,setstart] = useState(false);
  const contain = useRef();
  const mainn = useRef();
  useEffect(() => {
    var tl = gsap.timeline();
    if(!start){
      tl.to(contain.current,{   
        display:"none"
      },-1)
    }
    if(start){
      tl.to("#main", {
        z:1,
        duration: 1,
        borderRadius:"20px",
        left:"-5vw",
        top:"10vh",
        width:"80vw",
        height:"80vh",
        display:"block"
      });

      tl.to(".hid",{
        duration:0.1,
        opacity:0,
      },-1);
      tl.to(contain.current,{
        // y:"-100vh",
        height:`150vh`,
        display:"block",

      })
      tl.to("#main",{
        display:"none",
        opacity:0,
        display:-1
      })
      
      tl.from(contain.current,{
        scale:0,
        duration:2
      },-1)
    }
  }, [start,contain.current]);
  
  return (<>
      <div 
        className='display-none  relative z-10  'ref={contain}>
        <MainPage/>
    </div>
    <div className="bg-[#D9B7EE] w-full h-screen px-[120px] relative overflow-hidden ">
      <div className="py-3 flex flex-row justify-between relative z-10 hid">
        <h1 className="text-[#7251B5] text-[90px] underline font-bold">CollaborateX</h1>
        <div className="flex flex-col hid gap-1 font-medium mt-5 justify-center ">
          <Link to="/collaborateX" className="text-[#7251B5] text-lg">Home</Link>
          <Link to="/boards" className="text-[#7251B5] text-lg">Boards</Link>      
          <Link to="/login" className="text-white bg-[#6C4CD4] hid cursor-pointer  rounded-md 
          w-20 h-8 flex items-center justify-center">Register</Link>
        </div>

      </div>

      <div className="relative z-10 hid">
        <h1 className="text-[#7251B5] text-[80px] leading-17 mt-4 font-semibold">
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
        <button className="mt-6 w-12 h-12 rounded-full bg-[#6C4CD4] hid cursor-pointer mx-40" ref={mainn} onClick={()=>{
            setstart(true) ;
        }}>
          <span className="text-white text-2xl">→</span>
        </button>
      </div>
    </div>

    </>
    );
}

export default Landing;
