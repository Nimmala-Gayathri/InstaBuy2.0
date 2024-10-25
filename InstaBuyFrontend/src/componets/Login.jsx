import React, { useState } from "react";
import { Row,Col,Form,Button } from "react-bootstrap";
import LoginImg from "../assets/LoginImg.png";
import {useNavigate} from "react-router-dom"
import axios from "axios";

export default function Login({setUser}){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const navigate  = useNavigate()

    const input ={
        width :"90%",
        marginLeft:"1.5rem",
        marginTop:"3rem",
        height:"3.5rem",
        borderRadius:"16px"
    }

    const handleLogin = async(e) =>{
        e.preventDefault();

        try {
            const respose = await axios.post("http://localhost:7000/instabuy/login",{
                email,
                password,
            })
            localStorage.setItem("token",respose.data.token)
            localStorage.setItem("userType","shoppers")
            console.log(localStorage.getItem("userType"));
            setUser(respose.data.user)
            navigate('/shoppershome')
        } catch (error) {
            setError('Login failed. Please check your credentials.')
        }
    }

    return(
    
        <div style={{backgroundColor:"#e3f2fd",height:"100vh"}}>
            <Row style={{width:"100vw"}}>
                <Col>
                <div style={{backgroundColor:"#1565c0",padding:"1rem",width:"55%",height:"80%",margin:"auto",marginLeft:"14rem",marginTop:"6rem",borderRadius:"16px"}}>
                     {/* <h1 style={{color:"white",fontSize:"4rem"}}>InstaBuy!</h1>
                     <p  style={{color:"white", width:"40%"}}>One place whre brands come together From all across the world.</p> */}
                     <Form onSubmit={handleLogin}>
                        <p style={{color:"white",fontSize:"1.1rem",margin:"1rem"}}>Login and start shopping from your favorite brands. refer a friend and save 50% OFF</p>
                            {/* <div style={{display:"flex",justifyContent:"space-between",width:"75%"}}> */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter Username"
                                    style={input}
                                    value={email}
                                    onChange={(e) =>setEmail(e.currentTarget.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Enter Password" 
                                    value={password}
                                    onChange={(e) =>setPassword(e.target.value)}
                                    style={input}
                                    />
                                </Form.Group>
                            {/* </div> */}
                            <Button
                            style={{background:"#216ad9",border:"2px solid white",width:"60%",color:"#1565c0",backgroundColor:"white",marginLeft:"5rem",marginTop:"2rem",fontWeight:"700",height:"3rem",borderRadius:"16px"}} 
                            variant="outline-secondary" type="submit">
                                Submit
                            </Button>
                            
                            <p style={{color:"red",marginTop:"1rem",marginLeft:"2rem",fontWeight:"500"}}> {error}</p>
                            <div style={{color:"white" ,marginTop:"2rem",marginLeft:"9rem"}}>
                                <span onClick={() => navigate("/signup")} style={{color:"white",borderBottom:"1px solid white",marginTop:"2rem"}}>Create Account</span>
                            </div>
                        </Form>
                </div>
                </Col>
                <Col> <img src={LoginImg} style={{height:"70vh",marginTop:"2rem",marginLeft:"7rem"}}/><br/>
                <Button onClick={()=>navigate('/shoplogin')} style={{marginLeft:"18rem",width:"30%",marginTop:"2rem",height:"3rem",backgroundColor:"#1565c0",fontSize:"1.3rem"}}> Sellers Login</Button>
                </Col>
            </Row>
        </div>
    );
}