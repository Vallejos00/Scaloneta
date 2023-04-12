import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const MiPerfil = () => {
    const [token, setToken] = useState('')
  
    useEffect(()=>{  
    const local = JSON.parse(localStorage.getItem("user"))
    setToken(local.token)
        
    const config = {
     headers: {
     Authorization: `Bearer ${token}`
     }}
     const getUserData = async () => {
     const response = await axios.get("http://localhost:3030/api/users/myprofile", config)
     console.log(response.data);
     }
     getUserData()


    })


 return(
 <div>
   




 </div>
 )
}

export { MiPerfil }