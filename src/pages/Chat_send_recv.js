import React, { useEffect, useState } from "react";

function Chat_send_recv({socket, username, room}){
    const [currentMassage, setCurrentMassage] = useState("");

    const sendMessage = async () => {
        if (currentMassage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMassage,
                time:  
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
        };
    };

    useEffect(() =>{
        socket.on("receive_message",  (data) => {
            console.log(data);
        })
    }, [socket])

    return(
        <div>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">

            </div>
            <div className="chat-footer">
                <input type={"text"} placeholder="Hey..."  onChange={(event) => {setCurrentMassage(event.target.value)}}></input>
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat_send_recv