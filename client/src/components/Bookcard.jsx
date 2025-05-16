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
    <><div className='bg-slate-800 mt-4 lg:mt-3 rounded-xl p-4 h-auto w-[330px]'>
    <Link to={`/viewbook/${books._id}`}>
    <div><div className=' rounded-xl flex flex-col justify-center'> <img className='h-[230px] w-full' src={`${imgurl}`} alt='/'/>
</div>
<h2 className='my-1 mx-1 text-xl font-semibold text-gray-300'>{title}</h2>
<p className='mx-1  text-gray-300 text-[16px] '>Author: <span className='text-lg text-gray-400'>{author}</span></p>
<h2 className='mx-1 font-semibold text-xl'> ₹ <span>{price}</span></h2>
</div>

  </Link>
    
    {
      fav && (
        <button className='bg-rose-400 px-4 py-2 rounded border mt-2 border-rose-400 hover:bg-red-600 text-white' onClick={handleremovebook}>remove from favourite</button>

      )
    }
  </div>
    </>
  )
}

export default Bookcard
