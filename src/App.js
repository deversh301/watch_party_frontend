import Videocontainer from './components/Videocontainer'
import React, { useState , useEffect } from 'react';
import Home from './components/Home'
import User from './components/User'
import Youtubelist  from './components/Youtubelist'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Form } from 'react-bootstrap';


console.log('https://watchparty-ji4z-4fi1z6r0p-deversh301.vercel.app')

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
        <Route exact path="/listing">
        <Youtubelist  />
        </Route>
        
    </Switch> 
  </Router> 
  );
}
export default App;
