import React, { useState, useEffect} from "react";
import './Login.css'
import log_photo from '../images/rob.gif'
import { BrowserRouter as Router, Route, Link, Routes, NavLink, Navigate } from "react-router-dom";
import { CloseCircleFilled,MinusCircleFilled,FullscreenOutlined } from '@ant-design/icons';
const { ipcRenderer } = window.require("electron");



const bcrypt = require('bcryptjs');
var mysql = window.require('mysql');


function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [U_UUID, setU_UUID] = useState();

  
 

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };
 

  const handleSubmit = (event) => {
    
    //MySQL conect inf
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      port : 8889,
      database : 'loginsystem'
    });
    
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];


    //Connect do MySQl dabase
    connection.connect();
    // Find user login info
    //const userData = database.find((user) => user.username === uname.value);
    //Find user in database 
    var sql = 'SELECT password,uuid FROM users WHERE name = ?';

    connection.query(sql,[uname.value], function (error, results, fields) {
      if(error){
        console.log(error);
      }
      console.log(results)
      if (!results.length){
        console.log("error_user_name",results.length);
        setErrorMessages({ name: "uname", message: errors.uname });
      }else{
          const hash = results[0].password;
          bcrypt.compare(pass.value, hash, function(err, isMatch) {
            if (err) {
              throw err
            } else if (!isMatch) {
              console.log("error_bad_password_s")
              setErrorMessages({ name: "pass", message: errors.pass });
            } else {
              console.log("ok_password");
              //const alphabet = '@#$1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
              //const generator = nanoid.customAlphabet(alphabet, 30);
              //const uuid = generator()
              localStorage.setItem('u_name', uname.value);
              console.log(results[0].uuid)
              const uuid = results[0].uuid
              localStorage.setItem('uuid', uuid);
              //var sql = 'UPDATE users SET uuid = ? WHERE name = ?';
              /*
              connection.query(sql,[uuid, uname.value], function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
              });
              */
              setIsSubmitted(true);
              connection.end(); 
            }
          })
          
      }
    });
  };
  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  function send_exit() {
    ipcRenderer.send('exit');
  };

  function send_maximaze() {
    ipcRenderer.send('full:screen');
  };

  function send_minimaze() {
    ipcRenderer.send('set:down');
  };
  // JSX code for login form
  const renderForm = (
    <>
 
    <div className="navbar">
      <nav>
        <li id="close" onClick={send_exit}><CloseCircleFilled /></li>
        <li id="minimaze" onClick={send_minimaze}><MinusCircleFilled /></li>
        <li id="full_screen" onClick={send_maximaze}><FullscreenOutlined /></li>

      </nav>
    </div>
    <div className="form">
      <div className='left-side'>
        <div className="lf_cont">
            <h1 className="draggable">Cyber Club</h1>
            <img src={log_photo} alt='test'></img>
        </div>
      </div>
      <div className='login-form'>
        <form onSubmit={handleSubmit}id='signup'>
          <div className='login-container'>
            <h1>Welcom Back</h1>
            <p>Login in to Cyber Club</p>
            <label>Name</label>
            <input type={"text"} className='login-input' id='user_name' name='uname' required></input>
            {renderErrorMessage("uname")}
            <br></br>
            <label>Password</label>
            <input type={"password"} className='login-input' id='user_pass' name='pass' required></input>
            {renderErrorMessage("pass")}
            <br></br>
            <button type='submit' className='login_button'>Login</button>
            <div className='login-sup'>
              <a>Not joined yet ?</a><a>Register</a>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
  var  local_uuid = localStorage.getItem('uuid');
 
  return (
      <div className="check_for_login">
        {(() => {
        if (local_uuid == null) {
          return (
            <div>{isSubmitted ? <Navigate to='/home'/>: renderForm}</div>
          )
        }else {
          return (
            <Navigate to='/home'/>
          )
        }
      })()}
      </div>
  );
}

export default Login