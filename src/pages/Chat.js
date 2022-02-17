import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import io from 'socket.io-client'
import "./Chat.css"
import Chat_send_recv from "./Chat_send_recv";

const socket = io.connect("http://localhost:3001");


function Chat() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        if (username !== "" && room !== ""){
            socket.emit("join_room", room);
        }
    }

    return (
        <>
        {Navbar()}
        <div className="Chat">
            <h3>Join A Chat</h3>
            <input type={"text"} placeholder="John..." onChange={(event) => {setUsername(event.target.value)}}></input>
            <input type={"text"} placeholder="Room ID..." onChange={(event) => {setRoom(event.target.value)}}></input>
            <button onClick={joinRoom}>Join A Room</button>

            <Chat_send_recv socket={socket} username={username} room={room} />
        </div>
        </>

    )
}

export default Chat;