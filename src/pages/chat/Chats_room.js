import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chats_room.css"
const { ipcRenderer } = window.require("electron");





function Chats_room({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [state, setState] = useState({});
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
  const d = new Date();
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let s = addZero(d.getSeconds());
  let time = h + ":" + m + ":" + s;
  const sendMessage = async () => {
    
    if (currentMessage !== "") {
      console.log(time)
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: time
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      ipcRenderer.send('notify');

      //ipcRenderer.send('notify', {name:data.author, da:data.message} );
      return () => {
        setState({}); // This worked for me
      };
    });
  }, [socket]);




  return (
    <div className="chat-window">
      <div className="chat-name">
        <p>{localStorage.getItem('room_name')}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                key={ Math.random().toString(36)}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-meta">
                    <p id="author">{messageContent.author}</p>
                    <p id="time">{messageContent.time}</p>
                  </div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
      </div>
    </div>
  );
}

export default Chats_room;