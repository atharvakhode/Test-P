import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import LoginRegisterMenu from "./LoginRegisterMenu"
import "./RoleNavbar.css";
import { useState } from "react";


const RoleNavbar = ({ isLoggedIn }) => {

    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const logout = e => {
        dispatch({ type: 'LogOut' })
        sessionStorage.clear();
        history.push("/");
    }

    const state = useSelector((state) => state);
    const history = useHistory()
    const dispatch = useDispatch()
    console.log(sessionStorage.getItem("role"), isLoggedIn)
    console.log(state.loggedin.username);
    if (!isLoggedIn) {
        return (
            <LoginRegisterMenu />
        )
    } else if (isLoggedIn) {
        return (
            <ul className="navbar-nav align-items-center">
                <li className="nav-item">
                    <span className="nav-link text-primary"> Welcome, {state.loggedin.Username}</span>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link nav-link-hover ${activeLink === 'cart' ? 'active' : ''}`} to="/cart" onClick={() => handleLinkClick('cart')}>View Cart {state.cart.length === 0 ? '' :
                        <span className="badge badge-primary p-2">{state.cart.map(x => x.qty).reduce((a, b) => parseInt(a) + parseInt(b))}</span>}</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link nav-link-hover ${activeLink === 'profile' ? 'active' : ''}`} to="/cprofile" onClick={() => handleLinkClick('profile')}>Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link nav-link-hover ${activeLink === 'product' ? 'active' : ''}`} to="/product" onClick={() => handleLinkClick('orders')}>Products</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link nav-link-hover" onClick={logout} to="#">Logout</Link>
                </li>
            </ul>
        )
    }

}



export default RoleNavbar;