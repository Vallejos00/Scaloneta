import axios from 'axios';
import React, { useState } from 'react';

import { Data } from '../Data';

const Home = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')


   const handleForm = (e) =>{
    axios.post('http://localhost:3030/api/users/login', {userName: user, password: password })
    .then(res => {
        if(res.status==200){
         console.log("un éxito");
        } else{
            console.log("no se pudo acceder");
        }
    })
    
}


 return(
 <div>

 <form onSubmit={(e)=>{
    e.preventDefault()
    handleForm(e)
   }}>
    <label htmlFor=""> Nombre de usuario
        <input type="text" name='userName' value={user} onChange={(e)=> setUser(e.target.value)}/>
    </label>
    <label htmlFor=""> Contraseña
        <input type="password" name='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
    </label>
        <button type='submit'>Ingresar</button>
 </form>
 
 
 </div>
 )
}

export { Home }