import React from 'react';
import './Data.css' 
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Post } from '../../Components';

const Data = () => {
   const [posts, setPosts] = useState([])
   useEffect(() => {
    const getUsers = async () =>{
    const response = await axios.get('http://localhost:3030/api/posts')       
    const data = response.data
    setPosts(response.data)
    }
    getUsers()
   }, [])
   
   

 return(
 <div>
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
     
     <Post/>
 </div>
 )
}

export { Data }