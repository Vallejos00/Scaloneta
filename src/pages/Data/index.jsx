import React from 'react';
import './Data.css' 
import { useState, useEffect } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Post } from '../../Components';


const Data = () => {
   const [posts, setPosts] = useState([])
   const [show, setShow] = useState(false);
   const [token, setToken] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
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
    setToken(localStorage.getItem("token"))
  }, [])

 return(
 <div>
      <Button variant="outline-info" onClick={handleShow} className="publicar-btn">Publicar</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Post/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="outline-danger"
        onClick={handleClose}>Cerrar
        </Button>        
          <Button variant="outline-info" onClick={handleClose}>Publicar
          </Button>
        </Modal.Footer>
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
     <p>{token}</p>
     
     
 </div>
 )
}

export { Data }