
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const Settings = () => {
  const [value,setvalue]=useState({address:""})
  const [profiledata,setprofiledata]=useState()
    const navigate=useNavigate()
const headers={
   id:localStorage.getItem("id"),
   authorization:`Bearer ${localStorage.getItem("token")}`,
}

useEffect(()=>{
  const fetch=async()=>{
      let res=await axios.get("http://localhost:2000/bks/user/view",{headers})
   //console.log(res.data);
      if(res.data.success){
      setprofiledata(res.data.user)
    setvalue({address:res.data.user.address})
  }
}
  fetch()
},[])
const change=(e)=>{
const {name,value}=e.target;
setvalue({...value,[name]:value})
}
const edituserinfo=async()=>{
const res=await axios.put("",value,{headers})
console.log(res.data);
}
  return (
    <div>
        {
      !profiledata && <div className='w-full flex justify-center items-center'><Loader/></div>
    }{
      profiledata && (
        <div className=' h-[100%] p-0 md:p-4 text-zinc-100'>

          <h1 className='text-3xl md-text-5cl font-semibold text-zinc-500 mb-8'>Setting</h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor="">username</label>
              <p className='p-2 rounded bg-zinc-900 mt-2 font-semibold'>{profiledata.name}</p>
            </div>
            <div className=''>
              <label htmlFor="">email</label>
              <p className='p-2 rounded bg-zinc-900 mt-2 font-semibold'>{profiledata.email}</p>
            </div>
           
          </div> <div className='mt-4 flex flex-col'>
              <label htmlFor="">Address</label>
<textarea className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
rows={5}
placeholder='address'
name='address'
value={value.address}
onChange={change}/>
            </div>
            <div className='mt-4 flex justify-end'>
              <button onClick={edituserinfo} className='bg-yellow-200 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-300'>Update</button>
            </div>
          </div>
      )
    }
    </div>
  )
}

export default Settings

