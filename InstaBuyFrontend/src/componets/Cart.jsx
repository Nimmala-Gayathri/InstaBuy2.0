import React, { useEffect, useState } from "react";
import {Button, Col, Row, Table} from "react-bootstrap"
import cartImg from "../assets/cart.png"
import { useNavigate } from "react-router-dom";

export default function Cart({cartItems,setCartItems}) {
    // console.log(cartItems)
    const navigate = useNavigate()
    const [totalPrice,setTotalPrice] = useState(0)
    const [totalQuantity,setTotalQuantity] = useState(0)
    const [purchasedItems, setPurchasedItems] = useState([]);

    useEffect(() =>{
        let tempPrice = 0;
        let tempQuantity = 0 ;
        Object.keys(cartItems).map((cartItemId) => {
            const details = cartItems[cartItemId];
            tempQuantity+= details.quantity;
            tempPrice += details.quantity * details.price
        })
        setTotalPrice(tempPrice);
        setTotalQuantity(tempQuantity)
    },[cartItems])
    const handleCheckout = () => {
        const purchaseDetails = {
            items: cartItems,
            totalPrice: totalPrice,
            date: new Date().toLocaleDateString(),
        };
        let allPurchases = JSON.parse(localStorage.getItem('purchasedItems')) || [];
        allPurchases.push(purchaseDetails);
    
        localStorage.setItem('purchasedItems', JSON.stringify(allPurchases));
    
        // Clear the cart
        setCartItems({});
    };
    console.log(cartItems)
    useEffect(() => {
        const storedPurchases = JSON.parse(localStorage.getItem('purchasedItems')) || [];
        setPurchasedItems(storedPurchases);
    }, []);
console.log(purchasedItems)  
    return(

        <div>
            <Row style={{width:"99vw"}}>
                <Col style={{margin:"2.5rem",marginTop:"7rem" }}>
                    <h3>YOUR CART:</h3>
                    <Table >
                      <thead>
                        <tr>
                           <th>Name</th>
                           <th>Quantity</th>
                           <th>Price</th>
                         </tr>
                      </thead>
                      <tbody>
                        {Object.keys(cartItems).map((cartItemId,index) =>{
                            const itemsDetails = cartItems[cartItemId];
                            return(
                                <tr key={index}>
                                    <td>{itemsDetails.title}</td>
                                    <td>{itemsDetails.quantity}</td>
                                    <td>{itemsDetails.quantity*itemsDetails.price}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td>total</td>
                            <td>{totalQuantity}</td>
                            <td>{totalPrice}</td>
                        </tr>
                      </tbody>
                 </Table>
                 <Button 
                 onClick={handleCheckout}
                 style={{marginTop:"2rem"}}>Check Out</Button>
                </Col>
                <Col style={{marginTop:"5rem"}}>
                <img src={cartImg} style={{width:"40rem" }}/>
                </Col>
            </Row>
           
        </div>
    )
}