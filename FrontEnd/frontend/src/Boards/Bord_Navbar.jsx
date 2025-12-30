function Bord_Navbar({ shareLink, toggleChat, exportCanvas ,roomId, username }) {
  return (
    <div className="w-full px-[100px] h-[10vh] border-b-2 border-[#7251B5] flex flex-row justify-between items-center">
      <h1 className="text-xl font-semibold">CollaborateX</h1>

      <div className="flex flex-row gap-5 justify-center ">
        {/* Add People */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(shareLink);
            alert("Shareable link copied to clipboard!");
          }}
          className="cursor-pointer"
        >
          <svg
            className="addPeople cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <circle cx="15" cy="8" r="4" fill="currentColor" />
            <path
              fill="currentColor"
              d="M15 20s8 0 8-2c0-2.4-3.9-5-8-5s-8 2.6-8 5c0 2 8 2 8 2M6 10V7H4v3H1v2h3v3h2v-3h3v-2z"
            />
          </svg>
        </button>



        {/* Live Chat */}
        <button onClick={toggleChat}>
          <svg
            className="livechat cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 14h8v-2H6zm0-3h12V9H6zm0-3h12V6H6zM2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z"
            />
          </svg>
        </button>
          {/* savedBoards */}
          <button
  onClick={async () => {
     const canvas = document.querySelector("canvas");
  if (!canvas) return alert("Canvas not found!");

  canvas.toBlob((blob) => {
    const formData = new FormData();
    formData.append("roomId", roomId);
    formData.append("username", username);
    formData.append("boardImage", blob, "board.png");

    fetch("http://localhost:3001/api/boards/saveBoard", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => alert("Board saved successfully!"))
      .catch(err => console.error(err));
  });
  }}
  className="border-2 border-[#7251B5] px-3 py-1 rounded-md cursor-pointer"
>
  Save
</button>

        {/* Export */}
        <button
          onClick={exportCanvas}
          className="border-2 border-[#7251B5] px-3 py-1 rounded-md cursor-pointer"
        >
          Export
        </button>
      </div>
    </div>
  );
}

export default Bord_Navbar;
