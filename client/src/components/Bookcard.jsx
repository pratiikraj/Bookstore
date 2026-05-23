import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
const Bookcard = ({books,fav}) => {
    //console.log(books);
    const {author,category,desc,imgurl,lang,price,title}=books
    const headers={
      id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
       bookid:books._id,
    }
    
    const handleremovebook=async()=>{
      let res=await axios.put("http://localhost:2000/bks/user/deletebookfav",{},{headers})
     
     
       alert(res.data.msg);
    }
  return (
    <>
      <div className='bg-zinc-850 border border-zinc-750/50 mt-4 lg:mt-3 rounded-2xl p-4 h-full w-full max-w-[320px] hover:bg-zinc-800/80 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] flex flex-col justify-between mx-auto'>
        <Link to={`/viewbook/${books._id}`} className='flex flex-col gap-2 flex-grow'>
          <div className='rounded-xl overflow-hidden shadow-inner flex flex-col justify-center bg-zinc-900'>
            <img className='h-[280px] w-full object-cover' src={`${imgurl}`} alt={title}/>
          </div>
          <div className='flex flex-col gap-1 mt-2'>
            <h2 className='text-lg font-bold text-zinc-100 line-clamp-1' title={title}>{title}</h2>
            <p className='text-xs text-zinc-400 font-medium'>By <span className='text-zinc-300'>{author}</span></p>
            <h2 className='font-extrabold text-xl text-zinc-200 mt-1'>₹ {price}</h2>
          </div>
        </Link>
        {fav && (
          <button 
            className='bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white px-4 py-2.5 rounded-xl mt-3 font-semibold text-sm transition-all duration-200 active:scale-95 cursor-pointer text-center w-full' 
            onClick={handleremovebook}
          >
            Remove from Favourite
          </button>
        )}
      </div>
    </>
  )
}

export default Bookcard
