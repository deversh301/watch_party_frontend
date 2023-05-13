import React, { useState ,useEffect , useRef  } from 'react';

export default function Sender(props) {
const bottomRef = useRef(null);
        
useEffect(() => {
     // 👇️ scroll to bottom every time messages change
     bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
     var messageBody = document.querySelector('#scroll-to-bottom');
     messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  
}, [props]);    

  // {console.log('chat message')}
  // {console.log(props)}
  return (
    <>
    {/* <div ref={bottomRef}  className="d-flex justify-content-between"> */}
    <div  className="d-flex justify-content-between">
            <p className="small mb-1 text-muted"></p>
            <p className="small mb-1">{props.data.username}</p>
            </div>
            <div className="d-flex flex-row justify-content-end">
            <div>
                <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">{props.data.message}</p>
            </div>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                alt="avatar 1"  style={{"width": "45px", "height": "100%"}}/>
    </div>
    </>
  )
}
