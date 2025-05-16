import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import Bookcard from '../components/Bookcard';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const [cartdata,setcartdata]=useState([]);
  const [totalprice,settotalprice]=useState(0);
 // console.log(localStorage.getItem("token"))
 const navigate=useNavigate()
const headers={
   id:localStorage.getItem("id"),
   authorization:`Bearer ${localStorage.getItem("token")}`,
}
  useEffect(()=>{
const fetch=async()=>{
  const res=await axios.get("http://localhost:2000/bks/user/getallcart",{headers})
 //console.log(res.data)
 if(res.data.success){
  setcartdata(res.data.data)
 }
}

fetch()
  },[])

  const deletebookcart=async(bookid)=>{
    try{
    const res=await axios.put(`http://localhost:2000/bks/user/deletebookcart/${bookid}`,{},{headers})
   
    console.log(res.data);
    if (res.data.success) {
      setcartdata(cartdata.filter(item => item._id !== bookid));
    }alert(res.data.msg)
  } catch (error) {
    console.error("Error deleting book from cart:", error);
  } 
  }
  useEffect(()=>{
if(cartdata && cartdata.length>0 ){
  let total=0;
  cartdata.map((items)=>{
    total+=items.price
  })
 // console.log(total)
  settotalprice(total);
  total=0;

  }},[cartdata])

 

  const placeorder=async()=>{
    try{
const res=await axios.post("http://localhost:2000/bks/user/placeorder",{order:cartdata},{headers})

alert(res.data.msg)
navigate("/profile/orderhistory")
  }catch(err){
    console.log(err)
  }
  
  }

  return (
    <div className='h-screen bg-gray-600 px-12 py-8'>
      <>{
      !cartdata && <div className='h-[100%] flex justify-center items-center'><Loader/></div>
    }
    {
      cartdata.length==0 && <div className='h-[100%] flex justify-center items-center'> No Items in cart</div>
    }
    {
      cartdata && cartdata.map((item,i)=>(
       <div className='w-full my-4 rounded-md flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center h-' key={i}>
        <img className='h-[20vh] md:h-[10vh] object-cover'
        src={item.imgurl }
        alt="/"/>
<div className='w-full md:w-auto'>
  <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>{item.title}</h1>
  <p className='text-normal text-zinc-100 mt-2 hidden lg:block'>{item.desc.slice(0,100)}...</p>
  <p className='text-normal text-zinc-100 mt-2 hidden  md:block lg:hidden'>{item.desc.slice(0,65)}...</p>
  <p className='text-normal text-zinc-100 mt-2 block md:hidden'>{item.desc.slice(0,100)}...</p>
</div>
<div className=' flex flex-row gap-2 w-full md:w-auto items-center justify-between mt-4'>

    <h2 className='font-semibold text-2xl  flex text-zinc-100'> rp:{item.price}</h2>
    <button onClick={()=>{deletebookcart(item._id)}} className='p-2 border border-red-500 bg-rose-300 text-red-500 hover:bg-red-500 rounded ms-12'><MdDelete /></button>

</div>
       </div>
      ))
    }
    {
      cartdata && cartdata.length>0 &&(
      <div className='mt-4 w-full flex items-center justify-end'>
        <div className='p-4 bg-zinc-800 font-semibold'>
          <h1 className='text-3xl text-zinc-200 font-semibold'>Total Amount</h1>
          <div className='mt-3 flex items-center justify-between text-xl text-zinc-200'>
            <h2 >{cartdata.length} books </h2><h2>rp:{totalprice}</h2>
          </div>
          <div className='w-[100%] mt-3'>
<button  onClick={placeorder} className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold '>Place your order</button>
          </div>
        </div>

      </div>)
    }
     </>
    </div>
  )
}

export default Cart
