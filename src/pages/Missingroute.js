import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
var mysql = window.require('mysql');


function MissingRoute() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    var uuid = localStorage.getItem('uuid');
    console.log("UUIIIIIID?",uuid)
   
   
    //MySQL conect inf
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        port : 8889,
        database : 'loginsystem'
    });

    //const userData = database.find((user) => user.username === uname.value);
    //Find user in database 
    var sql = 'SELECT uuid FROM users WHERE uuid = ?';
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(sql,[uuid], function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          setLoggedIn(true)
        });
        connection.end(); 
      });
    const bla = (
        <Navigate to='/home'/>
    )

    const test = localStorage.getItem('uuid');
    console.log(test)
    if (test == null){
      console.log("NOPE")
    }else{
      console.log("YEEEES")
    }
    return (     
    <div className="check_for_login">
        {isLoggedIn ? <Navigate to='/home'/>: bla}
    </div>
  )
}

export default MissingRoute;
