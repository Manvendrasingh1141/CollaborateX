import { Link } from "react-router-dom"
function Container(){
    return (
        <>
        <div className="bg-[#F4F4F4] w-[80vw] h-[80vh] mt-10 rounded-2xl overflow-hidden">
            <video 
            src="hero.mp4 "
            autoPlay
            muted
            loop
            ></video>
            </div>
            <div className="absolute z-0 top-[20vh] right-[15vw] flex flex-col">
              <Link to="/collaborateX" className="text-white text-[20px] hover:underline font-medium">Home</Link>
              <Link to="/boards" className="text-white text-[20px] hover:underline font-medium">Boards</Link>
              {/* <Link to="/profile" className="text-white text-[20px] hover:underline font-medium">Profile</Link> */}
            </div>
        </>
    )
}

export default Container  