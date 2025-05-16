import React, { useState } from 'react'
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const Login = () => {
  const [viewpass,setviewpass]=useState(false)
const [userinfo,setuserinfo]=useState({

  email:"",
  pass:"",

})
const navigate=useNavigate()
const dispatch=useDispatch()

const change=(e)=>{
  const {name,value}=e.target;
  setuserinfo({...userinfo,[name]:value});
}

const submit= async()=>{

  try{
    if(userinfo.email==="" || userinfo.pass===""){
      alert("all fields are necessary");
      return;
    }
    const   response=await axios.post("http://localhost:2000/bks/user/login",userinfo)
    

dispatch(authActions.login())
dispatch(authActions.changeRole(response.data.prevuser.role))
console.log(response.data)
       if (response.data.success) {
// console.log("hi..")
// console.log("id",response.data.prevuser._id);
// console.log("token",response.data.token)
// console.log("role",response.data.prevuser.role)
        localStorage.setItem("id",response.data.prevuser._id)
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("role",response.data.prevuser.role)
        navigate("/profile"); 
      } else {
        alert("Signup failed. Please try again.",response.data.msg);
        console.log(response.data.msg); 
      }
   
    
  }catch(err){
alert("error came in catch login")
console.log(err)
  }
}
  return (
    <div className='h-screen w-full px-12 py-8 flex items-center justify-center bg-slate-600 '>
   <div className='bg-zinc-800 w-full md:w-3/6 lg:w-2/6 rounded-lg px-8'>
 <h2 className='text-3xl text-gray-400 text-center p-2'> Login</h2>
 <div>
 
  <div className='mb-2'>
    <label htmlFor='' className='text-gray-400 mt-1'>Email</label>
   <input type='text' 
   placeholder='enter your email'
   name='email'
   className='w-full mt-1 bg-gray-600 text-xl p-2 outline-none rounded-md   '
   required
   value={userinfo.email}
   onChange={change}/>
  </div>
  <div className='relative mb-5'>
    <label htmlFor='' className='text-gray-400 mt-1'>Password</label>
   <input type={viewpass? 'text':'password'} 
   placeholder='enter your password'
   name='pass'
   className=' w-full mt-1 bg-gray-600 text-xl p-2 outline-none rounded-md   '
   required 
   value={userinfo.pass}
   onChange={change}/>
   <button className='text-blue-300 absolute top-10 right-2   z-30  text-2xl font-semibold' onClick={()=>{setviewpass(!viewpass)}}> {viewpass?<GoEyeClosed />:  <RxEyeOpen /> }  </button>
  </div>
 
    <button onClick={submit} className='border border-blue-400 p-2 border-none bg-blue-500 rounded-md w-full hover:text-white hover:bg-blue-600 '>Login</button>
  </div>
  <p className='text-gray-400 text-center'>or</p>
  <div className='flex gap-2 mb-3'> 
  <h2 className='text-gray-200 mx-1'>Don't have an account</h2><button className='hover:underline text-blue-500'>Sign up</button>
  </div>
  
 </div>
   </div>
    
  )
}

export default Login

