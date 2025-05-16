import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from './Loader'
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const Viewbookdetails = () => {

  const navigate=useNavigate()
  const [bookdata,setbookdata]=useState()
const {bookid}=useParams()
const isloggedin=useSelector((state) =>state.auth.isLoggedin)
const role=useSelector((state)=>state.auth.role)
//console.log(isloggedin)
//console.log(role)
//console.log(bookid)
  useEffect(()=>{
const fetch=async()=>{
  const res=await axios.get(`http://localhost:2000/bks/user/getbookbyid/${bookid}`)
//  console.log(res.data.data)
  setbookdata(res.data.data)
}
fetch();
  },[])

  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:bookid,
}
const deletebook=async()=>{
  const res=await axios.delete("http://localhost:2000/bks/admin/deletebook",
    {
      headers
    }
   );
   alert(res.data.msg)
   if(res.data.success)
   navigate("/allbooks");
}
  const handlefav=async()=>{
     const res=await axios.put("http://localhost:2000/bks/user/addbookfav",
      {},{
        headers
      }
     );
     alert(res.data.msg)
  }
  const handlecart=async()=>{
    const res=await axios.put("http://localhost:2000/bks/user/addbookcart",
     {},{
       headers
     }
    );
    alert(res.data.msg)
 }
  
  return (
    <>
    {bookdata && <div className=' px-4 md:px-12 lg:h-screen h-auto  bg-slate-600 flex lg:flex-row flex-col  lg:px-12 lg:gap-8 gap-3'>

  <div className=' w-full lg:w-3/6 '>
  <div className=' flex flex-col mf:flex-row lg:flex-row bg-slate-800 m-6 rounded-lg p-12 justify-around '><img src={`${bookdata.imgurl}`} alt='/' className=' lg:h-[70vh] h-[50vh] '/>
  {isloggedin && role==="user" && <div className='flex flex-row lg:flex-col  gap-3  lg:justify-start justify-center mt-6'>
  <button className='bg-white rounded-full text-3xl p-2 text-rose-500' onClick={handlefav}><FaHeart /></button>
  <button className='bg-white rounded-full text-3xl p-2 lg:mt-4 text-blue-500' onClick={handlecart}><FaCartShopping /></button>
  </div> }

  {isloggedin && role==="admin" && <div className='flex flex-row lg:flex-col  gap-3  lg:justify-start justify-center mt-6'>
    <button className='bg-white rounded-full text-3xl p-2 text-rose-500' onClick={deletebook}> <MdOutlineDelete />
    </button>
  <Link to={`/updatebook/${bookid}`}> <button className='bg-white rounded-full text-3xl p-2 lg:mt-4 text-blue-500'><FiEdit /></button> 
  </Link>
 
  </div> }
  </div>  


    </div>
    <div className='lg:w-3/6 w-full lg:p-4 lg:mt-6 flex flex-col gap-2 px-7 m-3 mt-0  '>
<h1 className='mt-3 my-2 mx-1 text-5xl font-bold text-gray-300'>{bookdata.title}</h1>
<p className='mx-1 max-h-max  text-gray-300 font-semibold text-[18px] '>Author: <span className='text-lg text-gray-200 text-[24px]'>{bookdata.author}</span></p>

<h2 className='mx-1 my-1 text-purple-100 text-xl'> Description: <span>{bookdata.desc}</span></h2>

<h2 className='mx-1 font-semibold text-gray-300 text-xl'> Languages: <span>{bookdata.lang}</span></h2>
<h2 className='mx-1 font-semibold text-xl text-gray-300'> Price: ₹ <span>{bookdata.price}</span></h2>
    </div>
    </div> }
    {!bookdata && <div className='flex items-center justify-center h-screen bg-slate-600'> <Loader/></div> }
    </>
    
  )
}

export default Viewbookdetails
