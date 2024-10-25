import React from "react";
import Shop from "../assets/shop.png"
import Buy from "../assets/buy1.png"
import {Row,Col} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
export default function Front() {
    const navigate = useNavigate()
    return(
        <div>
            <Row style={{width:"100.7vw",}}>
                <Col style={{display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"#e3f2fd",height:"100vh",overflow:"none"}}>
                <img src={Buy} style={{width:"32rem",marginTop:"5rem"}}/>
                <button onClick={() =>navigate('/login')} style={{width:"25%",border:"none",backgroundColor:"#1565c0",padding:"0.5rem"}}>Shoppers Login</button>
                </Col>
                <Col style={{display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"#1565c0",height:"100vh",overflow:"none"}}>
                <img src={Shop}  style={{width:"32rem",marginTop:"5rem"}} />
                <button onClick={() => navigate('/shoplogin')} style={{width:"25%",border:"none",backgroundColor:"#e3f2fd",padding:"0.5rem",marginTop:"2rem"}}>Sellers Login</button>             
                </Col>
            </Row>
        </div>
    )
}