import React, { useEffect, useState, componenetDidMount } from 'react';
import Message from './Message';
import MessageNoName from './MessageNoName';
import TextboxCSS from './Textbox.module.css'
import ScrollToBottom from './ScrollToBottom';


const { io } = require("socket.io-client");
const socket = io("http://localhost:5000", {
  credentials: true
});

function Textbox(props){
    

    //pass in the user prop from login page
    let user = props.user;

    let userid;
    useEffect(() => {
        console.log("HOOKED")
        //check if new user, if so create userid
        socket.emit("checkUserExist", (user), (response) => {
            userid = response.fetcheduserid;
        })
    }, [userid]);

    //sends the message to the backend after enter key input
    useEffect(() => {
        const textboxElement = document.getElementById('textbox');
        if (textboxElement){
            textboxElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey){
                    e.preventDefault();
                    sendMessage();                   
                };
            });
        };
    }, []);

    const [messages, setMessages] = useState([]);

    //loads the previous messages upon initialization
    useEffect(() => {
        socket.emit("initialload");
        socket.on("loadmessages", (data) => {
            setMessages(data.reverse());
        });
    }, [setMessages])

    socket.on("connect", function() {
        socket.emit("initialload");
    })

    function handleInput(e) {
        setMsg(document.getElementById('textbox').value);
    };
    
    const [msg, setMsg] = useState('');
    
    //sends all the information to the backend to store
    const name = user.name;
    const pic = user.picture
    const sendMessage = (e) => {
        console.log(document.getElementById('textbox').innerText);
        console.log(pic)
        socket.emit("sendmessage", {
            roomid: 1, 
            userid: userid, 
            message: document.getElementById('textbox').innerText, 
            timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
            username: name,
            picture: pic
        });
        setMsg('')
        document.getElementById('textbox').textContent = ('');
    };   

    let prevname;
    //displays the text on the screen 
    return(
        <div>
            {messages.map((message) => {
                if (prevname != message.username){
                    prevname = message.username
                    return <Message username={message.username} message={message.message} picture={message.picture}/>
                }
                else{
                    prevname = message.username
                    return <MessageNoName username={message.username} message={message.message} picture={message.picture}/>
                }              
            })}
            <ScrollToBottom />
            <div className={TextboxCSS.textbox} id='textbox' contentEditable="true"></div>
        </div>
    )
    
}

export default Textbox;