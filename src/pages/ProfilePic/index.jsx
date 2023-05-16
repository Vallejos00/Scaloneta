import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePic = () => {
    
    const user = JSON.parse(localStorage.getItem('user')) 
    console.log(user);
    const [token, setToken] = useState(user.token)
    const [profilePic, setProfilePic] = useState(null)
    console.log(user.id);
    console.log(token);

    const handleForm = () =>{
      
      const formData = new FormData();
formData.append('profilePic', profilePic);

const config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

axios.put(`http://localhost:3030/api/users/myprofile/pic/${user.id}`, formData, config)
  .then(res => {
    console.log(res);
    console.log(profilePic);
  })
  .catch(error => {
    console.log(error);
  });
    }
 
    
 

    
 return(
 <div>

  <form onSubmit={(e)=>{
    e.preventDefault()
    console.log(profilePic);
    handleForm(e)
  }}
  encType='multipart/form-data'>
<input type="file" accept='image/*' name='profilePic' onChange={(e)=>{setProfilePic(e.target.files[0])}}/>
<button type="submit">Enviar</button>
  </form>

</div>


 




 )
}

export { ProfilePic }