import io from "socket.io-client";
import {React, useState,Component,useEffect } from "react";
import Chats_room from "./Chats_room";
import Menu from "./struct/Menu";
import Navbar from "./Navbar";
import "./Chat.css"
import { result } from "lodash";





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
            <br></br>
            <ul>
            {data.map(item => {
                return(
                    <div key={item.room_id}>
                        <button key={item.room_id} onMouseDown={() => setRoom(item.room_id)} onMouseUpCapture={() => Printroom()}>{item.room_name}</button>
                        <br></br>
                    </div>
                   
                )
            })}
            </ul>
            </div>
        </div>
        
      );
}

export default Test;