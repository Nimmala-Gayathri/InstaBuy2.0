import React, { useState } from "react";
import {Row, Col,Button, Card} from "react-bootstrap"
import Shop from "../assets/shop.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Shoplogin({setUser,setUserType}){
    const [email,setEmail] = useState("")
    const [password,setPassword]= useState("")
    const [error,setError] =useState("")
    const navigate = useNavigate()

    const handleLogin = async(e) =>{
        e.preventDefault();

        try {
            const respose = await axios.post("http://localhost:7000/instabuy/login",{
                email,
                password,
            })

            localStorage.setItem("token",respose.data.token)
            localStorage.setItem("userType","seller")
            console.log(localStorage.getItem("userType"));
            setUser(respose.data.user)
            setUserType('seller')
            navigate('/productchart')
        } catch (error) {
            setError('Login failed. Please check your credentials.')
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
               <Col style={{display:"flex",flexDirection:"column",alignItems:"center",overflow:"none",marginTop:"4rem",height:"89.5vh"}}>
                <img src={Shop}/>
                <Button onClick={()=>navigate('/login')} style={{width:"25%",border:"none",backgroundColor:"#e3f2fd",padding:"0.5rem",color:"black"}}>Go To Shopping Login </Button>
                </Col>
                <Col>
                <div style={{textAlign:'center',backgroundColor:"#e3f2fd",height:"65%",width:"55%",margin:"auto",marginTop:"6rem",padding:"2rem",borderRadius:"20px"}}>
                    <form onSubmit={handleLogin}>
                        <p style={{color:"#1565c0"}}>Login and satrt shopping from your favorite brands. Refer a friend and save 50% OFF </p>
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
                       <Button type="submit" style={button}>Sellers Login</Button>
                       <h6 style={{color:"#1565c0",borderBottom:"1px solid #1565c0",width:"30%",margin:"auto"}} onClick={() => navigate('/shopsignup')}>Creat Account</h6>
                    </form>
                </div>
                </Col>
            </Row>
        </div>
    )
}