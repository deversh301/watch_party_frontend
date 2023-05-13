import React, { useState ,useEffect , useRef  } from 'react';
import Button from 'react-bootstrap/Button';
import Chat  from './Chat';
import Joinedlist from './Joinedlist';
import {
  Link,
} from "react-router-dom";
import { useDebounce } from "use-debounce";


var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;





export default function Chatbox(props) {
    // console.log(props.joinedUsers)
    const bottomRef = useRef(null);
     const [timingsfor  , settimingsfor] = useState(0)
     const [nooftimesithits  , setnooftimesithits] = useState(1)


  const onFormSubmit = e => {
    e.preventDefault();
    textInput.current.focus();
    // scroll.scrollToBottom({smooth: false});
   

     props.chatMessagehandler(chatmessage)
     setChat(""); 
    // send state to server with e.g. `window.fetch`
  }



  

   


    // const doStuff =  () => {
    //     console.log('do stuff');
    // }

  
   var timer = null;
    const onkeyup = (e) => {
      // let current_time = Math.round(Date.now() / 1000);
      // let time_gap_on_request = current_time - random_identity
            // console.log('timegap'+(Math.round(Date.now() / 1000) - timingsfor))
            // console.log(Math.round(Date.now() / 1000))
            // console.log('hitssss'+ nooftimesithits)
            setChat(e.target.value)
            if(((Math.round(Date.now() / 1000) - timingsfor) >= 2)  || (nooftimesithits % 20 == 0)){
              props.chatMessageonkeyup()
            }
            settimingsfor(Math.round(Date.now() / 1000))
            let timesofhit = nooftimesithits + 1
            setnooftimesithits(timesofhit)
            
    }


  //    useEffect(() => {
  //     ////////////console.log('api hitting')
     
  //      console.log('timings chnaged')

  // }, [timingsfor]);


  

  const textInput = useRef(null);

  const clickinghere = () => {
    
 
  }

  useEffect(() => {
    textInput.current.focus();
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })

}, []);

    const [chatmessage, setChat] = useState([]); 
    const [debouncedText] = useDebounce(chatmessage, 1000);

      useEffect(() => {
            props.onuserStopChat();
      }, [debouncedText]);

  return (
    
        <div id="chatboxy"  onClick={clickinghere}  className="card vertical-scrollable ">
          <div className="card-header container"
            style={{"border-top": "4px" ,"solid" : "#ffa900"}}>
             <div className='row'>
                  <div className="col-6  content_align_left">
                     <div className='search_you'>
                      <Button  onClick={props.handlemodel} className=" btn-primary" ><i className="fa-solid fa-magnifying-glass"></i>   </Button>
                      </div>
                  </div> 
                  <div className="col-6 content_align_right">
                        <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          Joined list
                        </button>
                        <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton1">
                              {props.joinedUsers.map(users => <Joinedlist username={users.username}/>)}  
                              
                        </ul>
                      </div>
                  </div> 
             </div> 
          </div>
           <Chat isActive={props.isActive}  chatsData={props.chatsData}/>
          <div    className="card-footer">
          <form onSubmit={onFormSubmit}>
            <div ref={bottomRef} className="row">  
              <div className="col-10">
                  <input type="text"    ref={textInput} id="messageinout" className="form-control" value= {chatmessage} onChange={(e) => {onkeyup(e)}} placeholder="Type message"
                  aria-label="Recipient's username" aria-describedby="button-addon2" autofocus/>
                </div>
                <div className="col-2">
                    <Button  className="btn btn-warning"  variant="primary" onClick={ onFormSubmit }>
                            Send
                    </Button>
                    
                </div>
            </div>
            </form>
          </div>
        </div>

  )
}
