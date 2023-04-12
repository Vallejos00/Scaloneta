import { useState, useEffect } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Header } from './Components'
import { Data, Home, Perfil, MiPerfil } from './pages'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 

  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route path='/inicio' element={<Data/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/perfil' element={<Perfil/>}/>
        <Route path='/miperfil' element={<MiPerfil/>}/>
      </Routes>
      </BrowserRouter>


      
    </div>
  )
}

export default App
