import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


const Search = () => {

const [show, setShow] = useState(false);
const [dropdown, setDropdown] = useState("")
const [search, setSearch] = useState("x")
const navigate = useNavigate()

    const handleSearch = async () => {
    if (dropdown == "Usuarios"){  
      try{
      const response = await axios.get(`http://localhost:3030/api/users/${search}`)
      const data = response.data
      navigate('/perfil', {state: {userData: data}})
      } catch(err){
      setShow(true)
      }        
    
    }

    if (dropdown == "Posteos"){
      try{
        const response = await axios.get(`http://localhost:3030/api/posts/${search}`)
        const data = response.data
        navigate('/postsearch', {state: {postData: data}})
        console.log(response);
      }catch(err){
        setShow(true)
      }
    
    }
    
}







 return(
 <div>
 
 <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title={dropdown}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item onClick={()=> setDropdown("Usuarios")}>Usuarios</Dropdown.Item>
          <Dropdown.Item onClick={()=> setDropdown("Posteos")}>Posteos</Dropdown.Item>
        </DropdownButton >
        <Form.Control 
        aria-label="Text input with dropdown button" 
        disabled={dropdown ? false : true}
        placeholder={dropdown ? `Buscar ${dropdown}` : "Seleccione un valor" } 
        onChange={(e) => setSearch(e.target.value.toLocaleLowerCase(e))}/>
        <Button type='submit' variant="success" onClick={() => {handleSearch()}}>Buscar
          </Button>
      </InputGroup>
      { show ?
       <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Ups!</Alert.Heading>
        <p>
          No se encontró lo que buscabas.
        </p>
      </Alert> : null
      }
     


 </div>
 )
}

export { Search }