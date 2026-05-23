import React, { useEffect, useState } from 'react'
import axios from "axios"
import Bookcard from '../components/Bookcard';
import Loader from '../components/Loader';

const Allbooks = () => {
  const [bookdata,setbookdata]=useState();

  useEffect(()=>{
const fetch=async()=>{
  const res=await axios.get("http://localhost:2000/bks/user/getallbooks")
  console.log(res.data.msg)
  setbookdata(res.data.data)
}


fetch();

  },[])
  return (
    <div className='bg-zinc-900 min-h-screen py-12 px-6 md:px-16 text-zinc-100'>
      <div className='max-w-7xl mx-auto'>
        <h4 className='font-extrabold text-4xl tracking-tight text-zinc-50 mb-8 px-2'>
          All Books
        </h4> 
        {!bookdata && (
          <div className='flex items-center justify-center my-16'>
            <Loader/>
          </div>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center'>
          {bookdata && bookdata.map((item, i) => (
            <div key={i} className='w-full h-full flex justify-center'>
              <Bookcard books={item}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Allbooks

