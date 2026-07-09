import { useRef, useState, useEffect } from "react";


function Setting({update}){
        
    
   const [col,setcol] = useState("black");
   const [bg,setbg] = useState("white");
   const [strok,setstrok] = useState("");
   const [opac,setopac] = useState(1);
   
    
     useEffect(() => {
        console.log(col)
    update({
      coll: col,
      strokk: strok,
      opacc: opac,
      bgg:bg
    });
  }, [col, strok, opac,bg]);
   
  function clearCanvas(){

  }
    return(<>

        <div 
        className="w-[15vw]  h-[90vh] flex flex-col px-2 gap-7 pt-2 border-r-2 border-[#7251B5] bg-[#D4B8EA]">
            <div className="absolute mx-[11vw] mb-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.5v15m-7.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125"
                        />
                </svg>
            </div>
            <div className="mt-5">
            <h1 className="font-medium">Stroke</h1>
            <div onClick={()=>setcol("black")} className="bg-black w-0.5 h-7 absolute mt-2 ml-[9vw]"></div>
            <div className="flex flex-row gap-10">
            <div className="flex flex-wrap gap-2 px-2 mt-3">
                <h1 onClick={()=>setcol("white")}  className="w-5 h-5 bg-white rounded-xs"></h1>
                <h1 onClick={()=>setcol("red")}  className="w-5 h-5 bg-red-500 rounded-xs"></h1>
                <h1 onClick={()=>setcol("green")}  className="w-5 h-5 bg-green-500 rounded-xs"></h1>
                <h1 onClick={()=>setcol("blue")}  className="w-5 h-5 bg-blue-500 rounded-xs"></h1>
            </div>
                <input 
                type="color" 
                onChange={(e)=>setcol(e.target.value)}
                className="w-7 h-7 rounded-xl mt-2"/>
            </div>
            </div>


            
            <div className="">
            <h1 className="font-medium">Background</h1>
            <div className="bg-black w-0.5 h-7 absolute mt-2 ml-[7.5vw]"></div>
            <div className="flex flex-row gap-10">
            <label className="py-1 px-2 mt-2 border rounded-xl cursor-pointer">Add Image
            <input type="file" className="hidden" accept="/image*"/>
            </label>
                <input 
                type="color" 
                onChange={(e)=>{
                    const color = e.target.value;
                    setbg(color);
                }}
                className="w-7 h-7 rounded-xl mt-2"/>
            </div>
            </div>

            <div>
                <h1 className="font-medium">Stroke</h1>
                <input
                onChange={(e)=>setstrok(Number(e.target.value))}
                type="range"  
                min="1"
                max="100"
                value={strok}
                className="w-full"/>
            </div>

            
            <div>
  <h1 className="font-medium">Opacity</h1>
  <input
    onChange={(e) => setopac(Number(e.target.value))}
    type="range"
    min="0.1"
    max="1"
    step="0.01"  
    value={opac}
    className="w-full"
  />
</div>


            </div>
    </>
    )
}

export default  Setting