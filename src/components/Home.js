import React, { useState , useEffect } from 'react';
import HomeModel  from './HomeModel';
import Header  from './Header';
import Button from 'react-bootstrap/Button';
import {
    Link,
  } from "react-router-dom";

import axios from 'axios';


export default function Home(props) {

    const [show, setShow] = useState(false);
    const[value, setValue] = useState(""); 
    const[groupcode, setGroupcode] = useState(""); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const handleShow = () => console.log('dsdsdsddsd');
    useEffect(() => {
       
    });

    function handle() {
        if(value){
            axios.post('https://watchparty-ji4z-4fi1z6r0p-deversh301.vercel.app'+'/add_url', {
                yt_url: value,
              })
              .then(function (response) {
                 setShow(true);
                 setGroupcode(response.data.group_code)
                 localStorage.setItem("groupcode", response.data.group_code);
                //  localStorage.setItem("user_id", 'host'+response.data.group_code);
                 localStorage.setItem("username", 'Host');
                 props.token(response.data.group_code)
              })
              .catch(function (error) {
                console.log(error);
              });
        }else{
           alert('Please input a valid value.')
        }
      
    }

  return (
     <div className="wrapper">
        <div className="my-page login-page-box d-flex flex-column">
            <Header/>
                <div className="container-sm form-for-home">
                <form>
                    {console.log('dfsdf')}
                    <div className="row">
                        <div className="col-1">
                        </div>
                        <div className="col-10">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Youtube Host URL </label>
                                    <input type="email" className="form-control" onChange={(e) => {setValue(e.target.value)}} aria-describedby="emailHelp"/>
                                </div>
                        </div>
                        <div className="col-1">
                        </div>
                    </div>  
                        <div className="row">
                        <div className="col-1">
                        </div>
                            <div className="col-4">
                                <div>
                                    <Button variant="primary" onClick={ handle }>
                                    Host
                                 </Button>
                                </div>
                           
                            </div>   
                            <div className="col-6 join-button">
                                 <Link  className="btn btn-primary"  to="/">join </Link>
                            </div>   
                        <div className="col-1">
                        </div>
                        </div>
                    </form>
                </div>
                {<HomeModel  handleShow={handleShow}  show={show} handleClose={handleClose} groupcode={groupcode} />}
        </div>
      </div>
  )
}

