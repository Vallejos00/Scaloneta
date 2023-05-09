import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import './Perfil.css'

const Perfil = () => {

const [msg, setMsg] = useState('')    
const { state } = useLocation()
console.log(state);
const [show, setShow] = useState(false);
const [posts, setPosts] = useState([])
const navigate = useNavigate()

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);



useEffect(()=>{
       if(state == null){
        navigate('/404notFoundPage')
       } else {
        const user = JSON.parse(localStorage.getItem('user'))
        if(state.userData[0].id == user.id){
        console.log(user);
        navigate('/miPerfil')
        }
        const getPosts = async() => {
        try{
        const response = await axios.get(`http://localhost:3030/api/posts/profile/${state.userData[0].id}`)
        const data = response.data
        data.sort( (a, b) => {
         if(a.createdAt > b.createdAt){
         return -1
        }if(a.createdAt < b.createdAt){
         return 1
     }
     
    })
    setPosts(data)
       } catch(err){
        if (err.response.data.status = 404){
            setMsg('No hay posteos')
        }
       }
       
    }
    getPosts()
}
 
}, [])


 return(
 <div>  
    {!state ? <p>Cargando...</p> :
    <div className='p-profile-container'>
    <button className='p-back-btn'
    onClick={() => {navigate('/inicio')}}>
        <img src="/images/icons8-back-24.png" alt="" />
        </button>

        <section className='p-user-section'>
     <img className='p-profilepic' src={state.userData[0].profilePic ? state.userData[0].profilePic : "/images/usuario-sin-foto.jpeg"} alt="profilePic" onClick={handleShow}/>
   <h1 className='p-username'>{state.userData[0].userName}</h1>
    <p className='p-email'>{state.userData[0].email}</p>
<Modal
      show={show} onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <img className='p-modal-profilepic' src={state.userData[0].profilePic ? state.userData[0].profilePic : "/images/usuario-sin-foto.jpeg"} alt="profilePic" onClick={handleShow}/>
</Modal>   
    </section>

    <section className='p-post-section'>
        <p className='p-post-conteiner'>{msg}</p>
    {posts.map(post => 
       <div key={post._id} className='p-post-conteiner'> 
        <p>{post.body}</p> 
       </div>
     )}
    </section>







    </div>
    }
    



 </div>
 )
}

export { Perfil }