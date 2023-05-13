import React from 'react'
import Sender from './Sender'
import Receiver from './Receiver'

export default function Chat(props) {
   /////// console.log(props.chatsData)
    
  return (
   
<div className="card-body "  id="scroll-to-bottom"  data-mdb-perfect-scrollbar="true" style={{"position": "relative", "height": "350px"}}>
        {(props.chatsData.map((chatsData , index) => (chatsData.message)?((chatsData.self )?<Sender data={chatsData}  key={index}/>:<Receiver key={index}  isActive={props.isActive}  data={chatsData}/>):''))}    
  </div>
  )
}
