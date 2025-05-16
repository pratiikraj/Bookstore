
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Allbooks from './pages/Allbooks'
import Home from './pages/Home'

import {BrowserRouter,Routes,Route, useNavigate} from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Viewbookdetails from './components/Viewbookdetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import { useEffect } from 'react'
import Fav from './profile/Fav'
import Orderhistory from './profile/Orderhistory'
import Settings from './profile/Settings'
import Addbook from './profile/Addbook'
import Updatebook from './pages/Updatebooks'
import Allorders from './pages/Allorders'
// import jwtDecode from "jwt-decode";
// import jwtDecode from '/node_modules/jwt-decode/build/jwt-decode.esm.js';
// import * as jwtDecode from 'jwt-decode';\
import { jwtDecode } from "jwt-decode"; 
import Contactus from './pages/Contactus'

function App() {
 
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const role=useSelector((state)=>state.auth.role)

useEffect(()=>{
if(localStorage.getItem("id") && 
localStorage.getItem("token") && 
localStorage.getItem("role") 
){
  dispatch(authActions.login());
  dispatch(authActions.changeRole(localStorage.getItem("role")))
}
checkTokenExpiry();
},[])
// const token = localStorage.getItem("token");
// const decodedToken = jwtDecode(token);
// const currentTime = Date.now() / 1000; // Current time in seconds
// console.log('Decoded Token:', decodedToken);
// console.log('Current Time:', currentTime);
const checkTokenExpiry = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      // console.log('Decoded Token:', decodedToken);
      // console.log('Current Time:', currentTime);
      if (decodedToken.exp < currentTime) {
        // Token expired
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role")
        // localStorage.removeItem("token");
        alert("Session expired. Please log in again.");
        // window.location.href = "/login"; // Redirect to login
        navigate("/login")
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.clear("id");
      localStorage.clear("token");
      localStorage.clear("role")
      navigate("/login")
      // localStorage.removeItem("token");
      // window.location.href = "/login"; // Redirect to login
    }
  }
};

// Call this function in your main app file (e.g., App.js)
//checkTokenExpiry();




  return (
    <>
    
    <Navbar/>
 <Routes>
  <Route  path='/' exact element={ <Home/>}/>
  <Route  path='/allbooks'  element={ <Allbooks/>}/>
  <Route  path='/contactus'  element={ <Contactus/>}/>
  <Route  path='/cart'  element={ <Cart/>}/>
  <Route  path='/profile'  element={ <Profile/>}>
{role==="user"?  <Route index element={<Fav/>}/>: <Route index element={<Allbooks/>}/>}
{role==="admin"&&  <Route path='/profile/addbook' element={<Addbook/>}/>}
{role==="admin"&&  <Route path='/profile/allorders' element={<Allorders/>}/>}

  <Route path='/profile/orderhistory' element={<Orderhistory/>}/>
  <Route path='/profile/setting' element={<Settings/>}/>
  </Route>
  <Route  path='/login'  element={ <Login/>}/>
  <Route  path='/updatebook/:bookid'  element={ <Updatebook/>}/>
  <Route  path='/signup'  element={ <Signup/>}/>
  <Route path='/viewbook/:bookid' element={<Viewbookdetails/>}/>

 </Routes>
  <Footer/>



    </>
  )
}

export default App
