import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Updatebook = () => {
   
  const [data,setdata]=useState({
    imgurl: "",
    title:"",
    author:"",
    price:"",
    desc:"",
    lang:"",
  })
  const {bookid}=useParams()
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:bookid
}
const navigate=useNavigate()
const change=(e)=>{
  const {name,value}=e.target;
  setdata({...data,[name]:value});
}
const submit=async()=>{
  try{
if(
  data.imgurl === "" || 
  data.title === "" ||
  data.author === "" ||
  data.price === "" ||
  data.desc === "" ||
  data.lang === "" 
){
  alert("all fields are required")
}else{
    const  res=await axios.put("http://localhost:2000/bks/admin/updatebook",data,{headers})
    setdata({
      imgurl:"",
      title:"",
      author:"",
      price:"",
      desc:"",
      lang:""
    })
    //alert(res.data.msg)
   console.log(res);
    navigate(`/viewbook/${bookid}`)
  }
}catch(err){
 alert(err)
  }
}
  useEffect(()=>{
    const fetch=async()=>{
      const res=await axios.get(`http://localhost:2000/bks/user/getbookbyid/${bookid}`)
    // console.log(res)
   if(res.data.success)
    setdata(res.data.data)
    // console.log(res.data.data)
      
    //console.log(data)
    }
    fetch();
      },[])

  return (
    <div className='h-auto bg-transparent p-0 md:p-4 text-zinc-100'>
      <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100 mb-8'>Update Book</h1>
      <div className='bg-zinc-850 border border-zinc-750/50 p-6 md:p-8 rounded-2xl shadow-2xl space-y-6 max-w-4xl'>
        <div>
          <label htmlFor='' className='text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2'>
            Book Cover Image URL
          </label>
          <input
            type='text'
            className='w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm'
            placeholder='url of image'
            name='imgurl'
            required 
            value={data.imgurl}
            onChange={change}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='' className='text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2'>
              Title of the Book
            </label>
            <input
              type='text'
              className='w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm'
              placeholder='title'
              name='title'
              required 
              value={data.title}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor='' className='text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2'>
              Author of the Book
            </label>
            <input
              type='text'
              className='w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm'
              placeholder='author'
              name='author'
              required 
              value={data.author}
              onChange={change}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='' className='text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2'>
              Language
            </label>
            <input
              type='text'
              className='w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm'
              placeholder='lang'
              name='lang'
              required 
              value={data.lang}
              onChange={change}
            />
          </div>
          <div>
            <label htmlFor='' className='text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2'>
              Price (in ₹)
            </label>
            <input
              type='number'
              className='w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm'
              placeholder='price'
              name='price'
              required 
              value={data.price}
              onChange={change}
            />
          </div>
        </div>
        <div>
          <label htmlFor='' className='text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2'>
            Description of the Book
          </label>
          <textarea
            rows={5}
            className='w-full bg-zinc-950 border border-zinc-750/50 text-zinc-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 text-sm resize-none leading-relaxed'
            placeholder='description'
            name='desc'
            required 
            value={data.desc}
            onChange={change}
          />
        </div>
        <div className='flex justify-end pt-2'>
          <button 
            className='w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md active:scale-95 text-white font-bold rounded-xl transition-all duration-150 text-sm cursor-pointer' 
            onClick={submit}
          >
            Update Book
          </button>
        </div>
      </div>
    </div>
  )
}
export default Updatebook
