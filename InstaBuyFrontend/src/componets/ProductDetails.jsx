// import React, { useEffect, useState } from "react";
// import { Row, Col, Button, Card } from "react-bootstrap"
// import { useLocation, useNavigate } from "react-router-dom"
// import axios from "axios"

// export default function ProductDetails ({cartItems,handleAddCart}){
//     const location = useLocation();
//     const navigate = useNavigate()
//     const {title,price, image_url, description,category,_id} = location.state
//     // console.log(description)

//     const [otherProducts,setOtherProducts] = useState([])
//     useEffect(() =>{
//         async function getData(){
//             const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${category._id || 1}/products?limit=15&offset=0`)
//             // console.log(response.data)
//             setOtherProducts(response.data)
//         }
//         getData()
//     },[])
//     return(
//         <div style={{width:"98vw"}}>
//             <Row>
//                 {/* <Col lg={2}> */}
//                 {/* {image_rl.map((image,index) =>{
//                     return(
//                         <div key={index}>
//                             <img  src={image} style={{width:"8rem",borderRadius:"8px",margin:"2rem"}}/>
//                         </div>
//                     )
//                 })} */}
//                 {/* </Col> */}
//                 <Col lg={5} 
//                 style={{marginLeft:"3rem"}}>
//                 <div >
//                 <img src={image_url} style={{width:"25rem",borderRadius:"16px",margin:"2rem",marginLeft:"1rem"}}/>
//                 <h3 >{title}</h3>
//                 <h4 style={{color:"#216ad9"}}>${price}</h4>
//                 <p style={{width:"95%"}}>{description}</p>
//                 <Button onClick={() =>{
//                     if(_id in cartItems){
//                         const currentItem = cartItems[_id];
//                         handleAddCart({[_id] : {title,price,quantity: currentItem.quantity +1}})
//                     }else{
//                         handleAddCart({[_id]: {title,price,quantity: 1}})
//                     }
//                     // navigate("/cart")
//                 }}> Add to Cart</Button>
//                 </div>
//                 </Col>
//                 <Col lg={6}>
//                 <div >
//                    <h2>Products under this category</h2> 
//                    <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
//                 {otherProducts.map((product,index) => {
//                     if(product._id == _id ) return
//                     return(
//                         <Card key={index} style={{width:"12rem",border:"none",padding:"1rem"}}>
//                             <Card.Img src = { product.images}/>
//                             <Card.Title style={{marginTop:"0.5rem",fontSize:"1rem",fontWeight:"700"}} >{product.title}</Card.Title>
//                             <Card.Text style={{textAlign:"center",color:"#216ad9",fontWeight:"600"}}>${product.price}</Card.Text>
//                             <Button 
//                             onClick={() => navigate(`/PDetails/${product._id}`,{state:product})}
//                             style= {{width:"7rem",marginLeft:"0.6rem",backgroundColor:"#216ad9"}}>View Item</Button>
//                         </Card>
//                     )
//                 })}
//             </div>
//                 </div>
//                 </Col>
//             </Row>
//         </div>
//     )
// }