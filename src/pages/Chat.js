import io from "socket.io-client";
import { useState,Component } from "react";
import Chats_room from "./Chats_room";
import Menu from "./struct/Menu";
import Navbar from "./Navbar";
import "./Chat.css"
const { ipcRenderer } = window.require("electron");
const socket = io.connect("http://localhost:3001");


function Chat() {
  console.log(socket.socket.connected);
  console.log(socket.socket.connecting);

  socket.on('connect', function () {
    console.log('Socket is connected.');
  });
  
  socket.on('disconnect', function () {
    console.log('Socket is disconnected.');
  });
  
  

  var  local_name = localStorage.getItem('u_name');
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom = () => {
    if (local_name !== "" && room !== "") {
      ipcRenderer.send('notify');
      localStorage.setItem('room_name', room);
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  /*
  <input
      type="text"
      placeholder="Room ID..."
      onChange={(event) => {
      setRoom(event.target.value);
      }}
  />
  */
  return (
    <div className="ChatApp">
    {Navbar()}
        <div className="ChatContent">
        {Menu()}
            {!showChat ? (
                <div className="joinChatContainer">
                <h3>Join A Chat</h3>
                <button onMouseDown={() => { setRoom("room1"); }} onMouseUp={() => [joinRoom()]}>Room1</button>
                <button onMouseDown={() => {setRoom("room2")}} onMouseUp={() => [joinRoom()]}>Room2</button>
                </div>
            ) : (
                <Chats_room socket={socket} username={local_name} room={room} />
            )}
        </div>
    </div>
  );
}

export default Chat;