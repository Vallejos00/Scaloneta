import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Post = () => {
 return(
 <div>
   <Form>
   <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
               <Form.Label>¿Qué estás pensando?</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
   </Form>


 </div>
 )
}

export { Post }