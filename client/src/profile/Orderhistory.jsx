import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const Orderhistory = () => {

  const [orderhistory,setorderhistory]=useState([])
   const navigate=useNavigate()
const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
 }
 
 useEffect(()=>{
   const fetch=async()=>{
       let res=await axios.get("http://localhost:2000/bks/user/getorderhistory",{headers})
       //console.log(res.data);
       if(res.data.success){
       setorderhistory(res.data.data)
      console.log(res.data.data);
   }
 }
   fetch()
 },[])
  return (
   
    <div>
   {/* <h1>User order history</h1> */}
   <div>
    {
      !orderhistory && <div className='w-full flex justify-center items-center'><Loader/></div>
    }
    {
      orderhistory && orderhistory.length===0 && (<div><h2>no order placed</h2></div>)
    }
    {
      orderhistory && orderhistory.length>0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-white mb-8'>
            Your order history
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-3 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>
                Sr.
              </h1>
            </div>
            <div className='w-[22%]'>
              <h1 className='text-center'>
                Books
              </h1>
            </div>
            <div className='w-[45%]'>
              <h1 className='text-center'>
             Description
              </h1>
            </div>
            <div className='w-[9%]'>
              <h1 className='text-center'>
              Price
              </h1>
            </div>
            <div className='w-[16%]'>
              <h1 className='text-center'>
              status
              </h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className='text-center'>
               Mode
              </h1>
            </div>
          </div>
{
  orderhistory.map((item,i)=>{
    return <div className=' hover:cursor-pointer bg-zinc-800 w-full rounded py-1 px-4 flex gap-2'>
    <div className='w-[3%]'>
      <h1 className='text-center'>
     {i+1}
      </h1>
    </div>
    <div className='w-[22%]'>
      <Link to={`/view/${item.book._id}`}> <h1 className='text-center'>
     {item.book.title}
      </h1></Link>
     
    </div>
    <div className='w-[45%]'>
      <h1 className='text-center'>
    {item.book.desc.slice(0,50)}...
      </h1>
    </div>
    <div className='w-[9%]'>
      <h1 className='text-center'>
   {item.book.price}
      </h1>
    </div>
    <div className='w-[16%]'>
      <h1 className='font-semibold text-green-500'>
      {item.status==="order placed" ? (
        <div className='text-yellow-500 '>{item.status}</div>
      ):item.status==="cancelled" ? (
        <div className='text-red-500 '>{item.status}</div>
      ):(item.status)}
      </h1>
    </div>
    <div className='w-none md:w-[5%] hidden md:block'>
      <h1 className='text-sm text-zinc-400 '>
       COD
      </h1>
    </div>
  </div>
  })
}
          </div>
          
      )

    }
   </div>
    </div>
  )
}

export default Orderhistory
