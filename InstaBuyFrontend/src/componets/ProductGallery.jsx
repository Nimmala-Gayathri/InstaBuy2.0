import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ProductGallery({cartItems,handleAddCart}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(""); // Min price state
  const [maxPrice, setMaxPrice] = useState(""); // Max price state
  const [sortCriteria, setSortCriteria] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get("http://localhost:7000/instabuy/sellerget");
      setProducts(response.data.data);
      setFilteredProducts(response.data.data); // Initially display all products
    }
    getProduct();
  }, []);

  // Handle real-time search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle price filtering
  const handlePriceFilter = () => {
    const filtered = products.filter((product) => {
      const productPrice = product.price;
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);

      if (!isNaN(min) && productPrice < min) return false;
      if (!isNaN(max) && productPrice > max) return false;
      return true;
    });

    setFilteredProducts(filtered);
  };


  // Handle sorting by price or other criteria
  const handleSort = (event) => {
    const value = event.target.value;
    setSortCriteria(value);

    const sorted = [...filteredProducts].sort((a, b) => {
      if (value === "priceAsc") return a.price - b.price;
      if (value === "priceDesc") return b.price - a.price;
      if (value === "Discount") return discount
      // Add more sorting logic if needed
      return 0;
    });

    setFilteredProducts(sorted);
  };

  return (
    <div>
      <Row style={{width:"99vw"}}>
        <Col xs={3} style={{position:"fixed",width:"23%",marginTop:"7rem"}}>
          <Form.Group style={{ margin: "1rem" }}>
            <Form.Control
              type="text"
              placeholder="Search for items"
              value={searchTerm}
              onChange={handleSearch}
              style={{backgroundColor:"#e1f3f7",marginTop:"1rem",borderRadius:"20px"}}
            />

          </Form.Group>
          <p style={{borderBottom:"1px solid black",marginLeft:"10px"}}></p>

          <Form.Group style={{ margin: "1rem" }}>
            <Form.Label>Price Filter</Form.Label>
            <div style={{ display: "flex", gap: "10px",flexDirection:"column" }}>
              <div style={{display:"flex",justifyContent:"start",alignItems:"center"}}> 
              <Form.Label >Price less than:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Min Price"
                value={minPrice}
                style={{width:"50%",marginLeft:"1.7rem",backgroundColor:"#e1f3f7",}}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              </div>
             <div  style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
              <Form.Label>Price more than: </Form.Label>
             <Form.Control
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                style={{width:"50%",marginLeft:"1rem",backgroundColor:"#e1f3f7",}}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
             </div>
              <Button style={{width:"60%",margin:"auto"}} onClick={handlePriceFilter}>Apply</Button>
            </div>
          </Form.Group>


          <Form.Group style={{ margin: "1rem" }}>
            <Form.Label>Sort By</Form.Label>
            <Form.Select value={sortCriteria} onChange={handleSort} style={{backgroundColor:"#e1f3f7",}}>
              <option value="">None</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="Discount">Discount</option>
              {/* Add more sorting options */}
            </Form.Select>
          </Form.Group>
          <Button
          onClick={() => navigate('/cart')}
           style={{width:"70%",marginLeft:"3rem",marginTop:"10rem"}}> Go To Cart</Button>
        </Col>

        <Col style={{marginLeft:"20rem",marginTop:"7rem",overflow:"none"}}>
          <h2 style={{ margin: "1.5rem", marginLeft: "3rem" }}>
            <i>SELECT A PRODUCT ADD TO CART</i>
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center",marginLeft:"2rem" }}>
            {filteredProducts.map((product, index) => (
              <Card key={index} style={{ width: "15rem", border: "none", padding: "1rem" }}>
                <Card.Img src={product.image_url} />
                <Card.Title style={{ marginTop: "0.5rem", fontSize: "1.3rem", fontWeight: "600" }}>
                  {product.title}
                </Card.Title>
               <div style={{display:"flex",justifyContent:"space-between"}}>
               <Card.Text style={{ textAlign: "center", color: "#216ad9", fontWeight: "600",fontSize:"1.2rem" }}>
                &#8377; {product.price}
                </Card.Text>
                <Card.Text style={{color:"green"}}>
                 ( {product.discount} OFF)
                </Card.Text>
               </div>
                <Button
                // onClick={() => }
                onClick={() =>{
                  // navigate({state:{product:product}})
                    if(product._id in cartItems ){
                      alert("One Product Added")
                        const currentItem = cartItems[product._id];
                        handleAddCart({[product._id] : {
                          title: product.title,
                          price:product.price,
                          image:product.image_url,
                          quantity: currentItem.quantity +1
                        }})
                    }else{
                        handleAddCart({[product._id]: {
                          title :product.title,
                          price:product.price,
                          image:product.image_url,
                          quantity: 1}})
                    }
                  }}
                  
                  style={{ width: "50%",  backgroundColor: "#216ad9" }}
                >
                 Add Item
                </Button>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
//onClick={() => navigate(`/PDetails/${product.id}`, { state: product })