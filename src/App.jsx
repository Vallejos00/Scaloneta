import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Header } from './Components'
import { Data, Home } from './pages'

function App() {

  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
      <Routes>
      <Route path='/inicio' element={<Data/>}/>
      <Route path='/' element={<Home/>}/>
      </Routes>
      </BrowserRouter>


      
    </div>
  )
}

export default App
