import React from 'react';
import './MiPerfil.css'
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MiPerfil = () => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('user')))
    const [user, setUser] = useState()    
    const [error, setError] = useState()
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false)
    const [posts, setPosts] = useState([])
    const [msg, setMsg] = useState('')
    const[id, setId] = useState('')
    const [refresh, setRefresh] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const closeDelete = () => setShowDelete(false)
  const openDelete = () => setShowDelete (true)
  const handleRefresh = () => {
    setRefresh(refresh + 1)
    if(refresh == 5){
      setRefresh(0)
    }}
  
  const navigate = useNavigate()
   
  useEffect(()=>{
        if(token === null){
            navigate('/inicio')
        } else {
            const config = {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            }
            const getUser = async() => {
                try{
                    const response = await axios.get('http://localhost:3030/api/users/myprofile', config)
                    setUser(response.data)
                    console.log(response);
                } catch(err) {
                  console.log(err);
                    localStorage.removeItem('user')
                    navigate('/inicio')
                } 
            }   
            const getPosts = async () =>{
                try{
                    const response = await axios.get('http://localhost:3030/api/posts/myposts/data', config)   
                    const data = response.data
                    data.sort( (a, b) => {
                 if(a.createdAt > b.createdAt){
                  return -1
                 }if(a.createdAt < b.createdAt){
                  return 1
                 }
                })
                setPosts(data)
                console.log(data);
                }catch(err){
                    if(err.response.data.status == 404)
                 console.log(err.response.data.status);
                 setMsg('No hay posteos')
                }
            }
               getUser()  
               getPosts()
            }
    }, [refresh])
    
  const handleDelete = async() => {
    const config = {
        headers: {
            Authorization: `Bearer ${token.token}`
        }
    }
    try{
        const response = await axios.delete(`http://localhost:3030/api/posts/myposts/${id}`, config)
        console.log(response);
    } catch(err){
        console.log(err);
    }
    
  }

 return(

 <div>
  {!user ? <p>Cargando...</p> 
  
  :

<div className='profile-container'>
    <button className='back-btn'
    onClick={() => {navigate('/inicio')}}>
        <img src="/images/icons8-back-24.png" alt="" />
        </button>
    <section className='user-section'>
     <img className='profilepic' src={user[0].profilePic} alt="profilePic" onClick={handleShow}/>
   <h1 className='username'>{user[0].userName}</h1>
    <p className='email'>{user[0].email}</p>
<Modal
      show={show} onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <img className='modal-profilepic' src={user[0].profilePic} alt="profilePic" onClick={handleShow}/>
</Modal>   
    </section>

    <section className='post-section'>
        <p className='post-conteiner'>{msg}</p>
    {posts.map(post => 
       <div key={post._id} className='post-conteiner'> 
        <p>{post.body}</p>
        <button onClick={()=> {
            setId(post._id)
            console.log(id);
            openDelete()
        }} variant="danger" className='post-btn'><img className='delete' src="/images/icons8-delete-30.png" alt="" />
        </button> 
       </div>
     )}
    </section>

    <Modal show={showDelete} onHide={closeDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar posteo</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que querés borrar este posteo?</Modal.Body>
        <Modal.Footer>
            <div className='btn-container'>
          <Button variant="outline-secondary" onClick={closeDelete}>
            Cancelar
          </Button>
          <Button variant="outline-danger" onClick={() => {
            handleDelete()
            closeDelete()
            handleRefresh()
          }}>   
            Si, borrar
          </Button> 
            </div>
          
        </Modal.Footer>
      </Modal>




 </div>
 

 

  }
 



 </div>
 )
}

export { MiPerfil }