import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join__room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3> Intra in camera</h3>
          <input
            type="text"
            placeholder="Nume..."
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            placeholder="ID Camera..."
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Conecteaza-te</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
