import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [editing, setEditing] = useState(false);
  const [firstname, setFirstname] = useState(storedUser?.firstname || "");
  const [lastname, setLastname] = useState(storedUser?.lastname || "");
  const [photo, setPhoto] = useState(storedUser?.photo || "");
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (!user) return;

    
    axios.get(`http://localhost:3001/user/${user.email}/boards`)
      .then(res => setBoards(res.data.boards))
      .catch(err => console.log(err));
  }, [user]);

  const handleSave = () => {
    if (!user) return;

    axios.put(`http://localhost:3001/user/${user.email}`, { firstname, lastname, photo })
      .then(res => {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  if (!user) return null;

  return (
    <div className="w-screen min-h-screen bg-[#D4B8EA] p-10 flex flex-col items-center">
      <div className="bg-white w-[60%] rounded-2xl p-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {/* User Photo */}
        <div className="mb-6">
          <img
            src={photo || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover"
          />
        </div>

        
        {editing ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <input
              className="outline-none border-b w-1/2"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className="outline-none border-b w-1/2"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              className="outline-none border-b w-1/2"
              placeholder="Photo URL"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
            <button
              onClick={handleSave}
              className="bg-[#2E2E2E] text-white px-4 py-2 rounded-2xl mt-4"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-semibold">{user.firstname} {user.lastname}</h2>
            <p className="text-gray-600">{user.email}</p>
            <button
              onClick={() => setEditing(true)}
              className="bg-[#7251B5] text-white px-4 py-2 rounded-2xl mt-4"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* Past Boards */}
        <div className="mt-10 w-full">
          <h2 className="text-xl font-bold mb-4">My Past Boards</h2>
          {boards.length === 0 ? (
            <p>No boards yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {boards.map((board, index) => (
                <div key={index} className="bg-[#F3F3F3] p-4 rounded-xl">
                  <h3 className="font-semibold">{board.title}</h3>
                  <p className="text-gray-600 text-sm">{new Date(board.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
