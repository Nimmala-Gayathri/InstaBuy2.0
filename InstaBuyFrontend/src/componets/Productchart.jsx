
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import {Row,Col, Button} from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
const Productchart = () => {
    const [product,setProduct] = useState([])
    const [error,setError]  = useState("")
       const navigate = useNavigate()
      const chartRef = useRef(null); // Reference to the canvas element
      let chartInstance = useRef(null); // To store the chart instance
      useEffect(()=>{
       const getProduct = async() =>{
       
        try {
            const res = await axios.get("http://localhost:7000/instabuy/sellerget")
            // console.log(res.data.data)
            setProduct(res.data.data)
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to fetch products. Please try again later.");
        }
       
       }
       getProduct()
      },[])
        const handleDelete = async(id) =>{
            try {
                const res = await axios.delete(`http://localhost:7000/instabuy/deleteprod/${id}`)
                console.log(res)
                setProduct(product.filter(prod => prod._id !== id));
            } catch (error) {
                console.log("error deleting product ",error)
            }
          }
      // const handeleEdit = async(id) =>{
      //   navigate(`/add/${id}`)
      // }
      useEffect(() => {
        // Data for the column chart
        const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              label: 'Sales',
              data: [120, 190, 300, 250, 220, 280], // Sales data
              backgroundColor: 'rgba(240, 230, 46, 0.8)',
              borderColor: 'rgba(240, 188, 46, 1)',
              borderWidth: 1,
            },
          ],
        };
        // Chart options
        const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Monthly Sales Data',
              fontSize:"1rem"
            },
          },
          scales: {
            y: {
              beginAtZero: true, // Ensures that the Y-axis starts from 0
            },
          },
        };
    
        // Create chart instance
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Destroy previous chart if exists
        }
    
        chartInstance.current = new Chart(chartRef.current, {
          type: 'bar', // Bar chart (default vertical)
          data: data,
          options: options,
        });
      }, []);
    
      return (
        <div>
            <Row style={{width:"100%"}}>
                <Col xs={4} style={{padding:"1rem"}}>
                <div style={{height:"30rem",width:"auto"}}>
                <canvas  ref={chartRef} />
                </div>
                </Col >
                <Col xs={8}>
                <div style={{display:"flex",justifyContent:"space-between",padding:"1rem"}}>   
                <h4 style={{fontSize:"2rem"}}>YOUR PRODUCTS</h4>
                <Button onClick={() => navigate('/add')} style={{fontSize:"1.5rem"}}>Add Your Product</Button>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",margin:"1rem",alignItems:"center",marginLeft:"2rem"}}>
                    {product.map((prod,index)=>{
                        return(
                            <div key={index} style={{padding:"1rem",margin:"1rem",backgroundColor:"#c3ebe3",borderRadius:"16px",width:"12rem"}}>
                                <img src={prod.image_url} style={{width:"10rem",borderRadius:"16px"}}/>
                                <h5 >{prod.title}</h5>
                                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                                    <p style={{color:"blue",fontWeight:"600",fontSize:"1.2rem"}}>  &#8377;{prod.price}</p> 
                                    <p style={{marginRight:"1rem"}}> ({prod.discount}OFF)</p>
                                </div>
                                <div style={{display:"flex",justifyContent:"space-between"}}>
                                    <Button 
                                    onClick={() => navigate("/add" ,{state:{product:prod}})}
                                    style={{width:"45%",backgroundColor:"blue"}}>
                                        Edit 
                                    </Button>
                                    <Button  
                                    onClick={()=>handleDelete(prod._id)}
                                    style={{width:"45%",backgroundColor:"red",border:"red"}}>
                                        Delete
                                    </Button>
                                    {error}
                                </div>
                                
                            </div>
                        )

                    })}
                </div>
                </Col>
            </Row>
          {/* <canvas ref={chartRef} /> Canvas element for the chart */}
        </div>
      );
   
};

export default Productchart;
