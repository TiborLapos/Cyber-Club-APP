import React, { useState, useEffect } from "react";
import "./Info.css"
import {Link, Navigate} from "react-router-dom";
import Navbar from "../Navbar";
import Menu from "../struct/Menu"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
var mysql = window.require('mysql');


const Info = () => {
    const [num, setNum] = useState();
    const [nmRoom, setnmRoom] = useState();
    const [state, setState] = React.useState({ num: 0 });
    const counter = React.useRef(0);

    function checkNewUpdate(res){
        var connection = mysql.createConnection({
        host     : 'cyberclub.network',
        user     : 'root',
        password : 'Tibike11',
        port : 8889,
        database : 'loginsystem'
        });
        connection.connect();
        var sql = 'SELECT COUNT(*) AS namesCount FROM users';
        
    
        connection.query(sql, function (error, results, fields) {
        if(error){
            console.log(error);
        }
        if (!results.length){
            console.log("error_fetching_data_from_database --",results.length);
        }else{
            res(results[0].namesCount)
    
        }
        });
        connection.end(); 
        //setTimeout("location.reload();",30000);
    }

    function checknumberChat(nmroom){
        var connection = mysql.createConnection({
        host     : 'cyberclub.network',
        user     : 'root',
        password : 'Tibike11',
        port : 8889,
        database : 'loginsystem'
        });
        connection.connect();
        var sql = 'SELECT COUNT(*) AS chatCount FROM chat_room';
        
    
        connection.query(sql, function (error, results, fields) {
        if(error){
            console.log(error);
        }
        if (!results.length){
            console.log("error_fetching_data_from_database --",results.length);
        }else{
            nmroom(results[0].chatCount)
    
        }
        });
        connection.end(); 
        //setTimeout("location.reload();",30000);
    }
    

    React.useEffect(() => {
        const timer = setTimeout(() => setState({ num: state.num + 1 }), 1000);
        checkNewUpdate((res) => {  
            setNum(res)
        }) 
        checknumberChat((nmroom) => {
            setnmRoom(nmroom)
        }) 
          return () => clearTimeout(timer);
        
      }, [state]);    
    const data = [
        {
          name: "Page A",
          users: num,
          amt: 100
        },
      ];
    const data1 = [
    {
        rooms: nmRoom,
        amt: 100
    },
    ];
  const content = (
    <div className="App">
      {Navbar()}
      <div className="content">
        {Menu()}
        <h1>Monitoring</h1>
        <div className="info">
            <div className="info">
            <h2>Users:</h2>
            <BarChart
                width={200}
                height={300}
                data={data}
                barSize={25}
            >
                <YAxis dataKey="amt" />
                <Tooltip cursor={{fill: 'transparent'}}/>
                <Legend />
                <CartesianGrid strokeDasharray="1 1"/>
                <Bar dataKey="users" fill="#8884d8" background={{ fill: "silver" }} />
            </BarChart>
            </div>
            <div className="info">
            <h2>Rooms:</h2>
            <BarChart
                width={200}
                height={300}
                data={data1}
                barSize={25}
            >
                <YAxis dataKey="amt"/>
                <Tooltip cursor={{fill: 'transparent'}}/>
                <Legend />
                <CartesianGrid strokeDasharray="1 1"/>
                <Bar dataKey="rooms" fill="#8884d8" background={{ fill: "silver" }} />
            </BarChart>
            </div>
        </div>
      </div>
    </div>
  )
 
 
  
  return (
      content
  )
}

export default Info;
