import {React, useState,Component,useEffect,ReactDOM } from "react";
import Menu from "./struct/Menu";
import Navbar from "./Navbar";
import { values } from "lodash";
import { nanoid } from 'nanoid'
import { customAlphabet } from 'nanoid'







var mysql = window.require('mysql');




function Test() {
    const [room, setRoom] = useState("");

    function Database(props){
        var con = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'root',
            port : 8889,
            database : 'loginsystem'
        });
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO chat_room (room_name,room_id, room_creator_uiid) VALUES (?, ?, ?)";
            const alphabet = '@#$1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const nanoid = customAlphabet(alphabet)
            const room_id = nanoid(40) //=> "f01a2"
            var localUUID = localStorage.getItem("uuid")
            var room_name = room
            con.query(sql,[room_name,room_id,localUUID], function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
            });
          });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        Database()
        setRoom("")
      }
    

    return (
        <div>
        {Navbar()}
            <div className="ChatContent">
            {Menu()}
            <h1>Create Room</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter Room Name:
                    <input 
                    type="text"
                    placeholder="Name of the room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
            </div>
        </div>
        
      );
}

export default Test;