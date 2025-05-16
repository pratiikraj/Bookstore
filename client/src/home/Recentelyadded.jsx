import React, { useEffect, useState } from 'react'
import axios from "axios"
import Bookcard from '../components/Bookcard';
import Loader from '../components/Loader';


const Recentelyadded = () => {
  const [bookdata,setbookdata]=useState([]);

  useEffect(()=>{
const fetch=async()=>{
  const res=await axios.get("http://localhost:2000/bks/user/getrecentbooks")
  console.log(res.data)
  setbookdata(res.data.data)
}


fetch();

  },[])
  return (
    <div className='mt-2 px-4 '>
    <h4 className='text-4xl font-semibold text-gray-300'>Recently Added</h4>  
      {!bookdata &&
      <div className='flex items-center justify-center my-8'> <Loader/></div>}
      <div className='flex mt-4 md:flex-wrap md:flex-row md:justify-around  flex-col lg:flex-row lg:justify-around items-center'>
       
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

export default Recentelyadded
