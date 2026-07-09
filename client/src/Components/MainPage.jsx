import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function MainPage() {
    console.log("Page Loaded...")
    const features = gsap.utils.toArray(".features")
        features.forEach((feature)=>(
            gsap.to(feature,{
                x:"-100vw",
                duration:10,
                repeat:-1,
                ease:"none",
            })
        ))
    return(
        <div className="h-[200vh] w-full bg-[#D4B8EA] flex flex-col items-center relative z-10 overflow-hidden">
            <div className="bg-[#E4DAED] w-[80vw] h-[80vh] mt-10 rounded-2xl">
            </div>
            <div className="absolute z-0 top-[20vh] right-[15vw]">
              <h1 className="text-[#7251B5] text-[20px] hover:underline font-medium">Home</h1>
              <h1 className="text-[#7251B5] text-[20px] hover:underline font-medium">Boards</h1>
              <h1 className="text-[#7251B5] text-[20px] hover:underline font-medium">Explore</h1>
              <h1 className="text-[#7251B5] text-[20px] hover:underline font-medium">About</h1>
            </div>
            <div className='overflow-hidden w-[80vw]'>
            <div                 
                className="relative z-10 flex flex-row flex-nowrap justify-start w-screen mt-7 gap-[100px]  text-[#7251B5]">
                <h1 className='features  whitespace-nowrap shrink-0'>Live Drawing</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Remote Teamwork</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Online WhiteBoard</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Multi-User Editing</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Project Planning</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Live Drawing</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Remote Teamwork</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Online WhiteBoard</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Multi-User Editing</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Project Planning</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Live Drawing</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Remote Teamwork</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Online WhiteBoard</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Multi-User Editing</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Project Planning</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Live Drawing</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Remote Teamwork</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Online WhiteBoard</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Multi-User Editing</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Project Planning</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Live Drawing</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Remote Teamwork</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Online WhiteBoard</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Multi-User Editing</h1>
                <h1 className='features whitespace-nowrap shrink-0'>Project Planning</h1>


            </div>
            </div>
        </div>
    )
}

export default MainPage