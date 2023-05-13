import React, { useState , useRef , useEffect } from 'react';
import YouTube, { YouTubePlayer } from "react-youtube";
import Headervideo  from './Headervideo';
import Chatbox  from './Chatbox';
import LeaveModel from './LeaveModel';
import { useHistory } from 'react-router-dom';


import axios from 'axios';
const { io } = require("socket.io-client");
const socket = io('https://watchparty-ji4z-4fi1z6r0p-deversh301.vercel.app' );
var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;
// eslint-disable-next-line
let videoElement:  YouTubePlayer = null;
// eslint-disable-next-line

const pagejustloaded  = Math.round(Date.now())



export default function Videocontainer() {
  // //////////////////console.log('video contaiber render')

   const setting_videos = () => {
          let ytcode =  localStorage.getItem('groupcode')
          //let ytcode =  'AS1EW'
          axios.get('https://watchparty-ji4z-4fi1z6r0p-deversh301.vercel.app'+'/get_url/'+ytcode)
          .then(function (response) {
            let string = response.data.data.url
          //////console.log(string.replace('https://', '').split("/").slice(-1)[0] );
          setUrl(string.replace('https://', '').split("/").slice(-1)[0])
          setShow(true)
          })
        .catch(function (error) {
          //////////////////console.log(error);
        })
        .then(function () {
          // always executed
        });
   }
 
  useEffect(() => {
          // //////////////////console.log('use effect runnig')
          setting_videos()
          let box = document.querySelector('.video-container');
          let width = box.offsetWidth;
          let height = box.offsetHeight;
          setVideoWidth({width:width,height:height })
          //////console.log({ width, height });

          window.addEventListener('resize', function(){
            if(window.innerHeight <=450){
              setchatheight("d-flex chatboxes")
            }else{
              setchatheight("d-flex")
            }

            setinnerheight(window.innerHeight)
          });
          window.addEventListener('popstate', (event) => {
              //////console.log('my events')
               socket.emit('leaving_group', {user_ids: localStorage.getItem('user_id'), group_code: localStorage.getItem('groupcode') });
                 /////  history.block()
                 // return false;
          });

         
         
          const onScroll = () => setOffset(window.pageYOffset);
          // clean up code
          window.removeEventListener('scroll', onScroll);
          window.addEventListener('scroll', onScroll, { passive: true });
          return () => window.removeEventListener('scroll', onScroll);
  }, []);

  

 


  const [show, setShow] = useState(false); 
  const [url, setUrl] = useState(""); 
  const [pause, setpause] = useState(false); 
  const [socketid , setSocketid ] = useState([])
  const [senderData , setsenderData ] = useState({})
  const [joinedUsers , setjoinedUsers ] = useState([])
  const [innerheight  , setinnerheight ] = useState(0)
  const [chatheight  , setchatheight ] = useState("d-flex")
  const [offset, setOffset] = useState(0);
  const [runsuserUpdate , setrunsuserUpdate] = useState(false)
  const [fixedOrnot , setfixedOrnot] = useState({position: "absolute"});
  const [chatsData , setchatsData ] = useState([{"self":0,
                      "message" : 'Welcome to youtube watch development module',
                      "username": 'Bot' ,
                       "type" : 1
                    },
                    {"self":0,
                    "message" : 'Start sharing group code '+localStorage.getItem('groupcode')+' and invite more people',
                    "username": 'Bot',
                    "type" : 1
                    }
                    ,{"self":0,
                    "message" : 'How are you doing buddy!',
                    "username": 'Bot',
                    "type" : 1
                    }
]); 
const [showmodel, setShowmodel] = useState(false);
const handleClose = () => setShowmodel(false);
const handleShow = () => setShowmodel(true);
const [isselfstaterun  , setisselfstaterun ] = useState(Math.round(Date.now()))
const [isActive, setActive] = useState(false);

const toggleClass = () => {
      // console.log(isActive)
        setActive(!isActive);
};

///console.log('************main value'+isselfstaterun)




   //////////////////console.log('*********random_identity loaded')
  let random_identity = Math.round(Date.now());
  const constant_time_when_page_loaded = Math.round(Date.now());
  const [got_the_socket_io_event , setgot_the_socket_io_event] = useState();

  // let testing_pause_time = Math.round(Date.now());
    

  let socket_id;
  let local_socket_id;
  localStorage.setItem('isVideopaused' , false)
  

  useEffect(() => {
      //////////////////console.log('api hitting')
      updateJoinedUsers()
  }, [runsuserUpdate]);


  const [videoWidth , setVideoWidth] = useState({})

  const chatMessagehandler = (chatmessage)=>{
    //////////////////console.log('chat_message_emits')
    socket.emit('chat_message', { group_code: localStorage.getItem('groupcode') , chatmessage: chatmessage,
    sender_id: localStorage.getItem('user_id') , username:localStorage.getItem('username') , type:1 });
  }


  const chatMessageonkeyup = ()=>{
    //////////////////console.log('chat_message_emits')
    socket.emit('chat_message', { group_code: localStorage.getItem('groupcode') , chatmessage: "",
    sender_id: localStorage.getItem('user_id') , username:localStorage.getItem('username') , type:2 });
  }


  const onuserStopChat = () => {

    socket.emit('chat_message', { group_code: localStorage.getItem('groupcode') , chatmessage: "",
    sender_id: localStorage.getItem('user_id') , username:localStorage.getItem('username') , type:3 });
  }
  


  const updateJoinedUsers = () => {
    axios.get('https://watchparty-ji4z-4fi1z6r0p-deversh301.vercel.app'+'/get_members/'+localStorage.getItem('groupcode') )
    .then(function (response) {
      //////////////////console.log('api_response given here')
      // //////////////////console.log(response.data)
      if(response.data.data){
          setjoinedUsers(response.data.data)
      }
    })
  .catch(function (error) {
    //////////////////console.log(error);
  })
  .then(function () {
    // always executed
    //////////////////console.log('wrong happens');
  });
  }

  const send_pointer = ()=> {

    socket.on('refresh_page', function(data) {
      history.go(0)
    }); 
    
    /** this method is recieving all the join events emited by other user or other video streamer***/
    socket.on('send_pointer', function(data) {
        /* this if conditions is checking recieved request is for  other user not himself*/   
        if( (localStorage.getItem('socket_id') != data.socket_id)  ){
                   /* this if conditions is checking recieved request is for  other user not himself*/   
                    if(localStorage.getItem('user_id') != data.user_id){
                      /* this value is useful for tracking the time of recieving and performing next action acording to it */
                      setgot_the_socket_io_event(Math.round(Date.now()));
                        
                                /* bussiness logic of this function*/                        
                                videoElement.target.seekTo(data.pointer)
                                 if(data.player_state === 2){
                                  videoElement.target.pauseVideo()
                                 }else if(data.player_state === 1){
                                  videoElement.target.playVideo();
                                 }
                    }
                    /* hitting api and updating values for joined users cjeck */
                    updateJoinedUsers()
              }  
       
          random_identity = Math.round(Date.now() / 1000);
          socket_id = data.socket_id;
          localStorage.setItem('socket_id' , data.socket_id)
      });
  }
  

// eslint-disable-next-line
  const _onReady = (event: YouTubePlayer) => {
    videoElement = event;
    videoElement.target.mute();
    videoElement.target.playVideo()
    emitCode(event)
    updateJoinedUsers();
  };
  

  
 

  const emitCode = (event) =>{
        let current_time = Math.round(Date.now() / 1000);
        let time_gap_on_request = current_time - random_identity
            socket.emit('join', {group_code: localStorage.getItem('groupcode'), 
            emit_from_clint: event.target.getCurrentTime(),
            sender_id: localStorage.getItem('user_id'),  player_state: event.target.getPlayerState(),
            username:localStorage.getItem('username')});
  }
  

  useEffect(() => {
    if(localStorage.getItem('user_id') != senderData.sender_id){

                    /* handling and removing typing values when user start typing it remove pending values*/
                    setchatsData(function(chatsData){
                         let  data_msg = chatsData.filter(function(item) {
                              return ( (item.type != 2 || item.username != senderData.username ))
                            }); 
                         return data_msg;
                    });
                   
                    /* handling and removing typing values when user start typing it remove pending values*/
                    if(senderData.type == 3){
                         setchatsData(function(chatsData){
                           let  data_msg = chatsData.filter(function(item) {
                                return ( (item.type == 1 || item.username != senderData.username ))
                              }); 
                             return data_msg;
                      });
                    }
                  
                    /* type 2 means user start typing add value for this*/
                    if(senderData.type == 2){
                          setchatsData(chatsData => [...chatsData, {
                          "self":0,
                          "message" : "cocotheking",
                          "username": senderData.username,
                          "type" : 2
                          }]);  

                    }else{
                      setchatsData(chatsData => [...chatsData, {
                      "self":0,
                      "message" : senderData.chatmessage,
                      "username": senderData.username,
                      "type" : 1
                      }]);  
                  }
                       
          }else{
            setchatsData(chatsData => [...chatsData, {
              "self":1,
              "message" : senderData.chatmessage,
              "username": senderData.username,
              "type" : 1
            }]);  
      }
     
  }, [senderData]);


  useEffect(
    () => {
      socket.off('chat_send');
      socket.on('chat_send', function(data) {
        const tempSelectedList = [data.socket_id]
        setSocketid(tempSelectedList)
        setsenderData(data)
        return () => {
          socket.disconnect('chat_send');
          socket.off('chat_send');
        }

    });
      
    socket.on('user_removed', function(data) {
       updateJoinedUsers()
        return () => {
          socket.disconnect('user_removed');
          socket.off('user_removed');
        }
    });
    },
    [socket])


   

  const Onpause = (event)=>{
    setTimeout(() => {
      if(videoElement.target.getPlayerState() == 2){
          let timevaluefor = Math.round(Date.now())
          setisselfstaterun(timevaluefor)
          socket.emit('join', {group_code: localStorage.getItem('groupcode'), 
          emit_from_clint: event.target.getCurrentTime(),
          sender_id: localStorage.getItem('user_id'),  player_state: videoElement.target.getPlayerState(),
          username:localStorage.getItem('username')});
      }
    }, "250")
      let current_time = Math.round(Date.now());
}

  
const statechange = (event)=>{
    let current_time = Math.round(Date.now());
    let runscript = 0
    let time_gap_on_request = current_time - random_identity

   /* this function is checking that user not continous hiting play button there should be minimum
    4 seconds gap on play button , then it is chcking it is event data 1 which means it is 
    play pouse event hitting  and then it is showing pagejustloded means after page loading there 
    would be some time  */
  if(((current_time - isselfstaterun) < 4000) &&  event.data == 1 &&  (videoElement.target.getCurrentTime() >=1) &&  ((current_time - pagejustloaded) > 4000 )){
               videoElement.target.pauseVideo()
               setchatsData(function(chatsData){
                     let  data_msg = chatsData.filter(function(item) {
                          return ( (item.message !== "Please do not try to hit pause button continous. try hit after some seconds" ))
                        }); 
                     return data_msg;
                  });
              setchatsData(chatsData => [...chatsData, {
                  "self":0,
                  "message" : "Please do not try to hit pause button continous. try hit after some seconds",
                  "username": "Bot",
                  "type" : 1 ,
                  "class" : isActive
            }]);
           toggleClass()
  }else{
     /* checking it is not self socket io after response so we tracking the time got_the_socket_io_event
      also first time it will be NAN  */
     if( isNaN((current_time- got_the_socket_io_event)) || (current_time- got_the_socket_io_event)> 1000 ){
          let data_state = (time_gap_on_request <= 1 && event.data != 3 )?1:event.data
                        if (data_state === 1 ) {
                                      localStorage.setItem('isVideopaused' , true)
                                      socket.emit('join', {group_code: localStorage.getItem('groupcode'), 
                                      emit_from_clint: event.target.getCurrentTime(),
                                      sender_id: localStorage.getItem('user_id'),  player_state: 1,
                                      username:localStorage.getItem('username')});
                        }
              } 
              else if(event.data == 1  &&  (current_time- got_the_socket_io_event)> 550 ){
                           socket.emit('join', {group_code: localStorage.getItem('groupcode'), 
                            emit_from_clint: event.target.getCurrentTime(),
                            sender_id: localStorage.getItem('user_id'),  player_state: 1,
                            username:localStorage.getItem('username')});
              }
        }       
        send_pointer()
        random_identity = Math.round(Date.now());
  }


  const setsocket_id =  async (id) => {
       setSocketid(id)
  }

  const opts = {
    height: videoWidth.height,
    width: videoWidth.width,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const handlemodel = () => {
    setShowmodel(true);
  }


  useEffect(() => {
    (offset >100)?(setfixedOrnot({position:"fixed"})):(setfixedOrnot({position:"absolute"}))
  }, [offset]);

  const history = useHistory();
  const onFormSubmit = () => {
    socket.emit('leaving_group', {user_ids: localStorage.getItem('user_id'), group_code: localStorage.getItem('groupcode') });
    history.push('/')
  }

  
  return (
    <>
     <div className="wrapper"   >
          <div className="my-page login-page-box_video d-flex flex-column">
                <Headervideo  leavegroup={onFormSubmit}/>
                  <div >
                        <div className="video-container" >
                            <div className="video-fixed" style={fixedOrnot}>
                              {/* <h1>hii moto</h1> */}
                                {show?<YouTube videoId={url} opts={opts} onReady={_onReady} onPause={Onpause}  onStateChange={ statechange}  />:""}
                            </div>
                        </div>
                        <div className={chatheight}  style={{ width:videoWidth.width}}  >
                                  <div className="col-md-12 ">  
                                      <Chatbox  isActive={isActive}  onuserStopChat={onuserStopChat} chatMessageonkeyup={chatMessageonkeyup}  handlemodel={handlemodel}   joinedUsers={joinedUsers} chatMessagehandler={chatMessagehandler}  chatsData={chatsData} />
                                  </div>
                        </div>
                          
                  </div>
                
                  {<LeaveModel  handleShow={handleShow}  show={showmodel} handleClose={handleClose}  />}
           </div>
           
                
      </div>
      
    </>

  )
}
