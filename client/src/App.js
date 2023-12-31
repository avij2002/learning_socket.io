import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");
function App() {
  const [message, setMessageSend] = useState("");
  const [messageReceived, setmessageReceived] = useState("");
  const [room, setRoom] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setmessageReceived(data.message);
    });
  }, socket);
  return (
    <div className="App">
      <input
        placeholder="Enter Room Number"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      ></input>
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Message...."
        onChange={(event) => {
          setMessageSend(event.target.value);
        }}
      ></input>
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message</h1>
      {messageReceived}
    </div>
  );
}

export default App;
