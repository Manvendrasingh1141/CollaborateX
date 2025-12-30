import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SavedBoards() {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const encodedUsername = encodeURIComponent(username); 

  useEffect(() => {
    fetch(`http://localhost:3001/api/boards/savedBoards/${encodedUsername}`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(setBoards)
      .catch(err => console.error("Fetch error:", err));
  }, [encodedUsername]);

  return (
    <div className="bg-[#D4B8EA] w-screen h-screen text-[#7251B5] p-5 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-5">Saved Boards</h1>
      <div className="grid grid-cols-3 gap-5">
        {boards.map((b) => (
          <div
            key={b._id}
            className="border-2 border-[#7251B5] rounded shadow cursor-pointer"
            onClick={() => {
              localStorage.setItem("editBoard", b.dataURL);
              navigate("/board"); 
            }}
          >
            <img src={b.dataURL} alt="board" className="w-full h-48 object-contain" />
            <p className="text-sm text-gray-500 text-center">
              {new Date(b.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedBoards;
