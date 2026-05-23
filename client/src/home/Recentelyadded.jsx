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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mt-6">
        {bookdata && bookdata.map((item, i) => (
          <div key={i} className="w-full h-full flex justify-center">
            <Bookcard books={item}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recentelyadded
