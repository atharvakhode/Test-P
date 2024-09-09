import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoleNavbar from "./RoleNavbar";
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';
import MenuIcon from '@rsuite/icons/Menu';
import { useState, useEffect } from "react";
import AllProduct from "./AllProducts";
import logo from "../Pinevox-Horizontal.svg"
import './NavBar.css'


import TopNavbar from './TopNavbar';

const { Fragment } = require("react");

function NavBar() {
    const state = useSelector((state) => state);

    console.log("LoggedIn ", state.loggedin)
    console.log("Cart ", state.cart)


    return (
        <Fragment>
            <TopNavbar />
            <nav className="navbar navbar-expand-md shadow-sm position-sticky mx-md-auto custom-style">
                <a className="navbar-brand px-3" href="/product">
                    <img src={logo} alt="Company_logo" width='50%' height="50%" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fa fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />
                </div>


            </nav>
        </Fragment>

    )
}

export default NavBar;











