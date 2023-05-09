import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  
 const [fullName, setFullName] = useState('')
 const [userName, setUserName] = useState('')
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('') 
 const navigate = useNavigate()

 const handleForm = () => {
    axios.post( "http://localhost:3030/api/users",
    {   
        fullName : fullName,
        userName : userName,
        email : email,
        password : password
    })
    .then( res => {
        if(res.status==200){
            const user = res.data.user 
            navigate('/profilePic')
            localStorage.setItem('user', JSON.stringify(user))
        }
    })
    .catch(res => {
        if(res.status !==200){
        console.log(res);
    }})   

    
 }


  
 return(
 <div>
  <form onSubmit={(e)=>{
    e.preventDefault()
    handleForm(e)
  }}>
    <label htmlFor=""> Nombre completo
        <input type="text" name='fullName' value={fullName} onChange={(e)=>{setFullName(e.target.value)}}/>
    </label>
    <label htmlFor=""> Nombre de usuario
        <input type="text" name='userName'value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
    </label>
    <label htmlFor=""> Email
        <input type="email" name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
    </label>
    <label htmlFor=""> Contraseña
        <input type="password" name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
    </label>
        <button type="submit">Registrarse</button>
  </form>



 </div>
 )
}

export { Register }