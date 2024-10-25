import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Profile() {
    const [purchasedItems, setPurchasedItems] = useState([]);

    useEffect(() => {
        const storedPurchases = JSON.parse(localStorage.getItem('purchasedItems')) || [];
        setPurchasedItems(storedPurchases);
    }, []);
    const handleDelete = (indexToDelete) => {
        // Filter out the item to be deleted
        const updatedItems = purchasedItems.filter((_, index) => index !== indexToDelete);
        // Update the state and local storage
        setPurchasedItems(updatedItems);
        localStorage.setItem('purchasedItems', JSON.stringify(updatedItems));
    };
    return (
        <div style={{marginTop:"7rem",position:"absolute",marginLeft:"2rem"}}>
             <div ><h2 >Your Purchases</h2>
            {purchasedItems.length > 0 ? (
                purchasedItems.map((purchase, index) => (
                    <div key={index} style={{ border: '1px solid black', padding: '1rem', margin: '1rem 0',margin:"1rem", backgroundColor:"#e1f3f7"}}>
                       <div style={{display:"flex"}}>
                       {Object.keys(purchase.items).map(itemId => (
                            <div key={itemId} >
                                <img 
                                    src={purchase.items[itemId].image} 
                                    alt="Purchased product" 
                                    style={{ width: '150px',margin:"1rem" }} 
                                />
                               <div style={{margin:"1rem"}}>
                               <p>Item: {purchase.items[itemId].title}</p>
                                <p>Quantity: {purchase.items[itemId].quantity}</p>
                                <p>Price: {purchase.items[itemId].price}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                        <div style={{margin:"1rem"}}>
                        <p>Total Price: ${purchase.totalPrice}</p>
                        <p>Date of Purchase: {purchase.date}</p>
                        <Button onClick={() => handleDelete(index)}>Clear</Button>
                            </div>
                    </div>
                ))
            ) : (
                <p>No purchases found</p>
            )}
           </div>
        </div>
    );
}
