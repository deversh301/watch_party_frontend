import React from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import Youtubelist from './Youtubelist';

function handle() {
   

} 



export default function LeaveModel(props) {
  return (
      <Modal  show={props.show} onHide={props.handleClose}>
          <Modal.Header  className="youtubevideo"   closeButton>
            <Modal.Title>Search Video</Modal.Title>
          </Modal.Header>
          <div className="wrapper">
           <div className="my-page login-page-box d-flex flex-column">
                 <Youtubelist/>
                 </div>
           </div>   
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
  )
}
