import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button} from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Adding(){
    const location = useLocation()
    const existingProduct = location.state ? location.state.product : null;
    const [formData,setFormData] = useState({
        title:"",
        description:"",
        price:"",
        discount:"",
        category:"",
        image_url:"",
    });
    useEffect(() =>{
        if(existingProduct){
            setFormData(existingProduct)
        }
    },[existingProduct])
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]: e.target.value})
        // setFormData("")
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            if(existingProduct){
                const response = await axios.put(`http://localhost:7000/instabuy/edit-prod/${existingProduct._id}`,formData)
                if (response.data.success) {
                    alert("Product updated");
                } else {
                    alert(response.data.message);
                }
            }else{
                const respose = await axios.post("http://localhost:7000/instabuy/sellerpost",formData)
                if(respose.data.success){
                    alert("Product added")
                }else{
                    alert(respose.data.messege)
                }
            }
           
        } catch (error) {
           console.error("There was an error adding the product:", error);
           alert("Failed to add the product. Please try again.");
        }
     
    }
    const input = {
        width:"80%",
        height:"3.5rem",
        margin:"auto",
        fontSize:"1.5rem",
    }
    return(
        <div>
            <Row style={{width:"99vw",height:"100vh"}}>
                <Col style={{backgroundColor:"#c3ebe3",paddingTop:"5rem",}}>
                   <Form onSubmit={handleSubmit}>
                       <Form.Group className="mb-5" >
                          <Form.Control 
                          style={input}
                          type="text"
                          placeholder="Product Title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                            />
                       </Form.Group>
                       
                       <Form.Group className="mb-5" controlId="formBasicEmail">
                          <Form.Control
                           type="text"
                            placeholder="Product Description" 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            style={{
                                width:"80%",
                                height:"5rem",
                                margin:"auto",
                                fontSize:"1.5rem",
                                }}
                            />
                       </Form.Group>
                       <div style={{display:"flex",marginLeft:"4rem",justifyContent:"space-between",marginRight:"5rem",width:"83%"}}>
                            <Form.Group className="mb-5" controlId="formBasicEmail">
                                <Form.Control 
                                 style={{ 
                                    width:"95%",
                                    height:"3.5rem",
                                    margin:"auto",
                                    fontSize:"1.5rem",
                                    marginLeftLeft:"rem"
                                   }}
                                type="text" 
                                placeholder="Product Price" 
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-5" controlId="formBasicEmail">
                                <Form.Control 
                                 style={{
                                    width:"95%",
                                    height:"3.5rem",
                                    margin:"auto",
                                    fontSize:"1.5rem",
                                  
                                    }}
                                type="text" 
                                placeholder="Product Discount" 
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                />
                            </Form.Group>
                       </div>
                       
                       <Form.Group className="mb-5" controlId="formBasicEmail">
                          <Form.Control 
                           style={input}
                          type="text" 
                          placeholder="Product Category" 
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          />
                       </Form.Group>

                        <Form.Group className="mb-5" controlId="formBasicPassword">
                            <Form.Control 
                             style={input}
                            type="text" 
                            placeholder="Product Image URL" 
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            />
                        </Form.Group>
                             {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                             </Form.Group> */}
                        <Button variant="primary" type="submit"
                        style={{ margin:"2rem",width:"30%",height:"3rem",marginLeft:"5rem" }}
                        >
                        Add Product
                        </Button>
                    </Form>
                </Col>
                <Col style={{padding:"1rem",textAlign:"center",}}>
                <h2 style={{margin:"2rem"}}>LIVE PREVIEW</h2>
                <div style={{textAlign:"center",backgroundColor:"#c3ebe3",padding:"1rem",borderRadius:"20px",width:"80%",margin:"auto"}}>
                    <p style={{fontSize:"1.2rem",width:"85%",margin:"auto"}}><i style={{fontWeight:"500"}}>Description:</i>{formData.description}</p>
                    <img src= {formData.image_url} alt=""  style={{width:"20rem",borderRadius:"16px",marginTop:"1rem",marginBottom:"1rem"}}/>
                    <h3>{formData.title}</h3>
                    <p style={{fontSize:"1.2rem"}}> &#8377; {formData.price} - <span>{formData.discount} </span></p>
                    <Form onSubmit={handleSubmit}>
                    <Button variant="primary" type="submit" >
                        Add Product
                    </Button>
                    </Form>
                </div>

                </Col>
            </Row>
        </div>
    )
}