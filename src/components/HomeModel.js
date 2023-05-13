import React , { useState} from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import {
    Link,
    useHistory 
  } from "react-router-dom";

import axios from 'axios';


  function handle(history) {
        axios.post('https://watchparty-ji4z-4fi1z6r0p-deversh301.vercel.app'+'/add_members', {
          group_code:  localStorage.getItem("groupcode"),
          username: 'Host'
      })
      .then(function (response) {
            // console.log(response.data.data.insertedId)
            // localStorage.setItem("groupcode", group_code);
            localStorage.setItem("user_id", response.data.data.insertedId);
            //////// localStorage.setItem("username", username);
            history.push('/videopage')
      })
      .catch(function (error) {
          console.log(error);
      });
    
  } 

 
export default function HomeModel(props ) {
  const history = useHistory();

  const copyToClipboard = async (e) => {
    console.log('copy calling')
    const textArea = document.createElement("textarea");
    textArea.value =  window.location.origin+'/?code='+localStorage.getItem("groupcode");
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
    setsetingclass('adding_btn_copy')
  }

  const [setingclass, setsetingclass] = useState('adding_btn');

  return (
    <>
     <Modal show={props.show} onHide={ props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Copy code & share</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
           {props.groupcode} is the joining code  for this group. copy and share with your friends for joining.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"    className={setingclass}  onClick={(e) => { copyToClipboard(e)}}>
            Copy
          </Button>
          <Button   onClick={()=>handle(history)}  className="btn btn-primary"  to="/videopage">
            Join 
           </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
