import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import Bookcard from '../components/Bookcard'

const Fav = () => {
    const [favbooks,setfavbooks]=useState([])
 const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
}
    useEffect(()=>{
        const fetch=async()=>{
            let res=await axios.get("http://localhost:2000/bks/user/getfavbook",{headers})
           // console.log(res.data.data);
            if(res.data.success){
            setfavbooks(res.data.data)
            // console.log(res.data);
        }
    }
        fetch()
    },[favbooks])
  return (
    <div className='h-auto flex justify-evenly gap-2 flex-wrap'>
   {
    !favbooks && <div className='h-screen w-full justify-center items-center'><Loader/> </div>
   }
   {favbooks.length===0 && (<h1>No favs till Now</h1>)}
   {
    favbooks && favbooks.map((item,i)=>(<><Bookcard books={item} key={i} fav={true}/></>))
   }
    </div>
  )
}

export default Fav
