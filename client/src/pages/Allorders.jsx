import React, { useEffect, useState } from "react"
import Loader from "../components/Loader"
import axios from "axios"
import { MdManageAccounts } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import { Link } from 'react-router-dom'
import Showuser from "./Showuser";

const Allorders=()=>{
const [allorders,setallorders]=useState([])
const [options,setoptions]=useState(-1)
const [values,setvalues]=useState({status:"order placed"})

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
    return (
      <div className="h-auto min-h-screen bg-transparent p-0 md:p-6 text-zinc-100">
        {!allorders && (
          <div className="flex h-[60vh] justify-center items-center">
            <Loader />
          </div>
        )}
        
        {allorders && allorders.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[50vh] bg-zinc-800/20 rounded-2xl border border-zinc-700/30 p-8 shadow-inner">
            <p className="text-xl font-medium text-zinc-400">No orders placed yet.</p>
            <p className="text-sm text-zinc-500 mt-1">When customers place orders, they will show up here.</p>
          </div>
        )}

        {allorders && allorders.length > 0 && (
          <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 md:px-2">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-100">
                  All Orders
                </h1>
                <p className="text-sm text-zinc-400 mt-1">
                  Manage customer orders, track fulfillment status, and view details.
                </p>
              </div>
              <div className="bg-zinc-850 px-4 py-2 rounded-xl border border-zinc-750/50 text-sm text-zinc-300 font-semibold self-start md:self-auto shadow-md">
                Total Orders: <span className="text-blue-400 font-bold ml-1">{allorders.length}</span>
              </div>
            </div>

            {/* Orders Table Container */}
            <div className="bg-zinc-850 border border-zinc-750/50 rounded-2xl shadow-2xl overflow-hidden p-4 md:p-6">
              
              {/* Header */}
              <div className="hidden md:flex py-3 px-4 w-full bg-zinc-800/40 rounded-xl gap-4 items-center border border-zinc-750/30 mb-4">
                <div className="w-[5%] text-center">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Sr.</span>
                </div>
                <div className="w-[25%]">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Book</span>
                </div>
                <div className="w-[35%]">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description</span>
                </div>
                <div className="w-[15%]">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Price</span>
                </div>
                <div className="w-[15%]">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Status</span>
                </div>
                <div className="w-[5%] text-center">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">User</span>
                </div>
              </div>

              {/* Rows List */}
              <div className="space-y-2">
                {allorders.map((item, i) => {
                  // Defensive guard against deleted or null books
                  if (!item || !item.book) return null;

                  return (
                    <div 
                      key={i} 
                      className="py-4 px-4 w-full bg-zinc-800/10 hover:bg-zinc-800/40 rounded-xl flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center border border-zinc-800/40 hover:border-zinc-700/30 transition-all duration-200"
                    >
                      {/* Sr No (Mobile indicator) */}
                      <div className="w-full md:w-[5%] flex justify-between md:justify-center items-center text-xs md:text-sm font-semibold text-zinc-400">
                        <span className="md:hidden text-zinc-500 uppercase font-bold tracking-wider">Order No.</span>
                        <span>#{i + 1}</span>
                      </div>

                      {/* Book Thumbnail & Link */}
                      <div className="w-full md:w-[25%] flex items-center gap-3">
                        <div className="h-12 w-9 flex-shrink-0 bg-zinc-800 rounded overflow-hidden shadow border border-zinc-700/60">
                          {item.book.imgurl ? (
                            <img 
                              src={item.book.imgurl} 
                              alt={item.book.title} 
                              className="h-full w-full object-cover" 
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-[10px] text-zinc-500">
                              No Cover
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link 
                            to={`/viewbook/${item.book._id}`} 
                            className="hover:text-blue-400 text-zinc-200 font-semibold text-sm block truncate transition-colors duration-150"
                          >
                            {item.book.title}
                          </Link>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="w-full md:w-[35%] text-zinc-400 text-xs md:text-sm line-clamp-2 md:line-clamp-1">
                        <span className="md:hidden font-bold text-zinc-500 block mb-0.5">Description</span>
                        {item.book.desc || "No description provided."}
                      </div>

                      {/* Price */}
                      <div className="w-full md:w-[15%] flex justify-between md:justify-start items-center text-zinc-200 font-semibold text-sm">
                        <span className="md:hidden text-zinc-500 font-bold text-xs uppercase tracking-wider">Price</span>
                        <span>₹ {item.book.price}</span>
                      </div>

                      {/* Status */}
                      <div className="w-full md:w-[15%] flex justify-between md:justify-start items-center relative">
                        <span className="md:hidden text-zinc-500 font-bold text-xs uppercase tracking-wider">Status</span>
                        {options === i ? (
                          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/50 rounded-lg p-1">
                            <select 
                              onChange={change} 
                              value={values.status} 
                              name="status" 
                              className="bg-transparent text-zinc-200 text-xs focus:outline-none cursor-pointer pr-1"
                            >
                              {[
                                "order placed",
                                "out for delivery",
                                "delivered",
                                "cancelled"
                              ].map((opt, idx) => (
                                <option value={opt} key={idx} className="bg-zinc-900 text-zinc-200">
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <button 
                              className="text-emerald-400 hover:text-emerald-300 p-1 hover:bg-emerald-500/10 rounded transition-colors" 
                              onClick={() => {
                                setoptions(-1);
                                submitchanges(i);
                              }}
                              title="Confirm Status Change"
                            >
                              <FiCheck className="text-sm font-bold" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => {
                              setoptionsbutton(i);
                              setvalues({ status: item.status });
                            }} 
                            className="hover:scale-105 active:scale-95 transition-all duration-200 text-left"
                            title="Click to change status"
                          >
                            {item.status === 'order placed' ? (
                              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 capitalize tracking-wide">
                                {item.status}
                              </span>
                            ) : item.status === 'cancelled' ? (
                              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 capitalize tracking-wide">
                                {item.status}
                              </span>
                            ) : item.status === 'out for delivery' ? (
                              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 capitalize tracking-wide">
                                {item.status}
                              </span>
                            ) : item.status === 'delivered' ? (
                              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize tracking-wide">
                                {item.status}
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 capitalize tracking-wide">
                                {item.status}
                              </span>
                            )}
                          </button>
                        )}
                      </div>

                      {/* User Info Button */}
                      <div className="w-full md:w-[5%] flex justify-between md:justify-center items-center">
                        <span className="md:hidden text-zinc-500 font-bold text-xs uppercase tracking-wider">Customer</span>
                        <button 
                          onClick={() => setuserinfo(item.user)} 
                          className="text-zinc-400 hover:text-blue-400 p-1.5 hover:bg-zinc-800/85 rounded-lg transition-all duration-155"
                          title="View Customer Details"
                        >
                          <MdManageAccounts className="text-xl" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {userinfo && (
          <Showuser 
            onClose={() => setuserinfo(null)} 
            userinfo={userinfo} 
          />
        )}
      </div>
    );
}
export default Allorders



