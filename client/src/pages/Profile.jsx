
import Sidebar from '../profile/Sidebar'
import { Outlet } from 'react-router-dom'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import axios from 'axios'
import Mobilenav from '../profile/Mobilenav'

const Profile = () => {

    // const isloggedin=useSelector();
  // console.log(localStorage.getItem("id")) 
  // console.log(localStorage.getItem("token")) 
    const headers={
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`
  }
  const [profiledata,setprofiledata]=useState()
  useEffect(()=>{
      const fetch=async()=>{
         let res=await axios.get("http://localhost:2000/bks/user/view",{headers})
          //console.log(res);
          if(res.data.success){
          setprofiledata(res.data.user)
          //console.log(res.data.user);
          
          }
      }
      
      fetch();
  },[])

  return (
    <div className='bg-slate-500 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white'>
    {!profiledata && <div className='h-[100%] flex items-center justify-center w-full '><Loader/> </div>}
     {
      profiledata && <> <div className='w-full md:w-1/6 h-auto lg:h-screen  '>
        <Sidebar profiledata={profiledata}/> 
        <Mobilenav/>
      </div>
      <div className='w-full md:w-5/6'>
        <Outlet/>
      </div>
   
    </>
     }
     </div> 
  )
}

export default Profile
