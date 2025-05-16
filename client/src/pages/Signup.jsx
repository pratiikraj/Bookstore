import React, { useState } from 'react'
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [viewpass,setviewpass]=useState(false)
const [userinfo,setuserinfo]=useState({
  name:"",
  email:"",
  pass:"",
address:""
})
const navigate=useNavigate()

const change=(e)=>{
  const {name,value}=e.target;
  setuserinfo({...userinfo,[name]:value});
}

const submit= async()=>{

  try{
    if(userinfo.name==="" || userinfo.email==="" || userinfo.pass==="" || userinfo.address==="" ){
      alert("all fields are necessary");
      return;
    }
    const   response=await axios.post("http://localhost:2000/bks/user/signup",userinfo)
    
       if (response.data.success) {
        console.log(response.data);
        navigate("/login"); 
      } else {
        alert("Signup failed. Please try again.");
        console.log(response.data); 
      }
   
    
  }catch(err){
alert("error came in catch sign")
console.log(err)
  }
}


  return (
    <div className='h-auto w-full px-12 py-8 flex items-center justify-center bg-slate-600 '>
   <div className='bg-zinc-800 w-full md:w-3/6 lg:w-2/6 rounded-lg px-8'>
 <h2 className='text-3xl text-gray-400 text-center p-2'> SIGNUP</h2>
 <div>
  <div className='mb-2'>
    <label htmlFor='' className='text-gray-400 mt-1'>Username</label>
   <input type='text' 
   placeholder='enter your username'
   name='name'
   className='w-full mt-1 bg-gray-600 text-xl p-2 outline-none rounded-md   '
   required
   value={userinfo.name}
   onChange={change}
   />
  </div>
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
  <div className='relative mb-2'>
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
  <div>
    <label htmlFor='' className='text-gray-400 mt-1 mb-5'>Address</label>
   <textarea 
   placeholder='enter your address'
   rows={4}
   cols={2}
   name='address'
   className='w-full mt-1 mb-2 bg-gray-600 text-xl p-2 outline-none rounded-md   '
   required
   value={userinfo.address}
   onChange={change}/>
  </div>
  <div>
    <button onClick={submit} className='border border-blue-400 p-2 border-none bg-blue-500 rounded-md w-full hover:text-white hover:bg-blue-600 '>Signup</button>
  </div>
  <p className='text-gray-400 text-center'>or</p>
  <div className='flex gap-2 mb-3'> 
  <h2 className='text-gray-200 mx-1'>Already have a account!</h2><button className='hover:underline text-blue-500'>Login</button>
  </div>
  
 </div>
   </div>
    </div>
  )
}

export default Signup
