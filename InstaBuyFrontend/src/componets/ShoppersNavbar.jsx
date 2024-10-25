import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import Logo from "../assets/logo.png"
import cartButton from "../assets/cartButton.png"
import home from "../assets/home.png"
import profile from '../assets/profile.png'
import { useNavigate } from "react-router-dom";

export default function ShoppersNavbar({handleShopperLogout,cartItem,navigate,user}){
  const naviagte = useNavigate()
    return(
        <div style={{position:"fixed",width:"100%",}}>
          <Navbar className='page1' style={{marginBottom:"5rem"}}>
            <Navbar.Brand style={{ color: "#216ad9", fontSize: "1.7rem", fontWeight: "bolder" }}>
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            style={{ marginTop: "7px" }}
          />{' '}
          InstaBuy!
         </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {user &&
           <Button onClick={() => {
            navigate("/cart")
          }}
            style={{ backgroundColor: "white", border: "none", width: "5rem" }}> 
            <img src={cartButton} style={{ width: "2.5rem" }} /> &nbsp; {Object.keys(cartItem).length > 0 && (<Badge bg='success'> {Object.keys(cartItem).length}</Badge>)}</Button>}
            <img src={profile} style={{ width: "2.5rem",marginRight:"1rem" }} onClick={() => navigate('/profile')} />
          <Button onClick={handleShopperLogout} style={{ width: "7rem" }}>{user ? "Logout" : "Login"}</Button>
          {user && <img src={home} style={{ width: "2.5rem", marginLeft: "0.5rem" }} onClick={() => navigate("/products")} />}
        </Navbar.Collapse>
      </Navbar>
        </div>
    )
}