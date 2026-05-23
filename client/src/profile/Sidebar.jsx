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
    <div className='bg-zinc-850 border border-zinc-750/50 p-6 rounded-2xl flex flex-col items-center justify-between h-auto lg:h-[100%] h-[30%] shadow-xl'>
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='relative'>
          <img className='h-[12vh] w-[12vh] object-cover rounded-full border-2 border-zinc-700 shadow-md' src={`${profiledata.avatar}`} alt='/'/>
        </div>
        <p className='font-semibold text-xl text-zinc-100 mt-3'>{profiledata.name}</p>
        <p className='text-sm text-zinc-400 mt-0.5 break-all text-center w-full'>{profiledata.email}</p>
        <div className='h-[1px] mt-4 w-40 bg-zinc-750 hidden lg:block'></div>
      </div>

      {role === "admin" && (
        <div className='w-full flex-col items-center justify-center hidden lg:flex mt-6 gap-2'>
          <Link to="/profile/allorders" className='text-zinc-200 font-semibold w-full py-2.5 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200'>All orders</Link>
          <Link to="/profile/addbook" className='text-zinc-200 font-semibold w-full py-2.5 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200'>Add book</Link>
          <Link to="/profile/messages" className='text-zinc-200 font-semibold w-full py-2.5 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200'>Messages</Link>
        </div>
      )}

      {role === "user" && (
        <div className='w-full flex-col items-center justify-center hidden lg:flex mt-6 gap-2'>
          <Link to="/profile" className='text-zinc-200 font-semibold w-full py-2.5 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200'>Favourites</Link>
          <Link to="/profile/orderhistory" className='text-zinc-200 font-semibold w-full py-2.5 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200'>Order History</Link>
          <Link to="/profile/setting" className='text-zinc-200 font-semibold w-full py-2.5 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200'>Settings</Link>
        </div>
      )}

      <div className='w-full mt-6 lg:mt-0'>
        <button 
          className='bg-zinc-900 border border-zinc-750 w-full text-zinc-100 hover:text-white font-semibold flex items-center justify-center py-2.5 rounded-xl hover:bg-zinc-800 active:scale-95 transition-all duration-200 shadow-md cursor-pointer' 
          onClick={() => {
            dispatch(authActions.logout());
            dispatch(authActions.changeRole("user"));
            localStorage.clear("id");
            localStorage.clear("token");
            localStorage.clear("role")
            history("/")
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
