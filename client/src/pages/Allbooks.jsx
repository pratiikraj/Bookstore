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
    <div className='h-auto py-8 px-12 bg-slate-600'>
  <h4 className='font-bold text-4xl mx-3 my-3 text-gray-300 '> All Books</h4> 
    {!bookdata &&
    <div className='flex items-center justify-center my-8'> <Loader/></div>}

    <div className='flex mt-4 md:flex-wrap md:flex-row md:justify-around   flex-col lg:flex-row lg:justify-around items-center'>
     
        {
          bookdata && bookdata.map((item,i)=>{
return <div key={i}>
<Bookcard books={item}/>
</div>
          })
        }
     
    </div>
  </div>
  )
}

export default Allbooks

