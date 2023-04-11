import React from 'react';
import './Data.css' 
import { useState, useEffect } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Post, Search } from '../../Components';


const Data = (props) => {

   const [posts, setPosts] = useState([])
   const [show, setShow] = useState(false);
   const [open, setOpen] = useState(false);
   const [user, setUser] = useState('')
   const [alert, setAlert] = useState(false)
   const navigate = useNavigate()

  const handleClose = () =>  {setShow(false), setAlert(false)}
  const handleShow = () =>   setShow(true)

  const logout = () => {
    localStorage.removeItem("user")
    navigate('/')
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
    })
    setPosts(response.data)
    }
    getPosts()
    setUser(localStorage.getItem("user"))  
    
  }, [posts])
  

  useEffect(()=>{
    if(!user)setAlert(true) 
  }, [user])
  


 return(
 <div>

   


 
  <div className='btn-container'>
      { user ?
        <Button variant="outline-danger"
        onClick={logout}>Cerrar sesión
        </Button>
         : null
      }

<Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="outline-secondary"
      >
        Buscar
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
        <Search/>
        </div>
      </Collapse>
      
    <Button variant="outline-info" onClick={user ? handleShow : logout} >{user ? "Publicar" : "iniciar sesión"}</Button>
  </div>
     
          { user ?
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Post close={handleClose}/>
        </Modal.Body>
      </Modal>
          : 
          <Modal show= {alert} onHide={handleClose}>
   <Modal.Header closeButton>
     <Modal.Title>Ups! tu sesión expiró</Modal.Title>
   </Modal.Header>
   <Modal.Body>Para poder realizar publicaciones, por favor, volvé a loguearte</Modal.Body>
   <Modal.Footer>
   <Button variant="outline-danger"
        onClick={handleClose}>Cerrar
        </Button>
        <Button variant="outline-info"
        onClick={logout}>Iniciar sesión
        </Button>
   </Modal.Footer>
 </Modal>
          }             
     
      

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