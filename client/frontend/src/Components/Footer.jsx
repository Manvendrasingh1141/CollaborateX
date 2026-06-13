import { Link } from "react-router-dom"

function Footer(){
    return(
        <>
        <div className="w-[80%] h-px mt-30 bg-black"></div>
        <div className="w-full  flex flex-col  px-[150px] mt-10 text-[#7251B5]">
            <div className="row flex flex-row justify-between ">
                <div className="text-xl font-medium ">CollaborateX</div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-medium">Product</h1>
                    <div>
                        <Link to="/boards">Online WhiteBoard</Link> <br/>
                        <Link to="/explore">Template Gallery</Link><br/>
                        <Link to="/collaborateX">Features & Tools</Link>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-medium">Company</h1>
                    <div>
                        <h1>About Us</h1>
                        <h1>Blog</h1>
                        <h1>Contact Us</h1>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-medium">Legal</h1>
                    <div>
                        <h1>Terms of Service</h1>
                        <h1>Privacy Policy</h1>
                        <h1>Cookie Prefernces</h1>
                    </div>
                </div>
            </div>
            <div className="col text-center my-5">
                © 2025 CollaborateX<br></br> 
          All rights reserved. 
            </div>
        </div>
        </>
    )
}

export default Footer