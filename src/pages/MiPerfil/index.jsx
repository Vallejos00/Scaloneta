import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const MiPerfil = () => {
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})    
  
    useEffect(()=>{  
    const local = JSON.parse(localStorage.getItem("user"))
    setToken(local.token)
        
    const config = {
     headers: {
     Authorization: `Bearer ${token}`
     }}
     
        axios.get('http://localhost:3030/api/users/myprofile', config)
        .then(res=> {setUser(res.data)
            console.log(user);
        })
}, [])


 return(
 <div>


 



 </div>
 )
}

export { MiPerfil }