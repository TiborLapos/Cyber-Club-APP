import io from "socket.io-client";
import {React, useState,Component,useEffect } from "react";
import Chats_room from "./Chats_room";
import Menu from "./struct/Menu";
import Navbar from "./Navbar";
import "./Chat.css"
import { result } from "lodash";
const { ipcRenderer } = window.require("electron");
const socket = io.connect("http://localhost:3001");



var mysql = window.require('mysql');

function Database(res){
    var data = []
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        port : 8889,
        database : 'loginsystem'
    });
        // make to connection to the database.
        connection.connect(function(err) {
            if (err) throw err;
            // if connection is successful
            connection.query("SELECT * FROM chat_room", function (err, result, fields) {
            // if any error while executing above query, throw error
            if (err) throw err;
            // if there is no error, you have the result
            // iterate for all the rows in result
                Object.keys(result).forEach(function(key) {
                    var data = result[key];
                    //console.log(data.name)
                   res(data)
                });
            });
        });
}


function Test() {
    const [data, setData] = useState([]);
    const [room, setRoom] = useState("");
    var  local_name = localStorage.getItem('u_name');
    const [showChat, setShowChat] = useState(false);


    console.log(socket.connected);

    const joinRoom = () => {
        if (local_name !== "" && room !== "") {
          //ipcRenderer.send('notify');
          socket.emit("join_room", room);
          setShowChat(true);
        }
      };


    useEffect(() => {     
        Database((res) => {
            //console.log("Room Name: ",res); // results of the query
            setData((list) => [...list, res]);
        })  
      },      
    [ ])     
    const Printroom = () => {
        console.log(room)
    }
  
    return (
        <div>
        {Navbar()}
            <div className="ChatContent">
            {Menu()}
            {!showChat ? (
                <div className="joinChatContainer">
                    <h1>Join to Room</h1>
                    <ul>
                    {data.map(item => {
                        return(
                                <button key={item.room_id} onMouseDown={() => setRoom(item.room_id)} onMouseUp={() => [joinRoom(),localStorage.setItem('room_name', item.room_name)]}>{item.room_name}</button>
                        )
                    })}
                </ul>
               </div>
            ) : (
                <Chats_room socket={socket} username={local_name} room={room} />
            )}
         
            </div>
        </div>
        
      );
}

export default Test;