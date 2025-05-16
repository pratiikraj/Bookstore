import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { authActions } from '../store/auth';

const Sidebar = ({profiledata}) => {
  const role=useSelector((state)=>state.auth.role)

 const dispatch=useDispatch();
 const history=useNavigate();
  return (
    <div className='bg-slate-600 p-4 rounded-md flex  flex-col items-center justify-between h-auto lg:h-[100%] h-[30%] '>
  <div className='flex flex-col items-center justify-center'> <div className='relative'> <img className='h-[12vh] z-2' src={`${profiledata.avatar}`} alt='/'/>
    {/* <div className=' z-0 top-0 right-[0.20 em]  opacity-45 absolute rounded-full bg-blue-700 w-20 h-20'></div>  */}</div>
    <p className='text-semibold text-2xl text-gray-300 mt-1 '>{profiledata.name}</p>
    <p className=' text-normal text-zinc-300'>{profiledata.email}</p>
    <div className='h-[1px] mt-2 w-40 bg-zinc-500 hidden lg:block'> </div>
</div>
 

 {
  role==="admin" && (<div className='w-full  flex-col items-center justify-center hidden lg:flex '>
    <Link to="/profile/allorders" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300'>All orders</Link>

    <Link to="/profile/addbook" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300'>Add book</Link>
  
   
  </div>
  )
 }
  {
  role==="user" && (<div className='w-full  flex-col items-center justify-center hidden lg:flex '><Link to="/profile" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300'>Favourites</Link>

    <Link to="/profile/orderhistory" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300'>Order History</Link>
  
    <Link to="/profile/setting" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300'>Settings</Link>
  </div>
  )
 }

<div>
  <button className='bg-zinc-900  w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded px-3 hover:bg-white hover:text-zinc-900 transition-all duration-300' 
  onClick={()=>{
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role")
    history("/")
  }

  }>Logout</button>
</div>
    </div>
  )
}

export default Sidebar
