import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const Mobilenav = () => {
  const role=useSelector((state)=>state.auth.role)
  return (
    <> {
      role==="user" && (<div className='w-full  flex lg:hidden items-center justify-between mt-4'>
        <Link to="/profile" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300'>Favourites</Link>
    
        <Link to="/profile/orderhistory" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300'>Order History</Link>
      
        <Link to="/profile/setting" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300'>Settings</Link>
      </div>
      )
     }{
      role==="admin" && (<div className='w-full  flex lg:hidden items-center justify-between mt-4 '>
        <Link to="/profile/allorders" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300'>All orders</Link>
    
        <Link to="/profile/addbook" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-slate-700 rounded transition-all duration-300'>Add book</Link>
      
       
      </div>
      )
     }
     </>
    
  )
}

export default Mobilenav
