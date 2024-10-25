import React,{ useState } from "react"; 
import { Row,Col,Form,Button } from "react-bootstrap";
import SigninImg from "../assets/signin.png"
import {useNavigate} from "react-router-dom"
import axios from "axios";

export default function Signup({setUser}) {
    const [email,setEmail] = useState("") 
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [error,setError] = useState("")
    const navigate  = useNavigate()

    const handleSignup = async (e) =>{
        e.preventDefault();
        const body = { name, email, password}
        console.log(body)
        try {
            const response = await axios.post("http://localhost:7000/instabuy/signup",body)

            localStorage.setItem("token",response.data.token)
            localStorage.setItem("userType","shoppers")
            console.log(localStorage.getItem("userType"));
            setUser(response.data.user)
            console.log(response.data.user)
           navigate('/shoppershome')
        } catch (error) {
            setError("Signup failed. Please try again.");
            console.error(error);
        }
    }

    const input ={
        width :"90%",
        marginLeft:"1.5rem",
        marginTop:"3rem",
        height:"3.5rem",
        borderRadius:"16px"
    }

    return(
        <div  style={{backgroundColor:"#e3f2fd"}}>
            <Row style={{width:"99vw",height:"100vh"}}>
                <Col>
                
                <div style={{backgroundColor:"#1565c0",padding:"1rem",width:"55%",height:"83%",margin:"auto",marginLeft:"14rem",marginTop:"4rem",borderRadius:"16px"}}>
                     <Form onSubmit={handleSignup} >
                     <p style={{color:"white",fontSize:"1.1rem",margin:"1rem"}}>Login and start shopping from your favorite brands. refer a friend and save 50% OFF</p>
                               <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Control type="name" placeholder="Enter Name" 
                                    style={input} 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter Username" 
                                    style={input}
                                    value={email}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Enter Password"
                                    style={input}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                               
                            <Button 
                            style={{background:"#216ad9",border:"2px solid white",width:"60%",color:"#1565c0",backgroundColor:"white",marginLeft:"5rem",marginTop:"2rem",fontWeight:"700",height:"3rem",borderRadius:"16px"}} 
                            variant="outline-secondary" type="submit">
                                Submit
                            </Button>
                            <p style={{color:"red",marginTop:"1rem",marginLeft:"5rem",fontWeight:"500"}}> {error}</p>
                            <div style={{color:"white" ,marginTop:"2rem",marginLeft:"9rem"}}>
                                <span onClick={() => navigate("/login")} style={{color:"white",borderBottom:"1px solid white",marginTop:"2rem"}}>Login Account</span>
                            </div>
                        </Form>
                </div>
                </Col>
                <Col> 
                <img src={SigninImg} style={{height:"75vh",marginTop:"4rem",marginLeft:"5rem"}}/>
                <Button onClick={()=>navigate('/shoplogin')} style={{marginLeft:"18rem",width:"30%",marginTop:"2rem",height:"3rem",backgroundColor:"#1565c0",fontSize:"1.3rem"}}> Sellers Login</Button>
                </Col>
            </Row>
        </div>
    )
}