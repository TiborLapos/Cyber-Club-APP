import io from "socket.io-client";
import {React, useState,Component,useEffect } from "react";
import Chats_room from "./Chats_room";
import Menu from "./struct/Menu";
import Navbar from "./Navbar";
import "./Chat.css"
import { result } from "lodash";





var mysql = window.require('mysql');


function Test() {


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
        connection.query("SELECT * FROM users", function (err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        // iterate for all the rows in result
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            console.log(row.name)
        });
        });
    });


    const listof = (
        <div>
        {Navbar()}
            <div className="ChatContent">
            {Menu()},
            <br></br>
            </div>
        </div>
    )




 return(listof)
}

export default Test;