import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MiPerfil = () => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('user')).token)
    const [user, setUser] = useState()    
    const [error, setError] = useState()
    const navigate = useNavigate()
    
   


    useEffect(()=>{
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
              }
        }
        const getUser = async() => {
            try{
                const response = await axios.get('http://localhost:3030/api/users/myprofile', config)
                setUser(response.data)
                console.log(response);
            } catch(err) {
                localStorage.removeItem('user')
                navigate('/inicio')
            }

            
            
        }
        getUser() 


    }, [])

   


 return(
 <div>

  {!user ? <p>Cargando...</p> :
  
  <div>

  <img src={user[0].profilePic} alt="profilePic" />
  










  </div>
  }
 



 </div>
 )
}

export { MiPerfil }