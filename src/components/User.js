import React, { useState , useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Header  from './Header';
import { useHistory , Link } from 'react-router-dom';


const axios = require('axios').default;


export default function User(props) {

    const history = useHistory();
    const [username, setUsername] = useState("");
    const current_page_url = window.location.href
    let default_value_groupcode =  current_page_url.includes("=")?current_page_url.replace("&i=1", '').split("=").pop():"";
    const [group_code, setGroupcode] = useState(default_value_groupcode); 
   //// const current_page_url = window.location.href
   
    console.log( current_page_url.split("=").pop())
    useEffect(() => {
       
    });

    function handle() {
        console.log(username)
        console.log(group_code)

        if(group_code && username  ){
            axios.get('https://watchparty-server.onrender.com'+'/get_url/'+group_code)
            .then(function (response) {
              console.log(response.data)
              if(response.data.data){
                    axios.post('https://watchparty-server.onrender.com'+'/add_members', {
                        group_code: group_code,
                        username: username
                    })
                    .then(function (response) {
                       // console.log(response.data.data.insertedId)
                        localStorage.setItem("groupcode", group_code);
                        localStorage.setItem("user_id", response.data.data.insertedId);
                        localStorage.setItem("username", username);
                        props.token(group_code)
                        history.push('/videopage')
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
              }else{
                alert('invalid code')
              }
            })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });
        }else{
            alert('Please enter valid value')
        }
        
      
    }

  return (
     <div className="wrapper">
        <div className="my-page login-page-box d-flex flex-column ">
        <Header/>
                <div className="container-sm form-for-home">
                    <form>
                    {console.log('dfsdf')}
                    <div className="row">
                    <div className="col-1">
                    </div>
                        <div className="col-10">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username </label>
                                <input type="text" className="form-control" onChange={(e) => {setUsername(e.target.value)}} aria-describedby="emailHelp"/>
                            </div>
                        </div>
                    <div className="col-1">
                    </div>
                    </div>  
                    <div className="row">
                    <div className="col-1">
                    </div>
                        <div className="col-10">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Groupcode </label>
                                <input type="text" className="form-control" value={group_code} onChange={(e) => {setGroupcode(e.target.value)}} aria-describedby="emailHelp"/>
                            </div>
                        </div>
                    <div className="col-1">
                    </div>
                    </div>  
                        <div className="row">
                        <div className="col-1">
                          </div>
                            <div className="col-5">
                            <Button variant="primary" onClick={  handle }>
                               Join video
                            </Button>
                            </div>   
                            <div className="col-5 join-button">
                                 <Link  className="btn btn-primary"  to="/join">host </Link>
                            </div> 
                        </div>
                    </form>
                </div>
        </div>
      </div>
  )
}

