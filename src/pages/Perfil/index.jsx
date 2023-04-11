import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

const Perfil = () => {

const { state } = useLocation()
console.log(state.userData);

 return(
 <div>
 </div>
 )
}

export { Perfil }