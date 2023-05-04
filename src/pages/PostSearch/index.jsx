import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './PostSearch.css'


const PostSearch = () => {
 const [user, setUser] = useState()
 const { state } = useLocation()
 const posts = state.postData
 console.log(posts);


 return(
 <div>PostSearch</div>
 )
}

export { PostSearch }