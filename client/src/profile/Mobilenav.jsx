import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const Mobilenav = () => {
  const role=useSelector((state)=>state.auth.role)
  return (
    <> {
      role==="user" && (<div className='w-full flex lg:hidden items-center justify-between mt-4 gap-2'>
        <Link to="/profile" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200 text-sm shadow-sm'>Favourites</Link>
    
        <Link to="/profile/orderhistory" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200 text-sm shadow-sm'>Order History</Link>
      
        <Link to="/profile/setting" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200 text-sm shadow-sm'>Settings</Link>
      </div>
      )
     }{
      role==="admin" && (<div className='w-full flex lg:hidden items-center justify-between mt-4 gap-2'>
        <Link to="/profile/allorders" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200 text-[11px] sm:text-xs shadow-sm truncate px-1'>All orders</Link>
    
        <Link to="/profile/addbook" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200 text-[11px] sm:text-xs shadow-sm truncate px-1'>Add book</Link>

        <Link to="/profile/messages" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-800 rounded-xl border border-transparent hover:border-zinc-700/35 transition-all duration-200 text-[11px] sm:text-xs shadow-sm truncate px-1'>Messages</Link>
      </div>
      )
     }
     </>
    
  )
}

export default Mobilenav
