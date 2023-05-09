import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './PostSearch.css'


const PostSearch = () => {
 const { state } = useLocation()
 const navigate = useNavigate()
 const posts = state.postData
 console.log(posts);
 posts.sort( (a, b) => {
    if(a.createdAt > b.createdAt){
     return -1
    }if(a.createdAt < b.createdAt){
     return 1
    }
   })


 return(
 <div>
    <button className='back-btn'
    onClick={() => {navigate('/inicio')}}>
        <img src="/images/icons8-back-24.png" alt="" />
        </button>
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

export { PostSearch }