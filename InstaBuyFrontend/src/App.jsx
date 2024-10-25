import { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from "react-router-dom"
import {Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './componets/Home';
import Login from './componets/Login';
import Signup from './componets/Signup';
import ProductGallery from './componets/ProductGallery';
// import ProductDetails from './componets/ProductDetails';
import Cart from './componets/Cart';
import Checkout from './componets/Checkout';
import Front from './componets/Front';
import Shoplogin from './componets/Shoplogin';
import Shopsignup from './componets/Shopsignup';
import SellersNavbar from './componets/SellersNavbar';
import ShoppersNavbar from './componets/ShoppersNavbar';
import Productchart from "./componets/Productchart";
import Adding from './componets/Adding';
import Profile from './componets/Profile';
function App() {
  const [user, setUser] = useState("")
  const [cartItem, setCartItem] = useState({})
  const [userType,setUserType] = useState("")
  const navigate = useNavigate()

  const handleAddCart = (item) =>{
    setCartItem({...cartItem, ...item})
  }

  useEffect (() =>{
    const userEmail = localStorage.getItem('UserEmail')
    const storedUserType = localStorage.getItem("userType")
    if(userEmail){
      setUser(userEmail)
      setUserType(storedUserType)
    }
  },[])
  const handleShopperLogout = () => {
    localStorage.removeItem('UserEmail')  // Remove user email from localStorage
    setUser("")  // Clear user state
    setUserType("")
    setCartItem({})  // Optionally, clear cart if needed
    navigate("/login")  // Redirect to login page
  }
  const handleSellerLogout = () => {
    localStorage.removeItem('UserEmail')  // Remove user email from localStorage
    setUser("")  // Clear user state
    setUserType("")
    setCartItem({})  // Optionally, clear cart if needed
    navigate("/shoplogin")  // Redirect to login page
  }
  return (
    <div>
    {/* Conditionally render the Navbar only if the user is logged in */}
    {user && (
      userType === "seller" ?(
        <SellersNavbar  handleSellerLogout ={handleSellerLogout} cartItem={cartItem} user = {user} navigate={navigate}/>
      ):(
        <ShoppersNavbar handleShopperLogout ={handleShopperLogout} cartItem={cartItem} user = {user} navigate={navigate}/>
      )
    )}

    {/* Routes */}
    <Routes>
      <Route path = '/' element = {<Front/> }/>
      <Route path='/shopsignup' element ={<Shopsignup setUser={setUser}/>}/>
      <Route path='/shoplogin' element={<Shoplogin setUser={setUser} setUserType={setUserType} />}/>
      <Route path='/add' element={<Adding/>}/>
      <Route path='/login' element={<Login setUser={setUser} />} />
      <Route path='/signup' element={<Signup setUser={setUser} />} />
      <Route path='/shoppershome' element={<Home user={user} />} />
      <Route path='/productchart' element={<Productchart/>}/>
      <Route path='/products' element={<ProductGallery handleAddCart={handleAddCart} cartItems={cartItem}/>} />
      {/* <Route path='/PDetails/:id' element={<ProductDetails handleAddCart={handleAddCart} cartItems={cartItem} />} /> */}
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/cart' element={<Cart cartItems={cartItem} setCartItems={setCartItem}/>} />
     <Route path='/profile' element={<Profile/>}/>
    </Routes>

    {/* Separate authentication routes */}
   
  </div>
  )
}


export default App
