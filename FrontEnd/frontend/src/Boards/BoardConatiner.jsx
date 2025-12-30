import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Active from "./Active";
import Bord_Navbar from "./Bord_Navbar";
import Setting from "./Setting";
import Space from "./Space";
import Tools from "./Tools";
import LiveChat from "./LiveChat";

function BoardContainer() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [strokData, setstrokData] = useState({
    coll: "black",
    strokk: 5,
    opacc: 1,
    bgg: "white",
  });
  const [tools, settools] = useState("");
  const [image, setimage] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [roomId] = useState("room1");

  
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (!storedName) {
      navigate("/login");
    } else {
      setUsername(storedName);
    }
  }, [navigate]);

 
  useEffect(() => {
    const saved = localStorage.getItem("editBoard");
    if (saved) {
      const img = new Image();
      img.src = saved;
      img.onload = () => setimage(img);
      localStorage.removeItem("editBoard");
    }
  }, []);

  
  if (!username) return null;

  const shareLink = `${window.location.href}?room=${roomId}`;

  return (
    <div className="bg-[#D4B8EA] w-screen h-screen text-[#7251B5]">
      <Bord_Navbar
       roomId={roomId}       
        username={username} 
        shareLink={shareLink}
        toggleChat={() => setShowChat((p) => !p)}
        exportCanvas={() => {
          const canvas = document.querySelector("canvas");
          if (!canvas) return alert("Canvas not found!");
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = canvas.width;
          tempCanvas.height = canvas.height;
          const tempCtx = tempCanvas.getContext("2d");
          tempCtx.fillStyle = "white";
          tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
          tempCtx.drawImage(canvas, 0, 0);
          const dataURL = tempCanvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = dataURL;
          a.download = "whiteboard.png";
          a.click();
        }}
      />

      <Active />

      <div className="flex">
        <Setting update={setstrokData} />
        <Space
          data={strokData}
          toolsData={tools}
          image={image}
          roomId={roomId}
          username={username}
        />
        <Tools Tools={settools} imgs={setimage} />
      </div>

      {showChat && <LiveChat roomId={roomId} username={username} />}
    </div>
  );
}

export default BoardContainer;
