import React from 'react';
import './Data.css' 
import { useState, useEffect } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Post } from '../../Components';


const Data = (props) => {

   const [posts, setPosts] = useState([])
   const [show, setShow] = useState(false);
   const [nopublic, setNopublic] = useState(false)
   const [user, setUser] = useState('')
   const navigate = useNavigate()

  const handleClose = () => {setShow(false), setNopublic(false)}
  const handleShow = () => {
    if(!user){
      setNopublic(true)
    } else {
      setShow(true)
    }
  }

   useEffect(() => {
   
    const getPosts = async () =>{
    const response = await axios.get('http://localhost:3030/api/posts')       
    const data = response.data
    data.sort( (a, b) => {
     if(a.createdAt > b.createdAt){
      return -1
     }if(a.createdAt < b.createdAt){
      return 1
     }
    } )
    setPosts(response.data)
    }
    getPosts()
    setUser(localStorage.getItem("user"))
  }, [posts])

 return(
 <div>
      <Button variant="outline-info" onClick={handleShow} className="publicar-btn">Publicar</Button>

      <Modal show={nopublic} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ups! No estás logeado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tenés que iniciar sesión para realizar una publicación</Modal.Body>
        <Modal.Footer>
        <Button variant="outline-danger"
        onClick={handleClose}>Cerrar
        </Button>
          <Button variant="outline-info" onClick={() => {navigate('/')}}>Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
              <Post close={handleClose}/>
        </Modal.Body>
      </Modal>
     {posts.map(post => 
       <div key={post._id} className='post-container'> 
        <div className='img-container'>
       <img className='post-profilePic' src= {post.user.profilePic} alt="profilePic"/>   
        </div>
       <div  className='user-body-container'>
        <h1 className='post-userName'>{post.user.userName}</h1>
        <p className='post-body'>{post.body}</p>
       </div>
       </div>    
     )}
     
     
 </div>
 )
}

export { Data }