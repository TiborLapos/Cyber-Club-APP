import React from "react";
import './navbar.css'
import { CloseCircleFilled,MinusCircleFilled,FullscreenOutlined } from '@ant-design/icons';
const { ipcRenderer } = window.require("electron");
function send_exit() {
    ipcRenderer.send('exit');
  };

  function send_maximaze() {
    ipcRenderer.send('full:screen');
  };

  function send_minimaze() {
    ipcRenderer.send('set:down');
  };

function Navbar(){
  const navbar = (
    <div className="navbar">
        <nav>
        <li id="close" onClick={send_exit}><CloseCircleFilled /></li>
        <li id="minimaze" onClick={send_minimaze}><MinusCircleFilled /></li>
        <li id="full_screen" onClick={send_maximaze}><FullscreenOutlined /></li>
        </nav>
    </div>
)

  return(navbar)

}

export default Navbar;
