import { useEffect, useState, useRef } from "react";
import { socket, connectSocket } from "../socket";

function LiveChat({ roomId, username }) {
  const messagesRef = useRef([]);
  const [messages, setMessages] = useState(messagesRef.current);
  const [input, setInput] = useState("");
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    
    connectSocket(roomId, username);

    const handleMessage = (msg) => {
      messagesRef.current = [...messagesRef.current, msg];
      setMessages(messagesRef.current);
    };

    socket.on("message", handleMessage);
    socket.on("typing", (user) => setTypingUser(user));
    socket.on("stopTyping", () => setTypingUser(""));

    return () => {
      socket.off("message", handleMessage);
      socket.off("typing");
      socket.off("stopTyping");
     
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("message", { roomId, text: input, username });
    socket.emit("stopTyping", { roomId, username });
    setInput("");
  };


  return (
    <div className="absolute right-0 top-[10vh] w-[30vw] h-[90vh] flex flex-col bg-white border-l-2 border-[#7251B5]">
      
      <div className="h-14 bg-[#7251B5] text-white flex items-center px-4 font-semibold">
        Live Chat
      </div>

    
      <div className="flex-1 overflow-y-auto p-3 bg-white space-y-2">
        {messages.map((m, i) => {
          const isMe = m.username === username;
          const isSystem = m.username === "System";
          if (isSystem)
            return (
              <div key={i} className="text-center text-xs text-gray-500">
                {m.text}
              </div>
            );
          return (
            <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] px-3 py-2 rounded-xl text-sm shadow ${
                  isMe ? "bg-[#7251B5] text-white" : "bg-white border text-black"
                }`}
              >
                {!isMe && <p className="text-xs font-semibold text-[#7251B5]">{m.username}</p>}
                {m.text}
              </div>
            </div>
          );
        })}
        {typingUser && typingUser !== username && (
          <p className="text-sm italic text-gray-400">{typingUser} is typing...</p>
        )}
      </div>

     
      <div className="p-3 bg-white flex gap-2 border-t">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            socket.emit(e.target.value ? "typing" : "stopTyping", { roomId, username });
          }}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-full border outline-none"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-[#7251B5] text-white px-5 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default LiveChat;
