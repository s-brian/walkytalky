import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';


const { io } = require("socket.io-client");
const socket = io("http://localhost:5000", {
  credentials: true
});



function Loggedin(){

    //socket connectivity
    socket.on("connect", () => {
        console.log('connected from loggin: ' + socket.id); 
    });
    
    socket.on("disconnect", () => {
        console.log('disconnected: ' + socket.id); 
    });

    //receive credentials from home endpoint
    const {state} = useLocation();
    const user = state;
    

    return(
      <div>
        loggedin
        user : {user.name}
        <Textbox user={user}/>
      </div>
    )
  }
  
  export default Loggedin;