import React from "react";
import "./Menu.css"
import {Link} from "react-router-dom";

const menu = (
    <>
    <div className="leftMenu">
        <ul>
            <li><Link to="/home" id='home'>Home</Link></li>
            <li><Link to="/chat" id='chat'>chat</Link></li>
        </ul>
       
        <ul className="bottomMenu">
            <li><Link to="/logout" id='logout'>logout</Link></li>
        </ul>
    </div>
    </>
)


function Menu(){
  return(menu)

}

export default Menu;
