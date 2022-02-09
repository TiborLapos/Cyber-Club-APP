import React, { useState, useEffect } from "react";
import "./Home.css"
import {Link, Navigate} from "react-router-dom";
var mysql = window.require('mysql');




const Home = () => {
  var  local_uuid = localStorage.getItem('uuid');
  var  local_name = localStorage.getItem('u_name');
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [Username, setUsername] = useState();
  const [U_UUID, setU_UUID] = useState();


  //MySQL conect inf
  function checkNewUpdate(){
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      port : 8889,
      database : 'loginsystem'
    });
    connection.connect();
    var sql = 'SELECT * FROM users WHERE uuid = ? AND name = ?';
  
    connection.query(sql,[local_uuid,local_name], function (error, results, fields) {
      if(error){
        console.log(error);
      }
      if (!results.length){
        console.log("error_fetching_data_from_database --",results.length);
        setLoggedIn(false)
      }else{
        console.log(results[0].uuid)
        setUsername(results[0].name)
        setU_UUID(results[0].uuid)
  
      }
    });
    //setTimeout("location.reload();",30000);
  }

  
  checkNewUpdate()
  const content = (
    <div className="App">
      <header className="App-header">
        <h1>THIS IS HOME PAGE</h1>
        <a>Name: {Username}</a>
        <br/>
        <a>LOCAL UUID: </a>{localStorage.getItem("uuid")}
        <br/>
        <a>DATABASE UUID: {U_UUID}</a>
        <br/>
        <Link to="/logout" id='logout'>Log Out</Link>
      </header>
    </div>
  )
  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

 
  
  return (
    <div>
        {(() => {
        if (isLoggedIn == false) {
          return (
            <div>{<Navigate to='/logout'/>}</div>
          )
        }else {
          return (
           content
          )
        }
      })()}
    </div>
  );
}

export default Home;
