import React from "react";
import{ Navbar ,Container} from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Logo from "../assets/bestseller.png"
export default function SellersNavbar({handleSellerLogout,cartItem,navigater,use}){
    return(
        <div>
        <Navbar style={{padding:"2rem",backgroundColor:"#6ba3e8"}}>
            <Navbar.Brand style={{ color: "black", fontSize: "2rem", fontWeight: "bolder" }}>
          <img
            src={Logo}
            width="50"
            height="45"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
            // style={{ marginTop: "7px" }}
          />{' '}
          InstaBuy Sellers
         </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
            <Button onClick={handleSellerLogout} style={{width:"12rem",backgroundColor:"white",border:"none",color:"#216ad9",fontWeight:"600",fontSize:"1.2rem"}}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>

        </div>
    )
}
//"#f5cb42"