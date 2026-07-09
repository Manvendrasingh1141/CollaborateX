import { useState,useEffect, useRef } from "react"

function Tools({Tools,imgs}){
    const [tool,setTool] = useState("");
    useEffect(() => {
      Tools(tool);
      }, [tool]);
    
      const imageref =  useRef();

      function handleimage(e){
        const file = e.target.files[0];
        if(!file)return;

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = ()=>{
          imgs(img) 
        };;
      }
    

    return(
        <div className="w-[15vw] h-10 bg-white rounded-md shadow border-2 border-[#7251B5] absolute mt-[80vh] mx-[45vw] flex flex-row gap-5 items-center justify-center px-4">
          {/* pen  */}
          <h1>
            <svg
            onClick={()=>setTool("pen")}
            className="hover:border-2 rounded-xs cursor-pointer border-black" 
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m19.71 8.04l-2.34 2.33l-3.75-3.75l2.34-2.33c.39-.39 1.04-.39 1.41 0l2.34 2.34c.39.37.39 1.02 0 1.41M3 17.25L13.06 7.18l3.75 3.75L6.75 21H3zM16.62 5.04l-1.54 1.54l2.34 2.34l1.54-1.54zM15.36 11L13 8.64l-9 9.02V20h2.34z"
              />
            </svg>
          </h1>

          <h1>
            <svg 
            onClick={()=>setTool("eraser")}
            className="hover:border-2 rounded-xs cursor-pointer border-black" 
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.41 5.505C13.08 3.835 13.915 3 14.952 3c1.038 0 1.873.835 3.543 2.505S21 8.01 21 9.048c0 1.037-.835 1.872-2.505 3.542l-4.193 4.194l-7.086-7.086z"/>
            <path fill="currentColor" d="m6.156 10.759l7.085 7.085l-.65.65c-.378.379-.713.714-1.018 1.006H21a.75.75 0 0 1 0 1.5H9c-1.016-.025-1.85-.86-3.495-2.505C3.835 16.825 3 15.99 3 14.952c0-1.037.835-1.872 2.505-3.542z"/></svg>
          </h1>

          <h1>
            <svg 
            onClick={()=>{setTool("files");
              imageref.current.click();
            }}
            className="hover:border-2 rounded-xs cursor-pointer border-black" 
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M14 11a3 3 0 0 1-3-3V4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-8zm-2-3a2 2 0 0 0 2 2h3.59L12 4.41zM7 3h5l7 7v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3"
              />
            </svg>
              <input
             type="file"
             ref={imageref}
             accept="image/*"
             hidden
             onChange={handleimage}/>
          </h1>


            <div className="flex gap--1">
            <button
            onClick={()=>setTool("clear")}
            className="hover:border-2 rounded-xs cursor-pointer border-black" 
            > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-3 12.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12"/>
    </svg>
            </button>
            </div>
        </div>
    )
}

export default Tools