import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ProfilePic.css'

const ProfilePic = () => {
    
    const user = JSON.parse(localStorage.getItem('user')) 
    const [token, setToken] = useState(user.token)
    const [profilePic, setProfilePic] = useState(null)
    const [crop, setCrop] = useState(
      {  unit: '%',
        aspect: 1,
        width: 50,
        height: 50,}
      );
    const [imageSrc, setImageSrc] = useState(null);
    const [image, setImage] = useState(null)
    const [prev, setPrev] = useState(null)
    const handleForm = () =>{     
       const formData = new FormData();

       formData.append('profilePic', profilePic);
       const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
         }
        };
          axios.put(`http://localhost:3030/api/users/myprofile/pic/${user.id}`,  formData, config )
          .then(res => {
          console.log(res);
          console.log(profilePic);
        })
         .catch(error => {
          console.log(error);
        });
         }
 
    const onSelectFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () => setImageSrc(reader.result));  
        reader.readAsDataURL(e.target.files[0]);
      }
    };

    const croppedPic = () => {
      const canvas = document.createElement('canvas')
      const scaleX = image.target.naturalWidth /  image.target.width
      const scaleY = image.target.naturalHeight / image.target.height
      canvas.width = crop.width
      canvas.height = crop.height
      const ctx = canvas.getContext('2d')
  
      ctx.drawImage(
        image.target,
        scaleX * crop.x,
        scaleY * crop.y,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
        
      )
      const img = canvas.toDataURL('image/jpeg')
      canvas.toBlob(blob => {
        setProfilePic(blob);
      }, 'image/png')
      
      setPrev(img)
      console.log('PROFILEPIC', profilePic);
      // console.log('SCALE X: ',scaleX)
      // console.log('SCALE Y: ', scaleY);
      ;
    }

    const handleResize = (newCrop) => {
      if (newCrop.width !== newCrop.height) {
        const size = Math.min(newCrop.width, newCrop.height);
        const { x, y } = newCrop;
        setCrop({ ...newCrop, width: size, height: size, x: x + (newCrop.width - size) / 2, y: y + (newCrop.height - size) / 2 });
      } else {
        setCrop(newCrop);
      }
    };

    const onCropComplete = (croppedAreaPixels, croppedArea) => {
      console.log(crop);
      console.log(image.target);
    };
    
   const toFile = () =>{
     
   }
 

    
 return(
 <div>
 { <div>
  <form onSubmit={(e)=>{
    e.preventDefault()
    handleForm(e)
  }}
  encType='multipart/form-data'>
<input type="file" accept='image/*' name='profilePic' onChange={onSelectFile}/>
{imageSrc && (
        <ReactCrop
          crop={crop}
          onChange={handleResize}
          onComplete={croppedPic}
        > 
          <div className='original-img-container'>
          <img className='original-img' src={imageSrc} onLoad={setImage}/>
          </div>
          
        </ReactCrop>
      )}
<button type='submit'>Enviar</button>

  </form>
  <button onClick={croppedPic}>Vista previa</button>
 </div>
  
 }
 {prev && (
        <div className='new-img-container'>
         <img src={prev} alt="cropped" />
        </div>
        
       )

       }
  

</div>


 




 )
}

export { ProfilePic }