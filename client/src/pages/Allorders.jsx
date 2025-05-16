import React,{useEffect, useState} from "react"
import Loader from "../components/Loader"
import axios from "axios"
import { MdManageAccounts } from "react-icons/md";
import {Link} from 'react-router-dom'
import Showuser from "./Showuser";

const Allorders=()=>{
const [allorders,setallorders]=useState([])
const [options,setoptions]=useState(-1)
const [values,setvalues]=useState({status:"order placed"})

const [showuser,setshowuser]=useState("hidden")
const [userinfo,setuserinfo]=useState()
    const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
    }
    useEffect(()=>{
        const fetch=async()=>{
          const res=await axios.get(`http://localhost:2000/bks/admin/getallorders`,{headers})
      //   console.log(res.data.data)
       setallorders(res.data.data)
        // console.log(res.data.data)
          
        console.log(allorders)
        }
        fetch();
          },[])

          const setoptionsbutton=(i)=>{
setoptions(i)
          }
          const change=(e)=>{
            const {value}=e.target
            setvalues({status:value})
          }

//  const submitchanges= async(i)=>{
//     try{
//        const id=allorders[i]._id;
//     //    console.log(id)
// const res=await axios.put(`http://localhost:2000/bks/admin/changestatus/${id}`,
//     values,{headers}
// ); 
// console.log(res)
// // console.log("Response from server:", res.data);
//     }catch(err){
//         console.log(err)
//     }

//           }


const submitchanges = async (i) => {
    try {
      const id = allorders[i]._id;
      const res = await axios.put(
        `http://localhost:2000/bks/admin/changestatus/${id}`,
        values,
        { headers }
      );
  
      if (res.status === 200) {
        // Update the state with the new status
        const updatedOrders = [...allorders];
        updatedOrders[i] = { ...updatedOrders[i], status: values.status };
        setallorders(updatedOrders);
        setoptions(-1); // Close the dropdown
      }
    } catch (err) {
      console.error(err);
    }
  };
  

        //  allorders && allorders.splice(allorders.length-1,1)
    return(
<div>
    {!allorders && <div className="h-[100%] flex justify-center items-center"> <Loader/></div>}
    {
        allorders && ( allorders.length===0) && <div className="text-white">no irders came</div>
    }
    {
        allorders && ( allorders.length>0) && (
            <div className="h-[100%] md:p-4 p-0 w-full ">
                <div> <h1 className="text-3xl md:text-5xl mb-8 text-gray-800 font-bold md:p-4">All Orders</h1>
</div>
               
            <div className=" mt-4 py-2 px-4 w-full rounded flex gap-2 items-center">
                <div className="w-[3%] ">
                    <h2 className="text-gray-400 text-xl text-center font-semibold">Sr.</h2>
                </div>
                <div className="w-[40%] md:w-[22%] ">
                    <h2 className="text-gray-400 text-xl font-semibold">Books.</h2>
                </div>
                <div className=" w-0 md:w-[45%] hidden md:block">
                    <h2 className="text-gray-400 text-xl font-semibold">Description</h2>
                </div>
                <div className="w-[17%] md:w-[22%] ">
                    <h2 className="text-gray-400 text-xl font-semibold">Price</h2>
                </div>
                <div className="w-[30%] md:w-[16%] ">
                    <h1 className="text-gray-400 text-xl font-semibold">Status</h1>
                </div>
                <div className="w-[10%] md:w-[5%] ">
                    <h1 className="text-blue-600 text-2xl"><MdManageAccounts /></h1>
                </div>
            </div>
<div>  {
    allorders.map((item,i)=>(
        <div key={i} className="  py-2 px-4 w-full rounded flex gap-2 items-center hover:bg-zinc-800 hover:cursor-pointer">
        <div className="w-[3%] ">
            <h2 className="text-gray-400 text-xl text-center font-semibold">{i+1}</h2>
        </div>
        <div className="w-[40%] md:w-[22%] ">
        <Link to={`/viewbook/${item.book._id}`}> <h2 className="text-gray-400 text-xl font-semibold hover:text-blue-600">{item.book.title}.</h2>
        </Link>   
        </div>
        <div className=" w-0 md:w-[45%] hidden md:block">
            <h2 className="text-gray-400 text-xl font-semibold">{item.book.desc.slice(0,50)}...</h2>
        </div>
        <div className="w-[17%] md:w-[22%] ">
            <h2 className="text-gray-400 text-xl font-semibold">rup. {item.book.price}</h2>
        </div>
        <div className="w-[30%] md:w-[16%] ">
            <h1 className=" font-semibold">
                <button onClick={()=>setoptionsbutton(i)} className="hover:scale-105 transition-all duration-300">
{item.status === 'order placed' ? (
    <div className="text-yellow-500">{item.status}</div>
  ) : item.status === 'cancelled' ? (
    <div className="text-red-500">{item.status}</div>
  ) : item.status === 'out for delivery' ? (
    <div className="text-blue-500">{item.status}</div>
  ) : item.status === 'delivered' ? (
    <div className="text-green-500">{item.status}</div>
  ) : (
    <div className="text-purple-500">{item.status}</div>
  )}

    </button>
    {
        options===i && (
<div className="flex">
        <select onChange={change} 
        value={values.status} name="status" id="" className="bg-gray-800"
> {[
    "order placed",
    "out for delivery",
    "delivered",
    "cancelled"
].map((item,i)=>(
    <option value={item} key={i}>
        {item}
    </option>
)) }</select> 
    <button className="text-green-600 hover:text-pink-500 mx-2 " onClick={()=>{
        setoptions(-1);
        submitchanges(i);
    }}> check
        </button>   
        </div>
        )
    }
    
    </h1>
        </div>
        <div className="w-[10%] md:w-[5%] ">
            <h1 className="text-blue-600 text-2xl" onClick={()=>{
                setshowuser("fixed")
                setuserinfo(item.user)
            }} ><MdManageAccounts /></h1>
        </div>
      
    </div>
    ))
    }
            </div>
            </div>  
        )
    }
      {
        userinfo && (
            <Showuser setshowuser={setshowuser}
            showuser={showuser}
            userinfo={userinfo}
            />
        )    
        }
</div>
    );
}
export default Allorders



