import React, { useState, useEffect, useRef } from "react";

export function loadersection() {
  return (
    <>
      <div className="other_user_msg">
        <div className="stage">
          <div className="dot-elastic"></div>
        </div>
      </div>
    </>
  );
}

export function chatsection(props) {
  let classofthis = props.data.class ? "Bot" : "";
  //console.log(props);
  return (
    <div className={props.data.username == "Bot" ? classofthis : ""}>
      <p className="small p-2 ms-3 mb-3 rounded-3  text-white rounded-3 bg-warning_sender">
        {props.data.message}
      </p>
    </div>
  );
}

export default function Receiver(props) {
  const bottomRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    var messageBody = document.querySelector("#scroll-to-bottom");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
  }, [props.data]);
  {
    console.log("@@@@@@@@@@@@@@@@@ " + props.isActive);
  }

  return (
    <>
      {/* <div  ref={bottomRef}  className="d-flex justify-content-between"> */}
      <div className="d-flex justify-content-between">
        <p className="small mb-1">{props.data.username}</p>
        <p className="small mb-1 text-muted"></p>
      </div>
      <div className="d-flex flex-row justify-content-start">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
          alt="avatar 1"
          style={{ width: "45px", height: "100%" }}
        />
        {props.data.message == "cocotheking"
          ? loadersection()
          : chatsection(props)}
      </div>
    </>
  );
}
