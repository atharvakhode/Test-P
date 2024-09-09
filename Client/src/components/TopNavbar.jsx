import React, { Component } from "react";
import "./TopNavbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faHeadset,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function TopNavbar() {
  return (
    <div className="top_nav">
      <div className="row1">
        <div className="helper-container">
          <div className="top_nav_left">
            <a style={{ color: "#b5aec4" }} href="https://pinevox.com/contact/" target="_blank">
              <FontAwesomeIcon icon={faHeadset} />
              <span>&nbsp;</span>
              Help
            </a>
          </div>
          <span> | </span>
          <a className="top_nav_left" href="tel:+443301796233">
            <FontAwesomeIcon icon={faPhone} style={{ color: "#b5aec4" }} />
            <span>&nbsp;&nbsp;</span>
            +44-330-179-6233
          </a>
          {/* <span> | </span>
          <div className="top_nav_left">
            <Link
              to="/clogin"
              style={{ color: "#b5aec4", textDecoration: "none" }}
            >
              <FontAwesomeIcon icon={faRightToBracket} />
              <span>&nbsp;&nbsp;</span>Login
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
