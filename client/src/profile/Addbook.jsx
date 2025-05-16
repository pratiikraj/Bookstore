import axios from 'axios'
import React, { useState } from 'react'

const Addbook = () => {

  const [data,setdata]=useState({
    imgurl: "",
    title:"",
    author:"",
    price:"",
    desc:"",
    lang:"",
  })
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
}
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
    const  res=await axios.post("http://localhost:2000/bks/admin/addbook",data,{headers})
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
    
  }
}catch(err){
// alert(res.data.msg)
console.log(err)
  }
}
  return (
    <div className='h-[100%] p-0 md:p-4 '>
     <h1 className='text-3xl md:text-3xl font-semibold text-black mb-8'>Add book</h1>
     <div className='p-4 bg-zinc-800 rounded'>
      <div>
        <label htmlFor='' className='text-zinc-400'>
image
        </label>
        <input
        type='text'
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='url of image'
        name='imgurl'
        required 
        value={data.url}
        onChange={change}/>
        
      </div>
      <div className='mt-4'>
        <label htmlFor='' className='text-zinc-400'>
          Title of the book
        </label>
        <input
        type='text'
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='title'
        name='title'
        required 
        value={data.title}
        onChange={change}/>
      </div>
      <div className='mt-4'>
        <label htmlFor='' className='text-zinc-400'>
          Author of book
        </label>
        <input
        type='text'
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='author'
        name='author'
        required 
        value={data.author}
        onChange={change}/>
      </div>
     <div className='mt-4 flex gap-4'>
     <div className='w-3/6'>
        <label htmlFor='' className='text-zinc-400'>
         languages
        </label>
        <input
        type='text'
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='lang'
        name='lang'
        required 
        value={data.lang}
        onChange={change}/>
      </div>
     </div>
     <div className='mt-4 flex gap-4'>
     <div className='w-3/6'>
        <label htmlFor='' className='text-zinc-400'>
         price
        </label>
        <input
        type='number'
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='price'
        name='price'
        required 
        value={data.price}
        onChange={change}/>
      </div>
     </div>
     <div className='mt-4'>
        <label htmlFor='' className='text-zinc-400'>
         Decription of book
        </label>
        <textarea
        rows={5}
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
        placeholder='description'
        name='desc'
        required 
        value={data.desc}
        onChange={change}/>
      </div>
   <button 
   className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-all duration-300' 
   onClick={submit}
   >Add Book</button>
     </div>
    </div>
  )
}

export default Addbook
