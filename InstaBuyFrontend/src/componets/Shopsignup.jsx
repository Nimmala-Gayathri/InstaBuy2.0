import React, { useState } from "react";
import {Row, Col,Button, Card} from "react-bootstrap"
import Shop from "../assets/shop.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Shopsignup({setUser}){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSignup = async (e) =>{
        e.preventDefault();
        const body = { name, email, password}
        console.log(body)
        try {
            const response = await axios.post("http://localhost:7000/instabuy/signup",body)

            localStorage.setItem("token",response.data.token)
            localStorage.setItem("userType","seller")
            console.log(localStorage.getItem("userType"));
            setUser(response.data.user)
            console.log(response.data.user)
           navigate('/productchart')
        } catch (error) {
            setError("Signup failed. Please try again.");
            console.error(error);
        }
    }

    const input ={
        border:"1px solid #1565c0 ",
        margin:"1rem",
        padding:"0.5rem",
        borderRadius:'10px',
        width:"90%",
        marginTop:"2rem"
    }
    const button={
        backgroundColor:"#1565c0",
        margin:"2rem",
        width:"50%"
    }
    return(
        <div>
            <Row style={{width:"100.7vw",backgroundColor:"#1565c0",height:"100vh"}}>
               <Col style={{display:"flex",flexDirection:"column",alignItems:"center",overflow:"none",marginTop:"4rem",}}>
                <img src={Shop}/>
                <Button onClick={() =>navigate('/login')} style={{width:"25%",border:"none",backgroundColor:"#e3f2fd",padding:"0.5rem",color:"black"}}>Go To Shopping Login </Button>
                </Col>
                <Col>
                <div style={{textAlign:'center',backgroundColor:"#e3f2fd",height:"68%",width:"55%",margin:"auto",marginTop:"7rem",padding:"2rem",borderRadius:"20px"}}>
                    <form onSubmit={handleSignup}>
                        <p style={{color:"#1565c0"}}>Login and satrt shopping from your favorite brands. Refer a friend and save 50% OFF </p>
                       <input 
                         style={input}
                         placeholder="Enter Name" 
                         type="text"
                         value={name}
                         onChange={(e) =>setName(e.target.value)}
                         required
                        /><br/>
                       <input
                        style={input} 
                        placeholder="Enter Email"  
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        /><br/>
                        <input
                         style={input}
                          placeholder="Enter Password" 
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          /><br/>
                          {error}
                       <Button  type="submit" style={button}>Sellers Login</Button>
                       <h6 style={{color:"#1565c0",borderBottom:"1px solid #1565c0",width:"30%",margin:"auto"}} onClick={() => navigate('/shoplogin')}>Creat Account</h6>
                    </form>
                </div>
                </Col>
            </Row>
        </div>
    )
}