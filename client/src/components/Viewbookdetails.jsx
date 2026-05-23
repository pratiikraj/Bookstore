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
      {bookdata && (
        <div className='px-4 md:px-12 py-12 bg-zinc-900 min-h-screen text-zinc-100 flex flex-col lg:flex-row gap-8 items-start justify-center max-w-7xl mx-auto'>
          
          {/* Left Cover Image Panel */}
          <div className='w-full lg:w-2/5 flex flex-col items-center justify-center'>
            <div className='bg-zinc-850 border border-zinc-750/50 p-8 rounded-3xl flex flex-col md:flex-row lg:flex-col items-center justify-center gap-6 shadow-2xl w-full'>
              <img 
                src={`${bookdata.imgurl}`} 
                alt={bookdata.title} 
                className='h-[50vh] md:h-[60vh] lg:h-[65vh] object-cover rounded-2xl shadow-lg border border-zinc-700/60'
              />
              
              {/* User Actions */}
              {isloggedin && role === "user" && (
                <div className='flex flex-row lg:flex-row gap-4 justify-center items-center mt-2'>
                  <button 
                    className='bg-rose-500/10 border border-rose-500/30 rounded-2xl text-2xl p-4 text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95' 
                    onClick={handlefav}
                    title="Add to Favourites"
                  >
                    <FaHeart />
                  </button>
                  <button 
                    className='bg-blue-500/10 border border-blue-500/30 rounded-2xl text-2xl p-4 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95' 
                    onClick={handlecart}
                    title="Add to Cart"
                  >
                    <FaCartShopping />
                  </button>
                </div>
              )}

              {/* Admin Actions */}
              {isloggedin && role === "admin" && (
                <div className='flex flex-row lg:flex-row gap-4 justify-center items-center mt-2'>
                  <button 
                    className='bg-rose-500/10 border border-rose-500/30 rounded-2xl text-2xl p-4 text-rose-400 hover:bg-rose-500 hover:text-white transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95' 
                    onClick={deletebook}
                    title="Delete Book Listing"
                  >
                    <MdOutlineDelete />
                  </button>
                  <Link to={`/updatebook/${bookid}`}>
                    <button 
                      className='bg-blue-500/10 border border-blue-500/30 rounded-2xl text-2xl p-4 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center'
                      title="Edit Book Details"
                    >
                      <FiEdit />
                    </button> 
                  </Link>
                </div>
              )}
            </div>  
          </div>

          {/* Right Detailed Info Panel */}
          <div className='w-full lg:w-3/5 space-y-6 lg:p-4'>
            <div>
              <h1 className='text-4xl md:text-5xl font-extrabold text-zinc-50 leading-tight mb-2'>
                {bookdata.title}
              </h1>
              <p className='text-lg text-zinc-400 font-medium'>
                By <span className='text-zinc-200 font-semibold'>{bookdata.author}</span>
              </p>
            </div>

            {/* Description Section */}
            <div className='bg-zinc-850/50 border border-zinc-800/80 rounded-2xl p-6 space-y-2 shadow-inner'>
              <h3 className='text-xs font-bold text-zinc-400 uppercase tracking-wider'>
                Description
              </h3>
              <p className='text-sm text-zinc-300 leading-relaxed'>
                {bookdata.desc || "No description available for this book listing."}
              </p>
            </div>

            {/* Meta Tags */}
            <div className='flex flex-wrap gap-4'>
              <div className='bg-zinc-850/50 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm text-zinc-300 font-semibold shadow-sm'>
                Language: <span className='text-zinc-100 font-bold ml-1 capitalize'>{bookdata.lang}</span>
              </div>
              <div className='bg-zinc-850/50 border border-zinc-800/80 rounded-xl px-4 py-2.5 text-sm text-zinc-300 font-semibold shadow-sm'>
                Price: <span className='text-blue-400 font-extrabold ml-1'>₹ {bookdata.price}</span>
              </div>
            </div>
          </div>

        </div>
      )}
      {!bookdata && (
        <div className='flex items-center justify-center min-h-screen bg-zinc-900'>
          <Loader />
        </div>
      )}
    </>
  )
}

export default Viewbookdetails
