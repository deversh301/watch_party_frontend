import React from 'react'

export default function Joinedlist(props) {
  return (
    <>
     <li><a className="dropdown-item" href="#"><img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                alt="avatar 1"  style={{"width": "20px", "height": "100%"}}/>{props.username}</a></li>
     
    </>
  )
}
