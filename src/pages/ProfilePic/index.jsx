import React, { useEffect, useState } from 'react';
import ReactCrop from 'react-image-crop';
import axios from 'axios';
import 'react-image-crop/dist/ReactCrop.css';

const ProfilePic = () => {
    
    const user = JSON.parse(localStorage.getItem('user')) 
    console.log(user);
    const [token, setToken] = useState(user.token)
    const [profilePic, setProfilePic] = useState(null)
    console.log(user.id);
    console.log(token);

    const handleForm = () =>{
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.put(`http://localhost:3030/api/users/myprofile/pic/${user.id}`, {profilePic: profilePic}, config)
        .then(res=> {
            console.log(res)
            console.log(profilePic)
        })
        .catch(res=>{console.log(res)
        
        console.log(config)}
        )

    }
 
    
 

    
 return(
 <div>

  <form onSubmit={(e)=>{
    e.preventDefault()
    console.log(profilePic);
    handleForm(e)
  }}>
<input type="file" accept='image/*' onChange={(e)=>{setProfilePic(e.target.files[0])}}/>
<button type="submit">Enviar</button>
  </form>

</div>


 




 )
}

export { ProfilePic }