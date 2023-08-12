import Videocontainer from './components/Videocontainer'
import React, { useState , useEffect } from 'react';
import Home from './components/Home'
import User from './components/User'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



//added some rendom commnets
import { Form } from 'react-bootstrap';

require('dotenv').config()

console.log('https://watchparty-server.onrender.com')

function App() {
  
  const [token, setToken] = useState(localStorage.getItem('groupcode')); 
  useEffect(() => {
   
    
  });

  function clickedButon(groupcode){
    setToken(groupcode)
    console.log('groupcode'+token)
  }
  return (
<Router>
    <Switch>
        <Route exact path="/">
             <User token={clickedButon} />
        </Route>
        <Route exact path="/videopage">
             {token?<Videocontainer/>:<User token={clickedButon} />}
        </Route>
        <Route exact path="/join">
        <Home token={clickedButon} />
        </Route>
    </Switch> 
  </Router> 
  );
}
export default App;
