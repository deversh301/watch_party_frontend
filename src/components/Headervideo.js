import React from "react";
import { Link } from "react-router-dom";

export default function Headervideo(props) {
  return (
    <div className="navbar_sec">
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" onClick={props.leavegroup} href="#">
            Logo{" "}
          </a>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse1"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse1">
            <div className="navbar-nav">
              <a
                className="nav-item nav-link"
                onClick={props.leavegroup}
                href="#"
              >
                Home{" "}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
